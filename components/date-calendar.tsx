"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { startOfDay, toDayId } from "@/lib/dates";

const WEEKDAYS = ["Pt", "Sa", "Ça", "Pe", "Cu", "Ct", "Pz"];

type Props = {
  today: Date;
  selectedId: string | null;
  onSelect: (date: Date) => void;
};

/** Month calendar with unlimited forward navigation; past days are disabled. */
export function DateCalendar({ today, selectedId, onSelect }: Props) {
  const todayStart = startOfDay(today);
  const [month, setMonth] = useState(() => {
    if (!selectedId) return new Date(todayStart.getFullYear(), todayStart.getMonth(), 1);
    const [year, monthIndex] = selectedId.split("-").map(Number);
    return new Date(year, monthIndex - 1, 1);
  });

  const isCurrentMonth =
    month.getFullYear() === todayStart.getFullYear() && month.getMonth() === todayStart.getMonth();
  const monthLabel = month.toLocaleDateString("tr-TR", { month: "long", year: "numeric" });
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  // Monday-first offset (getDay: Sunday = 0).
  const leading = (month.getDay() + 6) % 7;

  const shiftMonth = (delta: number) =>
    setMonth((current) => new Date(current.getFullYear(), current.getMonth() + delta, 1));

  return (
    <div className="rounded-[28px] border border-line bg-paper p-3 shadow-[0_1px_2px_rgba(29,27,25,0.04),0_8px_24px_-12px_rgba(80,40,30,0.12)]">
      <div className="flex items-center justify-between pb-2 pl-3">
        <p className="text-[17px] font-semibold tracking-tight capitalize" aria-live="polite">
          {monthLabel}
        </p>
        <div className="flex">
          <button
            type="button"
            onClick={() => shiftMonth(-1)}
            disabled={isCurrentMonth}
            aria-label="Önceki ay"
            className="grid size-11 place-items-center rounded-full text-ink/70 transition-colors hover:bg-ink/5 hover:text-ink active:scale-95 disabled:pointer-events-none disabled:opacity-25"
          >
            <ChevronLeft className="size-5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => shiftMonth(1)}
            aria-label="Sonraki ay"
            className="grid size-11 place-items-center rounded-full text-ink/70 transition-colors hover:bg-ink/5 hover:text-ink active:scale-95"
          >
            <ChevronRight className="size-5" aria-hidden />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 pb-1 text-center text-[11px] font-medium tracking-wide text-muted uppercase">
        {WEEKDAYS.map((name) => (
          <span key={name}>{name}</span>
        ))}
      </div>

      <div key={month.getTime()} className="grid animate-rise grid-cols-7 gap-y-1 [animation-duration:0.35s]">
        {Array.from({ length: leading }, (_, i) => (
          <span key={`pad-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const date = new Date(month.getFullYear(), month.getMonth(), i + 1);
          const id = toDayId(date);
          const isPast = date < todayStart;
          const isToday = date.getTime() === todayStart.getTime();
          const selected = id === selectedId;

          return (
            <button
              key={id}
              type="button"
              disabled={isPast}
              onClick={() => onSelect(date)}
              aria-pressed={selected}
              aria-label={date.toLocaleDateString("tr-TR", { day: "numeric", month: "long", weekday: "long" })}
              className={`relative mx-auto grid aspect-square w-full max-w-12 place-items-center rounded-full text-[16px] font-medium tabular-nums transition-all duration-200 ease-out-soft active:scale-90 disabled:pointer-events-none disabled:text-muted/35 ${
                selected
                  ? "bg-rose text-white shadow-[0_10px_24px_-10px_rgba(178,58,76,0.7)]"
                  : "text-ink hover:bg-rose-soft"
              }`}
            >
              {i + 1}
              {isToday && !selected && (
                <span aria-hidden className="absolute bottom-1.5 size-1 rounded-full bg-rose" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
