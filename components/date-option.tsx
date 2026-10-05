import { ArrowRight } from "lucide-react";
import type { DayOption } from "@/lib/dates";

type Props = {
  day: DayOption;
  disabled?: boolean;
  onSelect: (day: DayOption) => void;
};

export function DateOption({ day, disabled, onSelect }: Props) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onSelect(day)}
      aria-label={`${day.label}, ${day.dateText}${disabled ? " (bugün için geç oldu)" : ""}`}
      className="group relative flex min-h-[84px] w-full items-center justify-between gap-4 overflow-hidden rounded-[26px] border border-line bg-paper px-5 py-4 text-left shadow-[0_1px_2px_rgba(29,27,25,0.04),0_8px_24px_-12px_rgba(80,40,30,0.12)] transition-all duration-300 ease-out-soft hover:-translate-y-0.5 hover:border-rose/25 hover:shadow-[0_2px_4px_rgba(29,27,25,0.04),0_18px_40px_-16px_rgba(178,58,76,0.28)] active:translate-y-0 active:scale-[0.98] active:duration-100 disabled:pointer-events-none disabled:opacity-45"
    >
      <span
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(120%_120%_at_100%_50%,rgba(178,58,76,0.07),transparent_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-active:opacity-100"
      />
      <span className="relative flex flex-col">
        <span className="flex items-center gap-2 text-[21px] font-semibold tracking-tight">
          {day.label}
          {day.isToday && !disabled && (
            <span className="rounded-full bg-rose-soft px-2 py-0.5 text-[10px] font-semibold tracking-[0.12em] text-rose uppercase">
              cesur seçim
            </span>
          )}
        </span>
        <span className="mt-0.5 text-sm text-muted">
          {disabled ? "Bugün için biraz geç oldu" : day.dateText}
        </span>
      </span>
      <span className="relative grid size-11 shrink-0 place-items-center rounded-full bg-cream text-ink transition-all duration-300 ease-out-soft group-hover:bg-rose group-hover:text-white group-active:bg-rose group-active:text-white">
        <ArrowRight
          className="size-[18px] transition-transform duration-300 ease-out-soft group-hover:translate-x-0.5"
          aria-hidden
        />
      </span>
    </button>
  );
}
