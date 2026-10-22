import { getSquareConfig } from "@/lib/square";
import SquareSettingsManager from "@/components/admin/SquareSettingsManager";

export default function AdminSettingsPage() {
  const config = getSquareConfig();

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-hairline pb-4">
        <div>
          <span className="text-[10px] uppercase tracking-[0.24em] text-mauve-dusty font-semibold block">
            Integration &amp; Platform Configuration
          </span>
          <h1 className="text-3xl font-serif text-espresso font-normal">
            Platform Settings &amp; Square
          </h1>
        </div>
      </div>

      <SquareSettingsManager config={config} />
    </div>
  );
}
