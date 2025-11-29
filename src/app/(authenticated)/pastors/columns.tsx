import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

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

// Helper: Build full name
const getFullName = (pastor: IPastor) => {
    return [pastor.firstName, pastor.otherNames, pastor.lastName]
        .filter(Boolean)
        .join(" ");
};

export const columns: ColumnDef<IPastor>[] = [
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
        cell: ({ row }) => {
            const pastor = row.original;
            return getFullName(pastor);
        },
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
                        <PastorSideModal pastor={pastor} triggerText="Edit pastor" isEdit={true} />
                        <DropdownMenuSeparator />

                        <DropdownMenuItem className="text-red-600">
                            Delete pastor
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
