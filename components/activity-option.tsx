import { Coffee, Footprints, Sparkles, UtensilsCrossed, type LucideIcon } from "lucide-react";
import type { Activity } from "@/lib/dates";

const ICONS: Record<Activity["id"], LucideIcon> = {
  coffee: Coffee,
  dinner: UtensilsCrossed,
  walk: Footprints,
  surprise: Sparkles,
};

type Props = {
  activity: Activity;
  selected: boolean;
  onSelect: (activity: Activity) => void;
};

export function ActivityOption({ activity, selected, onSelect }: Props) {
  const Icon = ICONS[activity.id];

  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      aria-label={`${activity.label}: ${activity.description}`}
      onClick={() => onSelect(activity)}
      className={`group relative flex h-full min-h-[148px] w-full flex-col items-start overflow-hidden rounded-[26px] border px-4 py-4 text-left transition-all duration-300 ease-out-soft active:scale-[0.97] active:duration-100 ${
        selected
          ? "border-rose/50 bg-rose-soft/70 shadow-[0_0_0_1px_rgba(178,58,76,0.25),0_18px_40px_-16px_rgba(178,58,76,0.35)]"
          : "border-line bg-paper shadow-[0_1px_2px_rgba(29,27,25,0.04),0_8px_24px_-12px_rgba(80,40,30,0.12)] hover:-translate-y-0.5 hover:border-rose/25 hover:shadow-[0_2px_4px_rgba(29,27,25,0.04),0_18px_40px_-16px_rgba(178,58,76,0.28)]"
      }`}
    >
      <span
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(120%_120%_at_100%_0%,rgba(178,58,76,0.07),transparent_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-active:opacity-100"
      />
      <span
        className={`relative grid size-11 place-items-center rounded-full transition-all duration-300 ease-out-soft ${
          selected
            ? "bg-rose text-white"
            : "bg-cream text-ink group-hover:bg-rose group-hover:text-white group-active:bg-rose group-active:text-white"
        }`}
      >
        <Icon className="size-[19px]" aria-hidden />
      </span>
      <span className="relative mt-4 text-[17px] font-semibold tracking-tight">{activity.label}</span>
      <span className="relative mt-1 text-[13px] leading-snug text-muted">{activity.description}</span>
    </button>
  );
}
