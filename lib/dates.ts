export type DayOption = {
  /** Stable id, e.g. "2026-10-06" */
  id: string;
  /** Card title: "Bugün" or the weekday name ("Salı") */
  label: string;
  /** Card subtitle: "6 Ekim Salı" */
  dateText: string;
  /** Short display: "Salı, 6 Ekim" */
  longText: string;
  /** Word used in the final screen / message: "Bugün" or "Salı" */
  shortText: string;
  isToday: boolean;
};

const LOCALE = "tr-TR";

const capitalize = (value: string) =>
  value.charAt(0).toLocaleUpperCase(LOCALE) + value.slice(1);

const toId = (date: Date) =>
  [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");

/** Today plus the next two days (on a Monday: Bugün, Salı, Çarşamba). */
export function getDayOptions(now: Date, count = 3): DayOption[] {
  return Array.from({ length: count }, (_, offset) => {
    const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + offset);
    const weekday = capitalize(date.toLocaleDateString(LOCALE, { weekday: "long" }));
    const dayMonth = date.toLocaleDateString(LOCALE, { day: "numeric", month: "long" });
    const isToday = offset === 0;

    return {
      id: toId(date),
      label: isToday ? "Bugün" : weekday,
      dateText: `${dayMonth} ${weekday}`,
      longText: `${weekday}, ${dayMonth}`,
      shortText: isToday ? "Bugün" : weekday,
      isToday,
    };
  });
}

export const TIME_SLOTS = ["18:00", "19:00", "20:00", "21:00"] as const;
export type TimeSlot = (typeof TIME_SLOTS)[number];

/** A slot is still available today if it starts at least 30 minutes from now. */
export function isSlotAvailable(slot: TimeSlot, day: DayOption, now: Date) {
  if (!day.isToday) return true;
  const [hours, minutes] = slot.split(":").map(Number);
  const slotMinutes = hours * 60 + minutes;
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  return slotMinutes - nowMinutes >= 30;
}

export function buildWhatsAppUrl(day: DayOption, time: TimeSlot) {
  const dayWord = day.isToday ? "bugün" : day.shortText;
  const text = `First date için ${dayWord} ${time} seçtim :)`;
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") ?? "";
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}
