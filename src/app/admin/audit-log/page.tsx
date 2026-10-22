import { db } from "@/lib/db";
import { Shield, Clock, User } from "lucide-react";

export default function AdminAuditLogPage() {
  const logs = db.getAuditLogs();

  return (
    <div className="space-y-6 animate-fadeIn font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-hairline pb-4">
        <div>
          <span className="text-[10px] uppercase tracking-[0.24em] text-mauve-dusty font-semibold block">
            System Security &amp; Compliance
          </span>
          <h1 className="text-3xl font-serif text-espresso font-normal">
            Administrative Audit Log
          </h1>
        </div>
        <span className="text-xs text-mauve-dusty font-medium">
          {logs.length} Logged Audit Events
        </span>
      </div>

      <div className="bg-ivory/60 border border-stone-hairline overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-ivory border-b border-stone-hairline text-mauve-dusty uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-4">Timestamp</th>
                <th className="p-4">User / Operator</th>
                <th className="p-4">Action</th>
                <th className="p-4">Target Entity</th>
                <th className="p-4">Event Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-hairline/60 bg-porcelain font-mono text-[11px]">
              {logs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-espresso-muted font-sans text-xs">
                    No administrative audit events recorded yet.
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log.id} className="hover:bg-ivory/30">
                    <td className="p-4 text-mauve-dusty whitespace-nowrap">
                      {new Date(log.createdAt).toLocaleString()}
                    </td>
                    <td className="p-4 text-espresso font-medium">
                      {log.userEmail}
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 bg-stone-100 text-espresso text-[10px] font-semibold border border-stone-hairline">
                        {log.action}
                      </span>
                    </td>
                    <td className="p-4 text-mauve-dusty">
                      {log.entityType} {log.entityId ? `(${log.entityId})` : ""}
                    </td>
                    <td className="p-4 text-espresso-muted truncate max-w-xs">
                      {log.details ? JSON.stringify(log.details) : "—"}
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
