"use client";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { ReactNode } from "react";

interface SideModalProps {
    trigger: ReactNode;
    title: string;
    description?: string;
    children: ReactNode;
    side?: "right" | "left";
    width?: string;
}

export function SideModal({
    trigger,
    title,
    description,
    children,
    side = "right",
    width = "w-1/2",
}: SideModalProps) {
    return (
        <Sheet>
            <SheetTrigger asChild>{trigger}</SheetTrigger>

            <SheetContent side={side} className={`${width} overflow-y-auto`}>
                <SheetHeader>
                    <SheetTitle>{title}</SheetTitle>
                    {description && <SheetDescription>{description}</SheetDescription>}
                </SheetHeader>

                <div className="mt-4">{children}</div>
            </SheetContent>
        </Sheet>
    );
}
