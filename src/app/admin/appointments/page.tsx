import { db } from "@/lib/db";
import AppointmentsManager from "@/components/admin/AppointmentsManager";

export default function AdminAppointmentsPage() {
  const appointments = db.getAppointments();

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-hairline pb-4">
        <div>
          <span className="text-[10px] uppercase tracking-[0.24em] text-mauve-dusty font-semibold block">
            Studio Management
          </span>
          <h1 className="text-3xl font-serif text-espresso font-normal">
            Appointments &amp; Schedule
          </h1>
        </div>
      </div>

      <AppointmentsManager initialAppointments={appointments} />
    </div>
  );
}
