# First Date?

Just one question. Gün ve saat seçtiren minimal bir first date davet sitesi.

Next.js (App Router) · TypeScript · Tailwind CSS v4 · lucide-react. Backend yok; her şey statik.

## Geliştirme

```bash
npm install
npm run dev
```

## Akış

1. **Gün** — Takvimden istenen herhangi bir gün (geçmiş günler pasif, ileri aylara sınırsız gidilir).
2. **Plan** — Kahve / Yemek / Biraz gezelim / Bana bırak.
3. **Saat** — 19:00–21:30 hızlı seçenekler + "Başka bir saat seç" ile istenen herhangi bir saat. Bugün için saati gelmiş/geçmiş saatler seçilemez.
4. **Onay** — Konfeti, gün · plan · saat ve WhatsApp ile "Bana gönder" butonu.

## Ortam değişkenleri (opsiyonel)

| Değişken | Açıklama |
| --- | --- |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Verilirse "Bana gönder" doğrudan bu numaraya açılır (örn. `905551112233`). Verilmezse WhatsApp kişi seçtirir. |
| `NEXT_PUBLIC_SITE_URL` | Link önizlemesi (OG image) için mutlak URL. Vercel'de otomatik algılanır, genelde gerek yok. |

## Deploy

Vercel'e ek ayar gerekmeden deploy edilir: repo'yu import et ya da `npx vercel` çalıştır.
