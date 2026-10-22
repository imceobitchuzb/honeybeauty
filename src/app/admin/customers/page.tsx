import { db } from "@/lib/db";
import { Users, Mail, Phone, CalendarCheck, ShoppingBag } from "lucide-react";

interface CustomerAggregate {
  name: string;
  email: string;
  phone: string;
  appointmentCount: number;
  orderCount: number;
  totalSpendCents: number;
  lastActive: string;
}

export default function AdminCustomersPage() {
  const appointments = db.getAppointments();
  const orders = db.getOrders();

  const customerMap = new Map<string, CustomerAggregate>();

  // Aggregate from appointments
  appointments.forEach((apt) => {
    const key = apt.customerEmail.toLowerCase();
    const existing = customerMap.get(key) || {
      name: apt.customerName,
      email: apt.customerEmail,
      phone: apt.customerPhone,
      appointmentCount: 0,
      orderCount: 0,
      totalSpendCents: 0,
      lastActive: apt.startAt,
    };

    existing.appointmentCount += 1;
    existing.totalSpendCents += apt.priceCents;
    if (new Date(apt.startAt) > new Date(existing.lastActive)) {
      existing.lastActive = apt.startAt;
    }
    customerMap.set(key, existing);
  });

  // Aggregate from orders
  orders.forEach((ord) => {
    const key = ord.customerEmail.toLowerCase();
    const existing = customerMap.get(key) || {
      name: ord.customerName,
      email: ord.customerEmail,
      phone: ord.customerPhone,
      appointmentCount: 0,
      orderCount: 0,
      totalSpendCents: 0,
      lastActive: ord.createdAt,
    };

    existing.orderCount += 1;
    existing.totalSpendCents += ord.totalCents;
    if (new Date(ord.createdAt) > new Date(existing.lastActive)) {
      existing.lastActive = ord.createdAt;
    }
    customerMap.set(key, existing);
  });

  const customerList = Array.from(customerMap.values()).sort(
    (a, b) => b.totalSpendCents - a.totalSpendCents
  );

  return (
    <div className="space-y-6 animate-fadeIn font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-hairline pb-4">
        <div>
          <span className="text-[10px] uppercase tracking-[0.24em] text-mauve-dusty font-semibold block">
            Client Directory
          </span>
          <h1 className="text-3xl font-serif text-espresso font-normal">
            Clients &amp; Guest Profiles
          </h1>
        </div>
        <span className="text-xs text-mauve-dusty font-medium">
          {customerList.length} Verified Client Profiles
        </span>
      </div>

      <div className="bg-ivory/60 border border-stone-hairline overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-ivory border-b border-stone-hairline text-mauve-dusty uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-4">Client Name</th>
                <th className="p-4">Contact Details</th>
                <th className="p-4 text-center">Appointments</th>
                <th className="p-4 text-center">Orders</th>
                <th className="p-4">Total Spend</th>
                <th className="p-4">Last Activity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-hairline/60 bg-porcelain">
              {customerList.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-espresso-muted">
                    No client records yet.
                  </td>
                </tr>
              ) : (
                customerList.map((client, idx) => (
                  <tr key={idx} className="hover:bg-ivory/30">
                    <td className="p-4">
                      <strong className="font-serif text-sm text-espresso font-medium block">
                        {client.name}
                      </strong>
                    </td>
                    <td className="p-4 space-y-0.5 text-xs">
                      <span className="text-espresso flex items-center gap-1.5">
                        <Mail className="w-3 h-3 text-rose-muted" />
                        {client.email}
                      </span>
                      <span className="text-mauve-dusty text-[11px] flex items-center gap-1.5">
                        <Phone className="w-3 h-3 text-rose-muted" />
                        {client.phone}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <span className="inline-flex items-center gap-1 text-espresso font-medium">
                        <CalendarCheck className="w-3.5 h-3.5 text-rose-muted" />
                        {client.appointmentCount}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <span className="inline-flex items-center gap-1 text-espresso font-medium">
                        <ShoppingBag className="w-3.5 h-3.5 text-rose-muted" />
                        {client.orderCount}
                      </span>
                    </td>
                    <td className="p-4 font-serif text-sm font-medium text-espresso">
                      ${(client.totalSpendCents / 100).toFixed(2)}
                    </td>
                    <td className="p-4 text-[11px] text-mauve-dusty">
                      {new Date(client.lastActive).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
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
