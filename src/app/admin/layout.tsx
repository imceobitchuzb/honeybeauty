import React from "react";
import { getCurrentUser, isSetupRequired } from "@/lib/auth";
import AdminShell from "@/components/admin/AdminShell";
import AdminAuthGate from "@/components/admin/AdminAuthGate";

export const metadata = {
  title: "Admin Workspace | Flutterhoney Business Platform",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const needsSetup = isSetupRequired();
  const user = await getCurrentUser();

  if (needsSetup || !user) {
    return (
      <AdminAuthGate needsSetup={needsSetup}>
        {children}
      </AdminAuthGate>
    );
  }

  return (
    <AdminShell user={user}>
      {children}
    </AdminShell>
  );
}
