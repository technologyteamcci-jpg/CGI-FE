import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Loader2, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { IPastor } from "@/interfaces/pastors"
import { PastorSideModal } from "./components/PastorSideModal"
import { DeleteConfirm } from "@/components/modals/DeleteConfirmationModal"
import { toast } from "sonner"

const getFullName = (pastor: IPastor) => {
    return [pastor.firstName, pastor.otherNames, pastor.lastName]
        .filter(Boolean)
        .join(" ");
};

// ❗ columns now receives deletePastor callback
export const columns = (
    deletePastor: (id: string) => Promise<void>,
    isDeleting: boolean
): ColumnDef<IPastor>[] => [
        {
            accessorKey: "firstName",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Pastor Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => getFullName(row.original),
        },
        {
            accessorKey: "address.state",
            header: "State",
            cell: ({ row }) => row.original.address?.state || "—",
        },
        {
            accessorKey: "address.country",
            header: "Country",
            cell: ({ row }) => row.original.address?.country || "—",
        },
        {
            accessorKey: "email",
            header: "Email",
        },
        {
            accessorKey: "phone",
            header: "Phone",
        },

        {
            id: "actions",
            cell: ({ row }) => {
                const pastor = row.original;

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>

                            <PastorSideModal pastor={pastor} triggerText="View pastor details" />
                            <PastorSideModal pastor={pastor} triggerText="Edit pastor" isEdit />

                            <DropdownMenuSeparator />

                            <DeleteConfirm
                                onConfirm={async () => {
                                    try {
                                        await deletePastor(pastor._id)
                                        toast.success("Pastor deleted successfully")
                                    } catch (e) {
                                        toast.error("Error deleting pastor")
                                    }
                                }}
                            >
                                {(openDialog) => (
                                    <DropdownMenuItem
                                        className="text-red-600"
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
                                            "Delete Pastor"
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
