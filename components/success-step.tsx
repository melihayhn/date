import { Fragment } from "react";
import { RotateCcw, Send, Sparkles } from "lucide-react";
import { buildWhatsAppUrl, type Activity, type DayOption, type TimeSlot } from "@/lib/dates";
import { Confetti } from "./confetti";

type Props = {
  day: DayOption;
  activity: Activity;
  time: TimeSlot;
  onChangeMind: () => void;
};

export function SuccessStep({ day, activity, time, onChangeMind }: Props) {
  return (
    <section className="flex flex-1 flex-col" aria-labelledby="success-title" aria-live="polite">
      <Confetti />

      <div className="stagger flex flex-1 flex-col items-center text-center">
        <div className="mt-[clamp(24px,8dvh,72px)] grid size-16 place-items-center rounded-full bg-rose-soft text-rose shadow-[0_12px_30px_-12px_rgba(178,58,76,0.45)]">
          <Sparkles className="size-7" aria-hidden />
        </div>

        <h1 id="success-title" className="mt-7 text-[22px] font-semibold tracking-tight">
          Tamamdır, date ayarlandı. 🤝
        </h1>

        <div className="mt-8 w-full rounded-[32px] border border-line bg-paper px-6 py-9 shadow-[0_1px_2px_rgba(29,27,25,0.04),0_24px_60px_-28px_rgba(80,40,30,0.3)]">
          {/* Segments never break internally; lines may only wrap after a separator dot. */}
          <p className="font-serif text-[clamp(30px,10vw,50px)] leading-[1.08] tracking-[-0.02em] text-balance">
            {[day.shortText, activity.label, time].map((part, i) => (
              <Fragment key={part}>
                {i > 0 && <span className="text-rose">&nbsp;· </span>}
                <span className="whitespace-nowrap tabular-nums">{part}</span>
              </Fragment>
            ))}
          </p>
          <p className="mt-3 text-sm text-muted">{day.dateText}</p>
        </div>

        <p className="mt-7 text-[16px] text-ink/75">Şimdi plan yapma sırası bende.</p>

        <div className="mt-auto flex w-full flex-col items-center gap-2 pt-10">
          <a
            href={buildWhatsAppUrl(day, activity, time)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Seçimini WhatsApp ile bana gönder"
            className="group flex h-16 w-full items-center justify-center gap-2 rounded-full bg-ink text-[17px] font-semibold text-paper shadow-[0_18px_40px_-16px_rgba(29,27,25,0.6)] transition-all duration-300 ease-out-soft hover:bg-rose active:scale-[0.98] active:duration-100"
          >
            Bana gönder
            <Send
              className="size-[17px] transition-transform duration-300 ease-out-soft group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden
            />
          </a>

          <button
            type="button"
            onClick={onChangeMind}
            className="inline-flex h-12 items-center gap-1.5 rounded-full px-5 text-sm font-medium text-muted transition-colors hover:bg-ink/5 hover:text-ink active:scale-[0.97]"
          >
            <RotateCcw className="size-3.5" aria-hidden />
            Fikrimi değiştirdim
          </button>
        </div>
      </div>
    </section>
  );
}
