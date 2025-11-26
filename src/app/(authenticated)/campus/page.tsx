"use client";

import { useState } from "react";
import { useGetCampus } from "@/services/campus.services";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import CreateCampusModal from "./components/CreateCampusModal";
import { useGetPastors } from "@/services/pastors.services";


function Page() {
    const { data, isLoading } = useGetCampus();
    const { data: pastors, isLoading: pastorsIsloading } = useGetPastors();


    const [search, setSearch] = useState("");
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    // const pastors = [
    //     { id: "1", name: "Pastor John" },
    //     { id: "2", name: "Pastor Mary" },
    // ];

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

            <CreateCampusModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} pastors={pastors ?? []} />


        </div>
    );
}

export default Page;
