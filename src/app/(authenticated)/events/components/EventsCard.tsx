"use client";

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { DeleteConfirm } from "@/components/modals/DeleteConfirmationModal";
import { toast } from "sonner";

export function EventCard({ event }: any) {
    return (
        <Card className="overflow-hidden relative rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border">

            {/* IMAGE SECTION */}
            <div className="relative w-full h-40">
                <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60" />

                {/* SHOW BADGE ONLY IF RECURRING */}
                {event.recurring && (
                    <span
                        className="
                            absolute top-3 left-3 z-20 
                            bg-blue-600 text-white text-xs font-semibold
                            px-2 py-1 rounded-md shadow
                        "
                    >
                        Recurring
                    </span>
                )}

                {/* ACTION BUTTON (TOP RIGHT) */}
                <div className="absolute top-3 right-3 z-20">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="secondary"
                                size="icon"
                                className="rounded-full bg-white/90 hover:bg-white shadow"
                            >
                                <MoreHorizontal className="h-5 w-5 text-gray-700" />
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit Event</DropdownMenuItem>

                            <DropdownMenuSeparator />

                            <DeleteConfirm
                                onConfirm={() => {
                                    toast("Event deleted");
                                }}
                            >
                                {(openDialog) => (
                                    <DropdownMenuItem
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            openDialog();
                                        }}
                                        className="text-red-600 cursor-pointer"
                                    >
                                        Delete Event
                                    </DropdownMenuItem>
                                )}
                            </DeleteConfirm>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* TITLE + DATE */}
            <CardHeader className="pb-2">
                <h2 className="text-lg font-semibold">{event.title}</h2>

                <p className="text-sm text-gray-500">
                    {new Date(event.date).toLocaleString()}
                </p>
            </CardHeader>

            {/* DETAILS */}
            <CardContent className="space-y-3">
                <div className="flex justify-between text-sm text-gray-700">
                    <span>
                        <strong>Attendees:</strong> {event.attendees}
                    </span>

                    <span>
                        <strong>Rate:</strong> {event.attendanceRate}%
                    </span>
                </div>
            </CardContent>
        </Card>
    );
}
