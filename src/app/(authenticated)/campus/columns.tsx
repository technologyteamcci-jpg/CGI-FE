import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ICampus } from "@/interfaces/campus";
import { DeleteConfirm } from "@/components/modals/DeleteConfirmationModal";
import { toast } from "sonner";

const getFullName = (pastor: any) => {
    return [pastor?.firstName, pastor?.otherNames, pastor?.lastName]
        .filter(Boolean)
        .join(" ");
};

export const columns = (
    deleteCampus: (id: string) => Promise<void>,
    isDeleting: boolean
): ColumnDef<ICampus>[] => [
        {
            accessorKey: "name",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Campus Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
        },
        {
            accessorKey: "state",
            header: "State",
        },
        {
            accessorKey: "country",
            header: "Country",
        },
        {
            accessorKey: "residentPastorId",
            header: "Resident Pastor",
            cell: ({ row }) => getFullName(row.original.residentPastorId),
        },
        {
            accessorKey: "pastorsIds",
            header: "Pastors Count",
            cell: ({ row }) =>
                (row.original.pastorsIds?.length || 0) +
                (row.original.residentPastorId ? 1 : 0),
        },
        {
            accessorKey: "location",
            header: "Location",
            cell: ({ row }) => {
                const { long, lat } = row.original.location || {};
                return `${long}, ${lat}`;
            },
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const campus = row.original;

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>

                            <DropdownMenuItem>View campus details</DropdownMenuItem>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem>Edit campus</DropdownMenuItem>

                            <DeleteConfirm
                                onConfirm={async () => {
                                    try {
                                        await deleteCampus(campus._id);
                                        toast.success("Campus deleted successfully");
                                    } catch (e) {
                                        toast.error("Error deleting campus");
                                    }
                                }}
                            >
                                {(openDialog) => (
                                    <DropdownMenuItem
                                        className="text-red-600 flex items-center gap-2"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            openDialog();
                                        }}
                                    >
                                        {isDeleting ? (
                                            <>
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                                Deleting...
                                            </>
                                        ) : (
                                            "Delete Campus"
                                        )}
                                    </DropdownMenuItem>
                                )}
                            </DeleteConfirm>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];
