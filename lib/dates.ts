export type DayOption = {
  /** Stable id, e.g. "2026-10-06" */
  id: string;
  /** "6 Ekim Salı" */
  dateText: string;
  /** Word used on the time/final screens: "Bugün", "Yarın", "Salı" or "12 Ekim" */
  shortText: string;
  isToday: boolean;
};

const LOCALE = "tr-TR";
const DAY_MS = 86_400_000;

const capitalize = (value: string) =>
  value.charAt(0).toLocaleUpperCase(LOCALE) + value.slice(1);

export const startOfDay = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

export const toDayId = (date: Date) =>
  [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");

export function getDayOption(date: Date, today: Date): DayOption {
  const day = startOfDay(date);
  const offset = Math.round((day.getTime() - startOfDay(today).getTime()) / DAY_MS);
  const weekday = capitalize(day.toLocaleDateString(LOCALE, { weekday: "long" }));
  const dayMonth = day.toLocaleDateString(LOCALE, { day: "numeric", month: "long" });

  // Weekday names are only unambiguous within the coming week.
  const shortText =
    offset === 0 ? "Bugün" : offset === 1 ? "Yarın" : offset < 7 ? weekday : dayMonth;

  return { id: toDayId(day), dateText: `${dayMonth} ${weekday}`, shortText, isToday: offset === 0 };
}

/** Quick picks; any other time can be chosen with the native picker. */
export const TIME_SLOTS = ["19:00", "19:30", "20:00", "20:30", "21:00", "21:30"] as const;
/** "HH:MM" */
export type TimeSlot = string;

/** Today, a time is unavailable once it has been reached. */
export function isSlotAvailable(slot: TimeSlot, day: DayOption, now: Date) {
  if (!day.isToday) return true;
  const [hours, minutes] = slot.split(":").map(Number);
  return hours * 60 + minutes > now.getHours() * 60 + now.getMinutes();
}

export const ACTIVITIES = [
  { id: "coffee", label: "Kahve", description: "Sakin, rahat, bol sohbet." },
  { id: "dinner", label: "Yemek", description: "Güzel bir masa, uzun bir akşam." },
  { id: "walk", label: "Biraz gezelim", description: "Yürürüz, bir şeyler keşfederiz." },
  { id: "surprise", label: "Bana bırak", description: "Sürpriz plan. Detayları ben hallederim." },
] as const;
export type Activity = (typeof ACTIVITIES)[number];

export function buildWhatsAppUrl(day: DayOption, activity: Activity, time: TimeSlot) {
  // "bugün" / "yarın" read better lowercase mid-sentence; names and dates stay as-is.
  const relative = day.shortText === "Bugün" || day.shortText === "Yarın";
  const dayWord = relative ? day.shortText.toLocaleLowerCase(LOCALE) : day.shortText;
  const text = `First date için ${dayWord}, ${activity.label} ve ${time} seçtim :)`;
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") ?? "";
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}
