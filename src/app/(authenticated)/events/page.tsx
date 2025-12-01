"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EventFilters } from "./components/EventsFilters";
import { EventCard } from "./components/EventsCard";

export default function EventsPage() {
    const [filter, setFilter] = useState<"all" | "upcoming" | "past">("all");
    const [recurringFilter, setRecurringFilter] = useState<"all" | "recurring" | "one-time">("all");
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const itemsPerPage = 6;

    // Mock data (replace with API)
    const events = [
        { id: "1", title: "Youth Conference", date: "2025-03-12T10:00", image: "/placeholder.jpg", attendees: 120, attendanceRate: 75, recurring: false },
        { id: "2", title: "Sunday Thanksgiving Service", date: "2025-01-10T09:00", image: "/placeholder.jpg", attendees: 300, attendanceRate: 85, recurring: true },
        { id: "3", title: "Youth Conference 2025", date: "2026-03-12T10:00", image: "/placeholder.jpg", attendees: 150, attendanceRate: 80, recurring: true },
        { id: "4", title: "Sunday Service Morning", date: "2026-01-10T09:00", image: "/placeholder.jpg", attendees: 280, attendanceRate: 90, recurring: false },
        { id: "5", title: "Bible Study Group", date: "2025-04-15T18:00", image: "/placeholder.jpg", attendees: 50, attendanceRate: 70, recurring: true },
        { id: "6", title: "Youth Fellowship", date: "2025-05-20T16:00", image: "/placeholder.jpg", attendees: 80, attendanceRate: 75, recurring: false },
        { id: "7", title: "Prayer Meeting", date: "2025-06-01T19:00", image: "/placeholder.jpg", attendees: 40, attendanceRate: 60, recurring: true },
        { id: "8", title: "Church Anniversary", date: "2025-07-12T10:00", image: "/placeholder.jpg", attendees: 500, attendanceRate: 95, recurring: false },
        { id: "9", title: "Mission Trip Briefing", date: "2025-08-18T14:00", image: "/placeholder.jpg", attendees: 60, attendanceRate: 80, recurring: true },
        { id: "10", title: "Choir Practice", date: "2025-09-05T17:00", image: "/placeholder.jpg", attendees: 30, attendanceRate: 70, recurring: true },
        { id: "11", title: "Youth Conference 2026", date: "2026-03-20T10:00", image: "/placeholder.jpg", attendees: 200, attendanceRate: 85, recurring: true },
        { id: "12", title: "Elder Meeting", date: "2025-10-10T15:00", image: "/placeholder.jpg", attendees: 25, attendanceRate: 90, recurring: false },
        { id: "13", title: "Women's Fellowship", date: "2025-11-12T12:00", image: "/placeholder.jpg", attendees: 60, attendanceRate: 80, recurring: true },
        { id: "14", title: "Men's Fellowship", date: "2025-12-01T18:00", image: "/placeholder.jpg", attendees: 55, attendanceRate: 85, recurring: true },
        { id: "15", title: "Youth Talent Night", date: "2026-01-15T19:00", image: "/placeholder.jpg", attendees: 90, attendanceRate: 75, recurring: false },
        { id: "16", title: "Thanksgiving Service", date: "2025-11-28T10:00", image: "/placeholder.jpg", attendees: 350, attendanceRate: 88, recurring: true },
        { id: "17", title: "New Year Service", date: "2026-01-01T09:00", image: "/placeholder.jpg", attendees: 400, attendanceRate: 90, recurring: false },
        { id: "18", title: "Bible Marathon", date: "2025-09-20T08:00", image: "/placeholder.jpg", attendees: 70, attendanceRate: 75, recurring: true },
        { id: "19", title: "Harvest Festival", date: "2025-10-25T12:00", image: "/placeholder.jpg", attendees: 450, attendanceRate: 95, recurring: false },
        { id: "20", title: "Youth Retreat", date: "2025-08-15T07:00", image: "/placeholder.jpg", attendees: 120, attendanceRate: 80, recurring: true },
        { id: "21", title: "Sunday School Graduation", date: "2025-06-20T10:00", image: "/placeholder.jpg", attendees: 100, attendanceRate: 85, recurring: false },
        { id: "22", title: "Missionary Workshop", date: "2025-07-10T09:00", image: "/placeholder.jpg", attendees: 80, attendanceRate: 75, recurring: true },
        { id: "23", title: "Church Picnic", date: "2025-08-12T13:00", image: "/placeholder.jpg", attendees: 200, attendanceRate: 90, recurring: false },
        { id: "24", title: "Christmas Carol", date: "2025-12-24T18:00", image: "/placeholder.jpg", attendees: 300, attendanceRate: 92, recurring: true },
        { id: "25", title: "Youth Leadership Summit", date: "2025-09-30T10:00", image: "/placeholder.jpg", attendees: 150, attendanceRate: 85, recurring: false },
        { id: "26", title: "Bible Quiz", date: "2025-10-05T16:00", image: "/placeholder.jpg", attendees: 60, attendanceRate: 78, recurring: true },
        { id: "27", title: "Pastor's Appreciation", date: "2025-11-15T12:00", image: "/placeholder.jpg", attendees: 250, attendanceRate: 88, recurring: false },
        { id: "28", title: "Community Service Day", date: "2025-07-25T09:00", image: "/placeholder.jpg", attendees: 180, attendanceRate: 80, recurring: true },
        { id: "29", title: "Youth Praise Night", date: "2025-12-05T19:00", image: "/placeholder.jpg", attendees: 90, attendanceRate: 85, recurring: false },
        { id: "30", title: "Annual Leadership Retreat", date: "2026-01-20T08:00", image: "/placeholder.jpg", attendees: 220, attendanceRate: 90, recurring: true },
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
            .filter((event) => {
                if (recurringFilter === "recurring") return event.recurring;
                if (recurringFilter === "one-time") return !event.recurring;
                return true;
            })
            .filter((event) =>
                event.title.toLowerCase().includes(search.toLowerCase())
            );
    }, [events, filter, recurringFilter, search]);

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

                <div className="flex gap-2">
                    <EventFilters filter={filter} setFilter={(type) => { setFilter(type); setPage(1); }} />

                    {/* Recurring Filter */}
                    <select
                        className="border rounded px-2 py-1"
                        value={recurringFilter}
                        onChange={(e) => {
                            setRecurringFilter(e.target.value as any);
                            setPage(1);
                        }}
                    >
                        <option value="all">All</option>
                        <option value="recurring">Recurring</option>
                        <option value="one-time">One-time</option>
                    </select>
                </div>
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
