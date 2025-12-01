"use client"

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"

import { Skeleton } from "@/components/ui/skeleton"
import { Loader2 } from "lucide-react"
import * as React from "react"
import { Select } from "@radix-ui/react-select"
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

interface ServerMeta {
    page?: number
    totalPages?: number
    totalResults?: number
    onPageChange?: (nextPage: number) => void
    onPerPageChange?: (perPage: number) => void
    pageSize?: number
}

interface DataTableProps<TData, TValue> extends ServerMeta {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    header?: React.ReactNode
    isLoading?: boolean
}

export function DataTable<TData, TValue>({
    columns,
    data,
    header,
    totalPages,
    page,
    pageSize,
    onPageChange,
    totalResults,
    onPerPageChange,
    isLoading,
}: DataTableProps<TData, TValue>) {
    const effectivePageSize = pageSize || 10

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        pageCount: totalPages ?? -1,
        state: {
            pagination: {
                pageIndex: Math.max((page ?? 1) - 1, 0),
                pageSize: effectivePageSize,
            },
        },
    })

    const canPrev = (page ?? 1) > 1
    const canNext = (page ?? 1) < (totalPages ?? 1)

    const goFirst = () => onPageChange?.(1)
    const goPrev = () => onPageChange?.(Math.max(1, (page ?? 1) - 1))
    const goNext = () => onPageChange?.(Math.min((totalPages ?? 1), (page ?? 1) + 1))
    const goLast = () => onPageChange?.(totalPages ?? 1)

    const start = totalResults ? (Math.max(page ?? 1, 1) - 1) * effectivePageSize + 1 : undefined
    const end = totalResults ? Math.min((page ?? 1) * effectivePageSize, totalResults!) : undefined

    // Skeleton rows (for first load or empty state while loading)
    const showSkeletonRows = isLoading && data.length === 0
    const skeletonRowCount = effectivePageSize

    return (
        <div>
            <div className="relative overflow-hidden rounded-md border" aria-busy={isLoading}>
                {header ? (
                    <div className="flex items-center justify-between gap-2 py-2 px-1 border-b bg-card/30">
                        {header}
                    </div>
                ) : null}

                {/* Overlay spinner during background loads (keep previous data visible) */}
                {isLoading && data.length > 0 && (
                    <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-background/40 backdrop-blur-[1px]">
                        <Loader2 className="h-5 w-5 animate-spin" aria-label="Loading" />
                    </div>
                )}

                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>

                    <TableBody>
                        {showSkeletonRows ? (
                            Array.from({ length: skeletonRowCount }).map((_, i) => (
                                <TableRow key={`skeleton-${i}`}>
                                    {columns.map((_, cIdx) => (
                                        <TableCell key={`skeleton-cell-${i}-${cIdx}`}>
                                            <Skeleton className="h-4 w-full" />
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    {isLoading ? (
                                        <div className="flex items-center justify-center gap-2 text-muted-foreground">
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            Loading…
                                        </div>
                                    ) : (
                                        "No results."
                                    )}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Footer pager */}
            <div className="mt-2 flex items-center justify-between py-2!">
                <div className="text-sm text-muted-foreground">
                    {typeof start === "number" && typeof end === "number" && typeof totalResults === "number" ? (
                        <span>
                            Showing <span className="font-medium">{start}</span>–<span className="font-medium">{end}</span> of{" "}
                            <span className="font-medium">{totalResults}</span>
                        </span>
                    ) : null}
                </div>

                <div className="flex items-center gap-2">
                    <div className="mr-2 flex items-center space-x-2">
                        <p className="text-sm font-medium">Rows per page</p>
                        <Select
                            value={`${table.getState().pagination.pageSize}`}
                            onValueChange={(value) => onPerPageChange?.(Number(value))}
                            disabled={isLoading}
                        >
                            <SelectTrigger className="h-8 w-[70px]">
                                <SelectValue placeholder={table.getState().pagination.pageSize} />
                            </SelectTrigger>
                            <SelectContent side="top">
                                {[10, 20, 25, 30, 40, 50].map((ps) => (
                                    <SelectItem key={ps} value={`${ps}`}>
                                        {ps}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <Button variant="outline" size="sm" onClick={goFirst} disabled={isLoading || !canPrev} className="hidden sm:inline-flex">
                        First
                    </Button>
                    <Button variant="outline" size="sm" onClick={goPrev} disabled={isLoading || !canPrev}>
                        Previous
                    </Button>
                    <div className="px-2 text-sm">
                        Page {page ?? 1} of {totalPages ?? 1}
                    </div>
                    <Button variant="outline" size="sm" onClick={goNext} disabled={isLoading || !canNext}>
                        Next
                    </Button>
                    <Button variant="outline" size="sm" onClick={goLast} disabled={isLoading || !canNext} className="hidden sm:inline-flex">
                        Last
                    </Button>
                </div>
            </div>
        </div>
    )
}
