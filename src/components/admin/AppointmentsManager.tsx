"use client";

import React, { useState } from "react";
import {
  CalendarCheck,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  MapPin,
  ExternalLink,
  Filter,
} from "lucide-react";
import { Appointment } from "@/lib/db/types";

export default function AppointmentsManager({
  initialAppointments,
}: {
  initialAppointments: Appointment[];
}) {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const filtered = appointments.filter((apt) => {
    const matchesStatus =
      statusFilter === "ALL" || apt.status === statusFilter;
    const matchesSearch =
      apt.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.bookingReference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.serviceName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleStatusChange = async (
    id: string,
    newStatus: Appointment["status"]
  ) => {
    setUpdatingId(id);
    try {
      const res = await fetch("/api/admin/appointments/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setAppointments((prev) =>
          prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
        );
      }
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 bg-ivory border border-stone-hairline">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-mauve-dusty absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by client, reference, service..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-porcelain border border-stone-hairline text-xs text-espresso focus:outline-none focus:border-espresso font-sans"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {["ALL", "CONFIRMED", "COMPLETED", "CANCELLED"].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 text-[10px] uppercase tracking-wider font-sans font-medium transition-colors ${
                statusFilter === st
                  ? "bg-espresso text-porcelain"
                  : "bg-porcelain border border-stone-hairline text-espresso/70 hover:text-espresso"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Appointments List / Table */}
      <div className="bg-ivory/60 border border-stone-hairline overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-ivory border-b border-stone-hairline text-mauve-dusty uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-4">Reference &amp; Date</th>
                <th className="p-4">Client</th>
                <th className="p-4">Treatment</th>
                <th className="p-4">Price</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-hairline/60 bg-porcelain">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-espresso-muted">
                    No appointments match your search criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((apt) => (
                  <tr key={apt.id} className="hover:bg-ivory/40 transition-colors">
                    <td className="p-4 font-mono">
                      <span className="font-semibold text-espresso block">
                        {apt.bookingReference}
                      </span>
                      <span className="text-[11px] text-mauve-dusty font-sans">
                        {new Date(apt.startAt).toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </span>
                    </td>
                    <td className="p-4">
                      <strong className="text-espresso block font-medium">
                        {apt.customerName}
                      </strong>
                      <span className="text-espresso-muted text-[11px] block">
                        {apt.customerEmail}
                      </span>
                      <span className="text-mauve-dusty text-[10px] block">
                        {apt.customerPhone}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-espresso font-medium block">
                        {apt.serviceName}
                      </span>
                      <span className="text-[10px] text-mauve-dusty">
                        With {apt.staffName} · {apt.durationMinutes} min
                      </span>
                    </td>
                    <td className="p-4 font-serif text-sm text-espresso font-medium">
                      ${(apt.priceCents / 100).toFixed(2)}
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 text-[9px] uppercase font-semibold tracking-wider ${
                          apt.status === "CONFIRMED"
                            ? "bg-emerald-100 text-emerald-800"
                            : apt.status === "COMPLETED"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-stone-200 text-stone-700"
                        }`}
                      >
                        {apt.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        {apt.status !== "COMPLETED" && (
                          <button
                            type="button"
                            disabled={updatingId === apt.id}
                            onClick={() =>
                              handleStatusChange(apt.id, "COMPLETED")
                            }
                            className="px-2 py-1 bg-ivory border border-stone-hairline text-espresso text-[10px] hover:border-espresso font-medium"
                          >
                            Mark Completed
                          </button>
                        )}
                        {apt.status !== "CANCELLED" && (
                          <button
                            type="button"
                            disabled={updatingId === apt.id}
                            onClick={() =>
                              handleStatusChange(apt.id, "CANCELLED")
                            }
                            className="px-2 py-1 border border-red-200 text-red-700 text-[10px] hover:bg-red-50 font-medium"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
