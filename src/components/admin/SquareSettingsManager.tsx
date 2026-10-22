"use client";

import React, { useState } from "react";
import { CheckCircle2, AlertTriangle, ExternalLink, RefreshCw, Key, ShieldCheck, Copy } from "lucide-react";
import { SquareConfig } from "@/lib/square";

export default function SquareSettingsManager({
  config,
}: {
  config: SquareConfig;
}) {
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{
    status: string;
    message: string;
    locationName?: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const webhookUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/api/webhooks/square`;

  const handleTestConnection = async () => {
    setTesting(true);
    setTestResult(null);
    try {
      const res = await fetch("/api/admin/square/test", { method: "POST" });
      const data = await res.json();
      setTestResult(data);
    } catch {
      setTestResult({
        status: "DISCONNECTED",
        message: "Failed to connect to test endpoint.",
      });
    } finally {
      setTesting(false);
    }
  };

  const handleCopyWebhook = () => {
    navigator.clipboard.writeText(webhookUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 font-sans text-xs">
      {/* Current Connection Status Box */}
      <div className="p-6 bg-ivory/60 border border-stone-hairline space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-hairline pb-4">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-mauve-dusty font-semibold">
              Integration State
            </span>
            <h2 className="font-serif text-xl text-espresso font-medium">
              Official Square API Connector
            </h2>
          </div>

          <button
            type="button"
            disabled={testing}
            onClick={handleTestConnection}
            className="inline-flex items-center gap-2 px-4 py-2 bg-espresso text-porcelain text-xs uppercase tracking-wider font-medium hover:bg-espresso-light transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${testing ? "animate-spin" : ""}`} />
            <span>{testing ? "Testing..." : "Test Connection"}</span>
          </button>
        </div>

        {testResult && (
          <div
            className={`p-4 border text-xs leading-relaxed ${
              testResult.status.startsWith("CONNECTED")
                ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                : "bg-amber-50 border-amber-200 text-amber-900"
            }`}
          >
            <p className="font-semibold">{testResult.message}</p>
            {testResult.locationName && (
              <p className="mt-1">Verified Location: {testResult.locationName}</p>
            )}
          </div>
        )}

        {/* Configuration Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 bg-porcelain border border-stone-hairline space-y-1">
            <span className="text-[10px] uppercase tracking-wider text-mauve-dusty font-semibold">
              Active Environment
            </span>
            <p className="text-sm font-medium text-espresso uppercase">
              {config.environment}
            </p>
            <p className="text-[11px] text-espresso-muted">
              Configure in .env or production environment settings
            </p>
          </div>

          <div className="p-4 bg-porcelain border border-stone-hairline space-y-1">
            <span className="text-[10px] uppercase tracking-wider text-mauve-dusty font-semibold">
              Location ID
            </span>
            <p className="text-sm font-mono text-espresso truncate">
              {config.locationId || "Not Configured (Demo Mode)"}
            </p>
            <p className="text-[11px] text-espresso-muted">
              Required for Bookings and Orders API
            </p>
          </div>

          <div className="p-4 bg-porcelain border border-stone-hairline space-y-1 sm:col-span-2">
            <span className="text-[10px] uppercase tracking-wider text-mauve-dusty font-semibold">
              Application ID
            </span>
            <p className="text-sm font-mono text-espresso truncate">
              {config.applicationId || "Not Configured (Demo Mode)"}
            </p>
          </div>
        </div>
      </div>

      {/* Webhook Configuration Details */}
      <div className="p-6 bg-ivory/60 border border-stone-hairline space-y-4">
        <h3 className="font-serif text-lg text-espresso font-medium border-b border-stone-hairline pb-2">
          Square Webhook Listener Endpoint
        </h3>
        <p className="text-espresso-muted leading-relaxed">
          Add this webhook URL into your Square Developer Dashboard under <strong>Webhooks &gt; Subscriptions</strong> to enable automatic synchronization of payments, bookings, and cancellations.
        </p>

        <div className="flex items-center gap-2">
          <input
            type="text"
            readOnly
            value={webhookUrl}
            className="flex-1 px-3 py-2 bg-porcelain border border-stone-hairline text-espresso font-mono text-xs select-all"
          />
          <button
            type="button"
            onClick={handleCopyWebhook}
            className="px-3.5 py-2 bg-espresso text-porcelain text-xs uppercase tracking-wider font-medium hover:bg-espresso-light flex items-center gap-1.5"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>{copied ? "Copied" : "Copy"}</span>
          </button>
        </div>

        <div className="p-3 bg-porcelain border border-stone-hairline text-[11px] text-espresso-muted space-y-1">
          <strong>Recommended Square Events:</strong>
          <ul className="list-disc pl-4 space-y-0.5 font-mono">
            <li>payment.updated</li>
            <li>booking.created</li>
            <li>booking.updated</li>
            <li>order.updated</li>
          </ul>
        </div>
      </div>

      {/* Guide for Corina & Store Owner */}
      <div className="p-6 bg-ivory border border-stone-hairline space-y-4">
        <div className="flex items-center justify-between border-b border-stone-hairline pb-2">
          <h3 className="font-serif text-lg text-espresso font-medium flex items-center gap-2">
            <Key className="w-4 h-4 text-rose-muted" />
            <span>How to Connect Your Real Square Account</span>
          </h3>
          <a
            href="https://developer.squareup.com/apps"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-espresso font-medium hover:text-rose-muted underline"
          >
            <span>Square Developer Portal</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <ol className="list-decimal pl-4 space-y-2 text-espresso/80 leading-relaxed">
          <li>
            Visit the <strong>Square Developer Dashboard</strong> at <code>developer.squareup.com/apps</code> and sign in with your business Square credentials.
          </li>
          <li>
            Open or create an application named <strong>Flutterhoney Platform</strong>.
          </li>
          <li>
            Under <strong>Credentials</strong>, copy your <strong>Application ID</strong> and <strong>Access Token</strong> (choose Production or Sandbox).
          </li>
          <li>
            Under <strong>Locations</strong>, copy the Location ID for <em>Scottsdale Quarter / Loft 28</em>.
          </li>
          <li>
            Add these keys to your hosting environment variables (e.g., in Vercel or your production server):
            <div className="mt-2 p-3 bg-porcelain border border-stone-hairline font-mono text-[11px] text-espresso">
              SQUARE_ENVIRONMENT=&quot;production&quot;<br />
              SQUARE_APPLICATION_ID=&quot;sq0idp-...&quot;<br />
              SQUARE_ACCESS_TOKEN=&quot;EAAAl...&quot;<br />
              SQUARE_LOCATION_ID=&quot;L...&quot;<br />
              SQUARE_WEBHOOK_SIGNATURE_KEY=&quot;...&quot;
            </div>
          </li>
          <li>
            Click <strong>Test Connection</strong> above to verify live communication with Square.
          </li>
        </ol>
      </div>
    </div>
  );
}
