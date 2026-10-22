"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, ShieldCheck, Sparkles, ArrowRight, AlertCircle, UserCheck } from "lucide-react";

export default function AdminAuthGate({
  needsSetup,
  children,
}: {
  needsSetup: boolean;
  children: React.ReactNode;
}) {
  const router = useRouter();

  // Setup state
  const [setupName, setSetupName] = useState("");
  const [setupEmail, setSetupEmail] = useState("");
  const [setupPassword, setSetupPassword] = useState("");
  const [setupConfirm, setSetupConfirm] = useState("");

  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (setupPassword !== setupConfirm) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/auth/setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: setupName,
          email: setupEmail,
          password: setupPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Setup failed.");
      }

      router.refresh();
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to initialize administrator.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Invalid email or password.");
      }

      router.refresh();
    } catch (err: any) {
      setErrorMsg(err.message || "Authentication failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-porcelain min-h-screen flex items-center justify-center p-4 sm:p-8">
      <div className="max-w-md w-full bg-ivory border border-stone-hairline p-8 sm:p-10 shadow-editorial space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="text-[10px] uppercase tracking-[0.24em] text-mauve-dusty font-semibold block">
            Flutterhoney Administration
          </span>
          <h1 className="text-3xl font-serif text-espresso font-normal">
            {needsSetup ? "Initial Security Setup" : "Staff & Owner Sign In"}
          </h1>
          <p className="text-xs text-espresso-muted font-sans leading-relaxed">
            {needsSetup
              ? "Create the primary administrator credentials to manage appointments, inventory, and Square commerce."
              : "Access real-time appointments, orders, catalog synchronization, and analytics."}
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {needsSetup ? (
          /* INITIAL SETUP FORM */
          <form onSubmit={handleSetup} className="space-y-4 text-xs font-sans">
            <div className="space-y-1">
              <label className="block text-espresso font-medium">Administrator Full Name *</label>
              <input
                type="text"
                required
                value={setupName}
                onChange={(e) => setSetupName(e.target.value)}
                placeholder="e.g. Corina Gonzalez"
                className="w-full px-3.5 py-2.5 bg-porcelain border border-stone-hairline text-espresso focus:outline-none focus:border-espresso"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-espresso font-medium">Email Address *</label>
              <input
                type="email"
                required
                value={setupEmail}
                onChange={(e) => setSetupEmail(e.target.value)}
                placeholder="corina@flutterhoney.com"
                className="w-full px-3.5 py-2.5 bg-porcelain border border-stone-hairline text-espresso focus:outline-none focus:border-espresso"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-espresso font-medium">Master Password (min 8 chars) *</label>
              <input
                type="password"
                required
                minLength={8}
                value={setupPassword}
                onChange={(e) => setSetupPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-porcelain border border-stone-hairline text-espresso focus:outline-none focus:border-espresso"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-espresso font-medium">Confirm Master Password *</label>
              <input
                type="password"
                required
                minLength={8}
                value={setupConfirm}
                onChange={(e) => setSetupConfirm(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-porcelain border border-stone-hairline text-espresso focus:outline-none focus:border-espresso"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-espresso text-porcelain text-xs uppercase tracking-[0.2em] font-medium hover:bg-espresso-light transition-all shadow-md active:translate-y-px disabled:opacity-50 mt-2"
            >
              {isLoading ? "Configuring Store..." : "Initialize Administrator"}
            </button>
          </form>
        ) : (
          /* LOGIN FORM */
          <form onSubmit={handleLogin} className="space-y-4 text-xs font-sans">
            <div className="space-y-1">
              <label className="block text-espresso font-medium">Email Address</label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="admin@flutterhoney.com"
                className="w-full px-3.5 py-2.5 bg-porcelain border border-stone-hairline text-espresso focus:outline-none focus:border-espresso"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-espresso font-medium">Password</label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-porcelain border border-stone-hairline text-espresso focus:outline-none focus:border-espresso"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-espresso text-porcelain text-xs uppercase tracking-[0.2em] font-medium hover:bg-espresso-light transition-all shadow-md active:translate-y-px disabled:opacity-50 mt-2"
            >
              {isLoading ? "Verifying..." : "Sign In to Admin"}
            </button>
          </form>
        )}

        <div className="pt-4 border-t border-stone-hairline text-center text-[11px] text-mauve-dusty font-sans">
          <p>End-to-end PBKDF2 cryptographic hashing &amp; HTTP-only cookie security.</p>
        </div>
      </div>
    </div>
  );
}
