"use client";

import { Button } from "@/components/ui/button";

export function EventFilters({
    filter,
    setFilter,
}: {
    filter: "all" | "upcoming" | "past";
    setFilter: (f: "all" | "upcoming" | "past") => void;
}) {
    return (
        <div className="flex gap-3">
            <Button
                variant={filter === "all" ? "default" : "outline"}
                onClick={() => setFilter("all")}
            >
                All
            </Button>

            <Button
                variant={filter === "upcoming" ? "default" : "outline"}
                onClick={() => setFilter("upcoming")}
            >
                Upcoming
            </Button>

            <Button
                variant={filter === "past" ? "default" : "outline"}
                onClick={() => setFilter("past")}
            >
                Past
            </Button>
        </div>
    );
}
