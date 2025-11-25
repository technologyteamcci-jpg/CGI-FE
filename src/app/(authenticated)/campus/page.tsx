"use client";

import { useState } from "react";
import { useGetCampus } from "@/services/campus.services";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

// import {
//     Button,
//     Input,
//     DropdownMenu,
//     DropdownMenuTrigger,
//     DropdownMenuContent,
//     DropdownMenuItem,
// } from "@/components/ui";

function Page() {
    const { data, isLoading } = useGetCampus();

    const [search, setSearch] = useState("");
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const handleCreateCampus = () => setIsCreateModalOpen(true);
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
                    placeholder="Search campus..."
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
                        <DropdownMenuItem onClick={handleCreateCampus}>
                            Create New Campus
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
                header={"Campus"}
            // searchTerm={search}
            />

            {/* ⚠️ Create Modal (placeholder) */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg p-6 w-[400px] shadow-xl">
                        <h2 className="text-lg font-semibold mb-4">Create Campus</h2>

                        {/* Add your form fields here */}

                        <div className="flex justify-end gap-3 mt-6">
                            <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                                Cancel
                            </Button>
                            <Button>Create</Button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default Page;
