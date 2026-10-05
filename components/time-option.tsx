import type { TimeSlot } from "@/lib/dates";

type Props = {
  time: TimeSlot;
  selected: boolean;
  disabled?: boolean;
  onSelect: (time: TimeSlot) => void;
};

export function TimeOption({ time, selected, disabled, onSelect }: Props) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      aria-label={disabled ? `${time}, bugün için geçti` : time}
      disabled={disabled}
      onClick={() => onSelect(time)}
      className={`relative h-16 w-full rounded-[22px] border text-[19px] font-semibold tracking-tight tabular-nums transition-all duration-300 ease-out-soft active:scale-[0.96] active:duration-100 disabled:pointer-events-none disabled:text-muted/50 disabled:line-through ${
        selected
          ? "scale-[1.02] border-ink bg-ink text-paper shadow-[0_14px_30px_-14px_rgba(29,27,25,0.55)]"
          : "border-line bg-paper text-ink shadow-[0_1px_2px_rgba(29,27,25,0.04)] hover:-translate-y-0.5 hover:border-rose/30 hover:shadow-[0_12px_28px_-16px_rgba(178,58,76,0.3)]"
      }`}
    >
      {time}
    </button>
  );
}
