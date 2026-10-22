import { db } from "@/lib/db";
import { Calendar as CalendarIcon, Clock, MapPin } from "lucide-react";

export default function AdminCalendarPage() {
  const appointments = db.getAppointments().filter((a) => a.status !== "CANCELLED");

  // Group appointments by date string
  const grouped: Record<string, typeof appointments> = {};
  appointments.forEach((apt) => {
    const d = new Date(apt.startAt).toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    });
    if (!grouped[d]) grouped[d] = [];
    grouped[d].push(apt);
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-hairline pb-4">
        <div>
          <span className="text-[10px] uppercase tracking-[0.24em] text-mauve-dusty font-semibold block">
            Visual Agenda
          </span>
          <h1 className="text-3xl font-serif text-espresso font-normal">
            Studio Calendar View
          </h1>
        </div>
      </div>

      <div className="space-y-6">
        {Object.keys(grouped).length === 0 ? (
          <div className="p-12 bg-ivory/60 border border-stone-hairline text-center text-espresso-muted font-sans text-xs">
            No active appointments scheduled on the calendar.
          </div>
        ) : (
          Object.entries(grouped).map(([dateStr, apts]) => (
            <div key={dateStr} className="bg-ivory/60 border border-stone-hairline p-6 space-y-4">
              <h2 className="font-serif text-xl text-espresso font-medium flex items-center gap-2 border-b border-stone-hairline pb-3">
                <CalendarIcon className="w-4 h-4 text-rose-muted" />
                <span>{dateStr}</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {apts.map((apt) => {
                  const startTime = new Date(apt.startAt).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                  });
                  const endTime = new Date(apt.endAt).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                  });

                  return (
                    <div
                      key={apt.id}
                      className="p-4 bg-porcelain border border-stone-hairline space-y-2 text-xs font-sans"
                    >
                      <div className="flex items-center justify-between text-mauve-dusty">
                        <span className="flex items-center gap-1 font-medium text-espresso">
                          <Clock className="w-3.5 h-3.5 text-rose-muted" />
                          {startTime} – {endTime}
                        </span>
                        <span className="text-[10px] font-mono">{apt.bookingReference}</span>
                      </div>

                      <div>
                        <strong className="font-serif text-base text-espresso block font-medium">
                          {apt.customerName}
                        </strong>
                        <p className="text-espresso-muted">{apt.serviceName}</p>
                      </div>

                      <div className="pt-2 border-t border-stone-hairline/60 flex items-center justify-between text-[11px]">
                        <span className="text-mauve-dusty">{apt.customerPhone}</span>
                        <span className="font-serif text-espresso font-medium">
                          ${(apt.priceCents / 100).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
