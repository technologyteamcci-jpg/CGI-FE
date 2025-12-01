"use client";

import { useState } from "react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { IPastor } from "@/interfaces/pastors";
import { PastorDetails } from "./PastorDetails";
import { useUpdatePastor } from "@/services/pastors.services";

interface PastorSideModalProps {
    pastor: IPastor;
    triggerText: string;
    isEdit?: boolean;
}

export function PastorSideModal({
    pastor,
    triggerText,
    isEdit = false,
}: PastorSideModalProps) {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Trigger — normal dropdown item */}
            <DropdownMenuItem
                onClick={(e) => {
                    e.stopPropagation(); // Prevent dropdown from interfering
                    e.preventDefault();
                    setOpen(true);
                }}
            >
                {triggerText}
            </DropdownMenuItem>

            {/* Controlled Sheet */}
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent
                    side="right"
                    className="w-[1000px] max-w-full h-full p-4 overflow-y-auto"
                >
                    <SheetHeader>
                        <SheetTitle>{triggerText}</SheetTitle>
                        <SheetDescription>
                            View or edit pastor information
                        </SheetDescription>
                    </SheetHeader>

                    <div className="mt-4">
                        <PastorDetails pastor={pastor} editing={isEdit} />
                    </div>
                </SheetContent>
            </Sheet>
        </>
    );
}
