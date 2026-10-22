import { db } from "@/lib/db";
import ContentEditor from "@/components/admin/ContentEditor";

export default function AdminContentPage() {
  const content = db.getSiteContent();

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-hairline pb-4">
        <div>
          <span className="text-[10px] uppercase tracking-[0.24em] text-mauve-dusty font-semibold block">
            Brand Identity Management
          </span>
          <h1 className="text-3xl font-serif text-espresso font-normal">
            Website Content &amp; Headlines
          </h1>
        </div>
      </div>

      <ContentEditor initialContent={content} />
    </div>
  );
}
