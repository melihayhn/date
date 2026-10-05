# First Date?

Just one question. Gün ve saat seçtiren minimal bir first date davet sitesi.

Next.js (App Router) · TypeScript · Tailwind CSS v4 · lucide-react. Backend yok; her şey statik.

## Geliştirme

```bash
npm install
npm run dev
```

## Akış

1. **Gün** — Bugün + sonraki iki gün, tarayıcıdaki tarihe göre dinamik (Pazartesi açılırsa: Bugün, Salı, Çarşamba). Bugün için saatlerin hepsi geçtiyse "Bugün" kartı pasif olur.
2. **Saat** — 18:00 / 19:00 / 20:00 / 21:00. Bugün seçildiyse 30 dakikadan az kalmış saatler pasif olur.
3. **Onay** — Konfeti, seçilen gün · saat ve WhatsApp ile "Bana gönder" butonu.

## Ortam değişkenleri (opsiyonel)

| Değişken | Açıklama |
| --- | --- |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Verilirse "Bana gönder" doğrudan bu numaraya açılır (örn. `905551112233`). Verilmezse WhatsApp kişi seçtirir. |
| `NEXT_PUBLIC_SITE_URL` | Link önizlemesi (OG image) için mutlak URL. Vercel'de otomatik algılanır, genelde gerek yok. |

## Deploy

Vercel'e ek ayar gerekmeden deploy edilir: repo'yu import et ya da `npx vercel` çalıştır.
