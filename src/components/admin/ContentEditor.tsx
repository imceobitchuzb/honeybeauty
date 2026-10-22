"use client";

import React, { useState } from "react";
import { Check, Sparkles } from "lucide-react";
import { SiteContent } from "@/lib/db/types";

export default function ContentEditor({
  initialContent,
}: {
  initialContent: SiteContent;
}) {
  const [content, setContent] = useState(initialContent);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/admin/content/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });

      if (!res.ok) {
        throw new Error("Failed to save content.");
      }

      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to update website content");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-6 max-w-3xl font-sans text-xs">
      {saved && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>Website content updated successfully.</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700">
          {errorMsg}
        </div>
      )}

      {/* Announcement Strip */}
      <div className="bg-ivory/60 border border-stone-hairline p-6 space-y-4">
        <h2 className="font-serif text-lg text-espresso font-medium border-b border-stone-hairline pb-2">
          Top Announcement Strip
        </h2>

        <div className="space-y-1">
          <label className="block text-espresso font-medium">
            Primary Announcement Statement
          </label>
          <input
            type="text"
            required
            value={content.announcementText}
            onChange={(e) =>
              setContent({ ...content, announcementText: e.target.value })
            }
            className="w-full px-3 py-2 bg-porcelain border border-stone-hairline text-espresso"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-espresso font-medium">
            Location Subtitle Kicker
          </label>
          <input
            type="text"
            required
            value={content.announcementSubtext}
            onChange={(e) =>
              setContent({ ...content, announcementSubtext: e.target.value })
            }
            className="w-full px-3 py-2 bg-porcelain border border-stone-hairline text-espresso"
          />
        </div>
      </div>

      {/* Hero Content */}
      <div className="bg-ivory/60 border border-stone-hairline p-6 space-y-4">
        <h2 className="font-serif text-lg text-espresso font-medium border-b border-stone-hairline pb-2">
          Homepage Hero Headline &amp; Message
        </h2>

        <div className="space-y-1">
          <label className="block text-espresso font-medium">
            Main Editorial Display Headline
          </label>
          <input
            type="text"
            required
            value={content.heroHeadline}
            onChange={(e) =>
              setContent({ ...content, heroHeadline: e.target.value })
            }
            className="w-full px-3 py-2 bg-porcelain border border-stone-hairline text-espresso"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-espresso font-medium">
            Supporting Brand Narrative
          </label>
          <textarea
            rows={3}
            required
            value={content.heroSubheadline}
            onChange={(e) =>
              setContent({ ...content, heroSubheadline: e.target.value })
            }
            className="w-full px-3 py-2 bg-porcelain border border-stone-hairline text-espresso"
          />
        </div>
      </div>

      {/* Studio Policy */}
      <div className="bg-ivory/60 border border-stone-hairline p-6 space-y-4">
        <h2 className="font-serif text-lg text-espresso font-medium border-b border-stone-hairline pb-2">
          Studio Notice &amp; Arrival Policy
        </h2>

        <div className="space-y-1">
          <label className="block text-espresso font-medium">
            Public Studio Notice
          </label>
          <input
            type="text"
            required
            value={content.studioNotice}
            onChange={(e) =>
              setContent({ ...content, studioNotice: e.target.value })
            }
            className="w-full px-3 py-2 bg-porcelain border border-stone-hairline text-espresso"
          />
        </div>
      </div>

      <div className="flex items-center justify-end">
        <button
          type="submit"
          disabled={isSaving}
          className="px-8 py-3 bg-espresso text-porcelain uppercase tracking-[0.2em] font-medium hover:bg-espresso-light transition-all shadow-md disabled:opacity-50"
        >
          {isSaving ? "Saving..." : "Publish Content Changes"}
        </button>
      </div>
    </form>
  );
}
