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
import { ICampus } from "@/interfaces/campus"
import { IPastor } from "@/interfaces/pastors"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

const getFullName = (pastor: any) => {
    return [pastor.firstName, pastor.otherNames, pastor.lastName]
        .filter(Boolean)
        .join(" ");
};

export const columns: ColumnDef<ICampus>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
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
        cell: ({ row }) => {
            const pastor = row.original.residentPastorId;
            return getFullName(pastor);
        }
    },
    {
        accessorKey: "pastorsIds",
        header: "Pastors Count",
        cell: ({ row }) => row.original.pastorsIds?.length + row.original.residentPastorId ? 1 : 0 || 0,
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

                        <DropdownMenuItem>
                            View campus details
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem>
                            Edit campus
                        </DropdownMenuItem>

                        <DropdownMenuItem>
                            Delete campus
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
