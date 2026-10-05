import { Sparkles } from "lucide-react";
import { DateCalendar } from "./date-calendar";

type Props = {
  now: Date | null;
  selectedId: string | null;
  onSelect: (date: Date) => void;
};

export function IntroStep({ now, selectedId, onSelect }: Props) {
  return (
    <section className="stagger flex flex-1 flex-col" aria-labelledby="intro-title">
      <p lang="en" className="flex items-center justify-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-muted">
        <Sparkles className="size-3 animate-twinkle text-rose" aria-hidden />
        just one question
      </p>

      <h1
        id="intro-title"
        className="mt-[clamp(20px,5dvh,48px)] text-center font-serif text-[clamp(64px,19vw,84px)] leading-[0.95] tracking-[-0.02em]"
      >
        First <em className="text-rose">date?</em>
      </h1>

      <p className="mx-auto mt-5 max-w-[19rem] text-center text-[17px] leading-relaxed text-balance text-ink/80">
        Bence bunu mesajlarda konuşmak yerine yüz yüze konuşmalıyız.
      </p>

      <p className="mt-[clamp(24px,4dvh,40px)] text-center text-sm text-muted">
        Hangi gün müsaitsen, o gün olsun.
      </p>

      <div className="mt-4">
        {now ? (
          <DateCalendar today={now} selectedId={selectedId} onSelect={onSelect} />
        ) : (
          <div className="h-[372px] animate-pulse rounded-[28px] border border-line bg-paper/70" />
        )}
      </div>
    </section>
  );
}
