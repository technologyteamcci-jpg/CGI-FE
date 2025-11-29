"use client";

import { useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useGetPastors } from "@/services/pastors.services";
import CreatePastorModal from "./components/CreatePastorModal";


function Page() {
    const { data, isLoading } = useGetPastors();


    const [search, setSearch] = useState("");
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);


    const handleCreatePastor = () => setIsCreateModalOpen(true);
    const handleImportMultiple = () => {
        console.log("Import multiple clicked");
        // your upload logic here
    };

    return (
        <div className="container mx-auto px-4 py-10 space-y-6">

            {/* 🔍 Search + Create */}
            <div className="flex items-center justify-between">

                {/* Search Field */}
                <Input
                    placeholder="Search pastor..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="max-w-xs"
                />

                {/* Create Button with dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className="flex gap-2">
                            Create
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={handleCreatePastor}>
                            Add New
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleImportMultiple}>
                            Import Multiple
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Table */}
            <DataTable
                columns={columns}
                data={data ?? []}
                isLoading={isLoading}
                header={"Pastors"}
            // searchTerm={search}
            />

            <CreatePastorModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />


        </div>
    );
}

export default Page;
