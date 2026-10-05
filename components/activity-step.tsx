import { ChevronLeft } from "lucide-react";
import { ACTIVITIES, type Activity } from "@/lib/dates";
import { ActivityOption } from "./activity-option";

type Props = {
  activity: Activity | null;
  onSelect: (activity: Activity) => void;
  onBack: () => void;
};

export function ActivityStep({ activity, onSelect, onBack }: Props) {
  return (
    <section className="stagger flex flex-1 flex-col" aria-labelledby="activity-title">
      <div className="-ml-2 flex">
        <button
          type="button"
          onClick={onBack}
          aria-label="Gün seçimine dön"
          className="grid size-11 place-items-center rounded-full text-ink/70 transition-colors hover:bg-ink/5 hover:text-ink active:scale-95"
        >
          <ChevronLeft className="size-6" aria-hidden />
        </button>
      </div>

      <h1
        id="activity-title"
        className="mt-[clamp(12px,4dvh,40px)] font-serif text-[clamp(40px,11.5vw,52px)] leading-[1.02] tracking-[-0.02em] text-balance"
      >
        Nasıl bir gün geçirmek <em className="text-rose">istersin?</em>
      </h1>

      <p className="mt-4 text-[15px] text-muted">Planı biraz şekillendirelim.</p>

      <div
        role="radiogroup"
        aria-label="Plan seçenekleri"
        className="mt-[clamp(24px,5dvh,40px)] grid grid-cols-1 gap-3 min-[360px]:grid-cols-2"
      >
        {ACTIVITIES.map((option) => (
          <ActivityOption
            key={option.id}
            activity={option}
            selected={option.id === activity?.id}
            onSelect={onSelect}
          />
        ))}
      </div>
    </section>
  );
}
