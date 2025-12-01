"use client";

import { useState } from "react";
import { createPortal } from "react-dom";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DeleteConfirmProps {
    title?: string;
    description?: string;
    onConfirm: () => void;
    children: (openDialog: () => void) => React.ReactNode;
}

export function DeleteConfirm({
    title = "Are you sure?",
    description = "This action cannot be undone.",
    onConfirm,
    children,
}: DeleteConfirmProps) {
    const [open, setOpen] = useState(false);

    const openDialog = () => setOpen(true);

    return (
        <>
            {children(openDialog)}

            {createPortal(
                <AlertDialog open={open} onOpenChange={setOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>{title}</AlertDialogTitle>
                            <AlertDialogDescription>{description}</AlertDialogDescription>
                        </AlertDialogHeader>

                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={onConfirm}>
                                Yes, Delete
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>,
                document.body
            )}
        </>
    );
}
