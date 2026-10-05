import { ArrowRight, ChevronLeft } from "lucide-react";
import { isSlotAvailable, TIME_SLOTS, type Activity, type DayOption, type TimeSlot } from "@/lib/dates";
import { TimeOption } from "./time-option";

type Props = {
  day: DayOption;
  activity: Activity;
  now: Date | null;
  time: TimeSlot | null;
  onSelectTime: (time: TimeSlot) => void;
  onBack: () => void;
  onConfirm: () => void;
};

export function TimeStep({ day, activity, now, time, onSelectTime, onBack, onConfirm }: Props) {
  return (
    <section className="stagger flex flex-1 flex-col" aria-labelledby="time-title">
      <div className="-ml-2 flex">
        <button
          type="button"
          onClick={onBack}
          aria-label="Plan seçimine dön"
          className="grid size-11 place-items-center rounded-full text-ink/70 transition-colors hover:bg-ink/5 hover:text-ink active:scale-95"
        >
          <ChevronLeft className="size-6" aria-hidden />
        </button>
      </div>

      <h1
        id="time-title"
        className="mt-[clamp(12px,4dvh,40px)] font-serif text-[clamp(52px,15vw,64px)] leading-none tracking-[-0.02em]"
      >
        Güzel <em className="text-rose">seçim.</em>
      </h1>

      <p className="mt-4 inline-flex w-fit items-center rounded-full border border-line bg-paper px-4 py-2 text-[15px] font-medium shadow-[0_1px_2px_rgba(29,27,25,0.04)]">
        {day.shortText} <span className="mx-1.5 text-rose">·</span> {activity.label} ✨
      </p>

      <h2 className="mt-[clamp(32px,7dvh,56px)] text-[19px] font-semibold tracking-tight">
        Saat kaçta buluşuyoruz?
      </h2>

      <div role="radiogroup" aria-label="Saat seçenekleri" className="mt-4 grid grid-cols-2 gap-3">
        {TIME_SLOTS.map((slot) => (
          <TimeOption
            key={slot}
            time={slot}
            selected={slot === time}
            disabled={now ? !isSlotAvailable(slot, day, now) : false}
            onSelect={onSelectTime}
          />
        ))}
      </div>

      <div className="mt-auto pt-10">
        <button
          type="button"
          onClick={onConfirm}
          disabled={!time}
          className={`group flex h-16 w-full items-center justify-center gap-2 rounded-full text-[17px] font-semibold transition-all duration-500 ease-out-soft active:scale-[0.98] active:duration-100 ${
            time
              ? "bg-rose text-white shadow-[0_18px_40px_-14px_rgba(178,58,76,0.65)] hover:bg-rose-deep"
              : "cursor-not-allowed bg-ink/[0.06] text-muted"
          }`}
        >
          Date&apos;i kesinleştir
          <ArrowRight
            className={`size-[18px] transition-all duration-500 ease-out-soft ${
              time ? "translate-x-0 opacity-100 group-hover:translate-x-1" : "-translate-x-2 opacity-0"
            }`}
            aria-hidden
          />
        </button>
      </div>
    </section>
  );
}
