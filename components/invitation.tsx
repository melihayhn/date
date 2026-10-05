"use client";

import { useMemo, useRef, useState } from "react";
import { getDayOptions, type DayOption, type TimeSlot } from "@/lib/dates";
import { useNow } from "@/lib/use-now";
import { IntroStep } from "./intro-step";
import { TimeStep } from "./time-step";
import { SuccessStep } from "./success-step";

type Step = "intro" | "time" | "success";

const haptic = () => {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) navigator.vibrate(8);
};

export function Invitation() {
  const now = useNow();
  // Local midnight as a number, so day options only rebuild when the date changes.
  const dayKey = now ? new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime() : null;
  const days = useMemo(() => (dayKey === null ? null : getDayOptions(new Date(dayKey))), [dayKey]);

  const [step, setStep] = useState<Step>("intro");
  const [day, setDay] = useState<DayOption | null>(null);
  const [time, setTime] = useState<TimeSlot | null>(null);
  const scrollRef = useRef<HTMLElement>(null);

  const goTo = (next: Step) => {
    setStep(next);
    window.scrollTo({ top: 0 });
    scrollRef.current?.scrollTo({ top: 0 });
  };

  const selectDay = (option: DayOption) => {
    haptic();
    if (option.id !== day?.id) setTime(null);
    setDay(option);
    goTo("time");
  };

  const selectTime = (slot: TimeSlot) => {
    haptic();
    setTime(slot);
  };

  const confirm = () => {
    if (!day || !time) return;
    haptic();
    goTo("success");
  };

  const restart = () => {
    setDay(null);
    setTime(null);
    goTo("intro");
  };

  return (
    <div className="relative isolate flex min-h-dvh w-full items-stretch justify-center overflow-x-clip sm:items-center sm:p-6">
      <Backdrop />

      <main
        ref={scrollRef}
        className="relative flex min-h-dvh w-full max-w-[440px] flex-col [scrollbar-width:none] sm:h-[min(880px,calc(100dvh-48px))] sm:min-h-0 sm:overflow-y-auto sm:rounded-[44px] sm:border sm:border-white/80 sm:bg-paper/60 sm:shadow-[0_40px_120px_-40px_rgba(80,40,30,0.35),0_0_0_1px_rgba(29,27,25,0.04)] sm:backdrop-blur-2xl"
      >
        <div className="flex flex-1 flex-col px-6 pt-[max(env(safe-area-inset-top),28px)] pb-[max(env(safe-area-inset-bottom),20px)] sm:px-8 sm:pt-10">
          <div key={step} className="flex flex-1 flex-col">
            {step === "intro" && <IntroStep days={days} now={now} onSelect={selectDay} />}
            {step === "time" && day && (
              <TimeStep
                day={day}
                now={now}
                time={time}
                onSelectTime={selectTime}
                onBack={() => goTo("intro")}
                onConfirm={confirm}
              />
            )}
            {step === "success" && day && time && (
              <SuccessStep day={day} time={time} onChangeMind={restart} />
            )}
          </div>

          <footer className="pt-8 text-center text-xs tracking-wide text-muted/70">no pressure :)</footer>
        </div>
      </main>
    </div>
  );
}

function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(178,58,76,0.16),transparent_65%)] blur-2xl" />
      <div className="absolute -bottom-48 -left-32 h-[440px] w-[440px] animate-float rounded-full bg-[radial-gradient(circle,rgba(234,170,120,0.2),transparent_65%)] blur-2xl" />
      <div className="absolute top-1/3 -right-40 h-[380px] w-[380px] animate-float rounded-full bg-[radial-gradient(circle,rgba(178,58,76,0.09),transparent_65%)] blur-2xl [animation-delay:-3s]" />
    </div>
  );
}
