# A&V Poligraf — Website

Modern, fast, SEO-optimized showcase website for local print shop **A&V Poligraf SRL** (Comrat, Gagauzia, Moldova).

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4
- next-intl (RU / RO)
- Lucide, React Hook Form + Zod

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000 — redirects to `/ru`.

## Deploy

Ready for Vercel. Connect the GitHub repo in Vercel dashboard or:

```bash
npx vercel
```

## Structure

- `/[locale]` — home
- `/[locale]/services` — services
- `/[locale]/portfolio` — portfolio with filters
- `/[locale]/about` — about company
- `/[locale]/contact` — contact form + map

## Notes

- Forms are frontend-only (demo success state)
- Placeholders used for images/portfolio
- Real contacts from company data
