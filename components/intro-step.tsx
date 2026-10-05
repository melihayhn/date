import { Sparkles } from "lucide-react";
import { isSlotAvailable, TIME_SLOTS, type DayOption } from "@/lib/dates";
import { DateOption } from "./date-option";

type Props = {
  days: DayOption[] | null;
  now: Date | null;
  onSelect: (day: DayOption) => void;
};

export function IntroStep({ days, now, onSelect }: Props) {
  return (
    <section className="stagger flex flex-1 flex-col" aria-labelledby="intro-title">
      <p lang="en" className="flex items-center justify-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-muted">
        <Sparkles className="size-3 animate-twinkle text-rose" aria-hidden />
        just one question
      </p>

      <h1
        id="intro-title"
        className="mt-[clamp(28px,7dvh,64px)] text-center font-serif text-[clamp(64px,19vw,84px)] leading-[0.95] tracking-[-0.02em]"
      >
        First <em className="text-rose">date?</em>
      </h1>

      <p className="mx-auto mt-5 max-w-[19rem] text-center text-[17px] leading-relaxed text-balance text-ink/80">
        Bence bunu mesajlarda konuşmak yerine yüz yüze konuşmalıyız.
      </p>

      <p className="mt-[clamp(28px,6dvh,52px)] text-center text-sm text-muted">
        Geriye sadece günü seçmek kaldı.
      </p>

      <ul className="mt-4 flex flex-col gap-3" aria-label="Gün seçenekleri">
        {days
          ? days.map((day) => {
              const available = !now || TIME_SLOTS.some((slot) => isSlotAvailable(slot, day, now));
              return (
                <li key={day.id}>
                  <DateOption day={day} disabled={!available} onSelect={onSelect} />
                </li>
              );
            })
          : Array.from({ length: 3 }, (_, i) => (
              <li key={i} className="h-[84px] animate-pulse rounded-[26px] border border-line bg-paper/70" />
            ))}
      </ul>
    </section>
  );
}
