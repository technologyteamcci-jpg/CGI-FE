"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EventFilters } from "./components/EventsFilters";
import { EventCard } from "./components/EventsCard";

export default function EventsPage() {
    const [filter, setFilter] = useState<"all" | "upcoming" | "past">("all");
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const itemsPerPage = 6;

    // Mock data (replace with API)
    const events = [
        {
            id: "1",
            title: "Youth Conference",
            date: "2025-03-12T10:00",
            image: "/placeholder.jpg",
            attendees: 120,
            attendanceRate: 75,
        },
        {
            id: "2",
            title: "Sunday Thanksgiving Service",
            date: "2025-01-10T09:00",
            image: "/placeholder.jpg",
            attendees: 300,
            attendanceRate: 85,
        },
        {
            id: "3",
            title: "Youth Conference1",
            date: "2026-03-12T10:00",
            image: "/placeholder.jpg",
            attendees: 120,
            attendanceRate: 75,
        },
        {
            id: "4",
            title: "Sunday Thanksgiving Service1",
            date: "2026-01-10T09:00",
            image: "/placeholder.jpg",
            attendees: 300,
            attendanceRate: 85,
        },
        // Add more for testing
    ];

    const now = new Date();

    // 🔍 FILTERED + SEARCHED DATA
    const processedEvents = useMemo(() => {
        return events
            .filter((event) => {
                const eventDate = new Date(event.date);

                if (filter === "upcoming") return eventDate >= now;
                if (filter === "past") return eventDate < now;
                return true;
            })
            .filter((event) =>
                event.title.toLowerCase().includes(search.toLowerCase())
            );
    }, [events, filter, search]);

    // 📌 PAGINATION LOGIC
    const totalPages = Math.ceil(processedEvents.length / itemsPerPage);
    const paginatedEvents = processedEvents.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    const handlePageChange = (newPage: number) => {
        if (newPage < 1 || newPage > totalPages) return;
        setPage(newPage);
    };

    return (
        <div className="p-6 space-y-6">
            {/* HEADER */}
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Events</h1>
                <Button>Create Event</Button>
            </div>

            {/* SEARCH + FILTERS BAR */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <Input
                    placeholder="Search events…"
                    className="w-full sm:w-72"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(1);
                    }}
                />

                <EventFilters filter={filter} setFilter={(type) => {
                    setFilter(type);
                    setPage(1);
                }} />
            </div>

            {/* EVENTS GRID */}
            {paginatedEvents.length === 0 ? (
                <p className="text-center text-gray-500 py-10">
                    No events found.
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {paginatedEvents.map((event) => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>
            )}

            {/* PAGINATION */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 pt-4">
                    <Button
                        variant="outline"
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 1}
                    >
                        Previous
                    </Button>

                    <span className="text-sm">
                        Page <strong>{page}</strong> of {totalPages}
                    </span>

                    <Button
                        variant="outline"
                        onClick={() => handlePageChange(page + 1)}
                        disabled={page === totalPages}
                    >
                        Next
                    </Button>
                </div>
            )}
        </div>
    );
}
