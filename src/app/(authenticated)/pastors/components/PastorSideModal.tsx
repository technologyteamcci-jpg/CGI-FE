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

interface PastorSideModalProps {
    pastor: IPastor;
    triggerText: string;
    isEdit?: boolean
}

export function PastorSideModal({ pastor, triggerText, isEdit }: PastorSideModalProps) {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Trigger — just a normal DropdownMenuItem */}
            <DropdownMenuItem
                onClick={(e) => {
                    e.stopPropagation(); // Prevent dropdown close from interfering
                    setOpen(true);
                }}
            >
                {triggerText}
            </DropdownMenuItem>

            {/* Sheet — controlled via state */}
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent side="right" className="w-1/2 overflow-y-auto">
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
