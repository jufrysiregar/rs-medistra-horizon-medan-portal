# 🏥 Medistra Horizon Hospital Medan — Website

Official marketing and patient-information website of **Medistra Horizon Hospital Medan** (locally branded *RS Medistra Horizon Medan*) — a bilingual (Indonesian / English) hospital brand site covering 41 routes: 21 service and support-unit pages, a specialist directory with practice schedules, insurance and BPJS patient flows, health-education content with a live WHO news feed, event and promo packages, careers, and FAQ.

The site is a static-first **Next.js 14 App Router** application: every page is server-rendered from versioned local JSON datasets, and only a small number of interactive islands (booking modal, doctor filters, BMI calculator, carousels, feedback form) run as client components. There is no backend and no database — the content itself lives in the repository.

![Status](https://img.shields.io/badge/status-production%20ready-0891b2)
![Next.js](https://img.shields.io/badge/Next.js-14.2.15-black?logo=nextdotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178c6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06b6d4?logo=tailwindcss&logoColor=white)
![React](https://img.shields.io/badge/React-18.3-61dafb?logo=react&logoColor=000)
![i18n](https://img.shields.io/badge/languages-ID%20%7C%20EN-4f46e5)
![License](https://img.shields.io/badge/license-private-f64f6e)

| | |
|---|---|
| **Live Demo** | _replace with the production URL (e.g. `https://medistrahorizon.co.id`)_ |
| **Staging / Preview** | _replace with the preview URL, or run locally with `npm run dev`_ |
| **APK (mobile app)** | _not applicable — this repository ships a responsive website, not a native app_ |

---

## ✨ Key Features

- **Bilingual down to the data layer (ID ⇄ EN).** The active language is stored in the `mhm_lang` cookie, read server-side through `getLang()`, and merged into each dataset via `localize()` using English overlay files in `src/data/en/*.json`. Switching languages re-renders Server Components, so SEO metadata, `alt` text, and `<title>` all change with it — this is not a client-only string swap.
- **41 routes mapped to the full patient journey.** 21 service and support-unit pages under `/layanan/*` (emergency, ICU/HDU, NICU, haemodialysis, chemotherapy, theatre, radiology, laboratory, pharmacy, endoscopy, physiotherapy, maternity, inpatient, laundry, sterilisation, canteen, playground, membership, screening, specialist clinics, events), 5 patient-information flows under `/informasi-pasien/*`, 4 education pages, plus the doctor directory, careers, promos, FAQ, privacy policy, and terms.
- **Specialist directory with live scheduling.** Sixty doctors filterable by clinic, availability status, and payment method, showing weekday practice schedules, structural positions, room/floor locations across the North and South wings, and one-click appointment booking.
- **Conversion-focused CTAs throughout.** Appointment booking modal, 24/7 emergency and ambulance modal, language-aware WhatsApp click-to-chat prefills, membership packages, and promo packages that can be ordered directly in WhatsApp.
- **Formspree-powered feedback form.** The "Pesan, Kesan & Masukan" (feedback) form on `/tentang-kami/profil` submits multipart `FormData` — including file attachments — with client-side validation, a disabled submitting state, an animated success card, and a clear failure message.
- **Live WHO health news.** `/edukasi-kesehatan/berita-who` fetches and normalises WHO articles server-side (`src/lib/fetchWHO.ts`) and degrades gracefully when the upstream feed is unreachable.
- **Prevention and self-care toolkit.** First-aid guidance by age group, medical red-flag checklist, safe-medication options, and a BMI calculator modal that accepts comma decimals to match Indonesian locale input habits.
- **Careers module.** Fifteen job listings with per-position qualifications, language-aware posting timestamps (WIB), and generated WhatsApp / email application templates.
- **Motion system built on Framer Motion.** Scroll-reveal entrances, spring-driven modals, animated statistic counters, and a full-screen transition overlay when the language changes.
- **Strict design-system discipline.** One light theme (dark surfaces are explicitly out of scope), a single navy/cyan palette defined in `tailwind.config.js`, and literal utility classes only — safe for Tailwind's JIT scanner.
- **Accessibility and SEO hygiene.** `<html lang>` synchronised with the active language, per-language descriptive `alt` pairs, breadcrumbs, semantic landmarks, labelled search and tab controls, and per-route metadata with Open Graph descriptions in both languages.

---

## 🧱 Tech Stack

### Core

| Layer | Technology | Version | Notes |
|---|---|---|---|
| Framework | [Next.js](https://nextjs.org) (App Router) | `^14.2.15` | Server Components by default; `'use client'` only for interactive islands |
| Language | TypeScript | `^5.7.3` | Path alias `@/* → ./src/*`, `strict: false` |
| UI library | React / React DOM | `^18.3.1` | |
| Styling | Tailwind CSS | `^3.4.17` | Light theme only, custom `navy` scale |
| Animation | Framer Motion | `^11.18.2` | Scroll reveals, modals, language-transition overlay |
| Iconography | lucide-react | `^0.475.0` | Brand marks inlined as Simple Icons SVG (WhatsApp) |

### Supporting libraries

| Purpose | Library | Version |
|---|---|---|
| Conditional class names | `clsx` | `^2.1.1` |
| Tailwind class conflict resolution | `tailwind-merge` | `^2.6.0` |
| Image optimisation / build pipeline | `sharp` | `^0.35.5` (dev) |
| CSS toolchain | `postcss`, `autoprefixer` | `^8.5.1`, `^10.4.20` |
| Type definitions | `@types/node`, `@types/react`, `@types/react-dom` | `22.20.5`, `^18.3.18`, `^18.3.5` |

### External services & content sources

| Integration | Location | Notes |
|---|---|---|
| Formspree (form endpoint) | `src/app/tentang-kami/profil/ProfilClient.tsx` | `POST` with `FormData`; only `Accept: application/json` is set so the browser supplies the multipart boundary |
| WhatsApp click-to-chat | `src/data/*.json`, `components/HeroSection.tsx`, service CTAs | Prefilled message follows the active language |
| WHO public news feed | `src/lib/fetchWHO.ts` | Remote image hosts allow-listed in `next.config.mjs` |
| Content datasets | `src/data/*.json` + `src/data/en/*.json` | English mirrors override only the leaves they declare |

---

## 🔧 Prerequisites

Before you start, ensure the following are installed:

- **Node.js `v18.18+`** — v20 or v24 recommended; development happens on v24
- **npm 9+** — a `package-lock.json` is committed; `pnpm`/`yarn` work but are not the default
- **Git**
- **A modern evergreen browser** — Chrome, Edge, Firefox, or Safari (last two major versions)
- _Optional:_ `curl` for server-rendered smoke tests (`sharp` is pulled in automatically as a dev dependency)

```bash
node -v        # expect v18.18 or newer
npm -v         # expect 9 or newer
git --version
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <your-repository-url> rs-medistra-horizon-medan
cd rs-medistra-horizon-medan
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure the environment (optional)

The site boots with **zero required environment variables** — all content is local JSON.
Copy the example file only if you want to point integrations at your own accounts:

```bash
cp .env.local.example .env.local
```

### 4. Start the development server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000). The home page, doctor directory,
and every `/layanan/*` route should render immediately.

> ⚠️ **Never run `next build` while `next dev` is running — and never run two dev servers
> against the same working copy.** Both write to the shared `.next` directory; concurrent
> writes leave stale route manifests that surface as phantom 404s on routes that exist.
> Stop the dev server first, or use a separate checkout.

### 5. Type-check before committing

```bash
npx tsc --noEmit -p tsconfig.json
```

This is the project's correctness gate. Expected result: no output, exit code `0`.

---

## 🔐 Environment Variables

No variable is mandatory. The values below document what the application reads at runtime
and where each one currently lives, so they can be lifted into `.env.local` when real
credentials or endpoints are introduced.

```bash
# .env.local — everything here is optional; defaults are compiled into the source

# Formspree endpoint for the "Pesan, Kesan & Masukan" feedback form (/tentang-kami/profil).
# Current default: hardcoded FORMSPREE_URL in src/app/tentang-kami/profil/ProfilClient.tsx
NEXT_PUBLIC_FORMSPREE_URL="https://formspree.io/f/xxxxxxxx"

# Canonical hotlines used by click-to-chat CTAs and the emergency band.
# Current default: src/data/*.json and src/components/HeroSection.tsx
NEXT_PUBLIC_WHATSAPP_CARE="6281144415515"
NEXT_PUBLIC_HOTLINE_UGD="0614567890"

# Absolute base URL used for metadata, canonical tags, and Open Graph.
NEXT_PUBLIC_SITE_URL="https://example.com"
```

| Variable | Required | Current default location | Purpose |
|---|---|---|---|
| `NEXT_PUBLIC_FORMSPREE_URL` | no | `ProfilClient.tsx` | Feedback-form destination |
| `NEXT_PUBLIC_WHATSAPP_CARE` | no | `src/data/*.json` | Customer-care click-to-chat |
| `NEXT_PUBLIC_HOTLINE_UGD` | no | hero / footer components | 24/7 emergency number |
| `NEXT_PUBLIC_SITE_URL` | no | metadata defaults | Absolute URLs in metadata |

**Remote image hosts** are not configured through `.env`. Add them to
`images.remotePatterns` in `next.config.mjs` — currently `images.unsplash.com`,
`www.who.int`, and `cdn.who.int`. Omitting a host here makes `<Image>` throw at request time.

---

## 📂 Project Structure

```text
rs-medistra-horizon-medan/
├── public/
│   ├── files/                     # Downloadable documents (legal PDFs, brochures)
│   └── images/                    # Static assets served as-is
│
├── src/
│   ├── app/                       # Next.js App Router — one folder per route
│   │   ├── layout.tsx             # Root layout, LanguageProvider, header/footer shell
│   │   ├── page.tsx               # /               (Home)
│   │   ├── providers.tsx          # Client provider composition
│   │   ├── globals.css            # Tailwind layers + global refinements
│   │   │
│   │   ├── cari-dokter/           # Doctor directory, schedules, filters, booking
│   │   ├── edukasi-kesehatan/     # Health education
│   │   │   ├── artikel/           # Article list + 3 article detail routes
│   │   │   ├── berita-who/        # Live WHO news feed
│   │   │   └── panduan-sehat-mandiri/   # Self-care guide + BMI modal
│   │   ├── faq/                   # Bilingual FAQ (29 Q&A, tabs, search)
│   │   ├── informasi-pasien/      # BPJS / insurance / general flows, building map, partners
│   │   ├── layanan/               # 21 service & support-unit pages
│   │   │   ├── ugd/  icu-hdu/  nicu/  hemodialisa/  kemoterapi/  ruang-operasi/
│   │   │   ├── poli-spesialis/  radiologi/  laboratorium-medis/  farmasi/
│   │   │   ├── cek-kesehatan/  endoskopi/  fisioterapi/  pelayanan-persalinan/
│   │   │   └── fasilitas-rawat-inap/  laundry/  sterilisasi/  kantin/
│   │   │       taman-bermain/  membership/  program-event/
│   │   ├── tentang-kami/          # Profil (feedback form), Karir (+ detail), Event & Promo (+ detail)
│   │   ├── kebijakan-privasi/     # Privacy policy
│   │   └── syarat-ketentuan/      # Terms of service
│   │
│   ├── components/                # 23 shared components: HeaderNavbar, Footer, HeroSection,
│   │                              # BookingModal, EmergencyModal, PaketCard, FasilitasUnggulan,
│   │                              # MeetOurDoctors, StatsBand, ArtikelEvent, Breadcrumbs, …
│   ├── context/
│   │   └── LanguageContext.tsx    # ID/EN state, translation dictionary, transition overlay
│   ├── data/                      # All content as JSON — the single source of truth
│   │   ├── dokter.json            # 60 specialists, schedules, clinic tags, locations
│   │   ├── karir.json             # 15 job listings with qualification arrays
│   │   ├── event-promo.json       # Promos & events (type: 'promo' | 'event')
│   │   ├── fasilitas-unit.json    # Service & support-unit page content
│   │   ├── gedung.json  poli.json  mcu.json  farmasi.json  tentang.json …
│   │   ├── en/                    # English overlays, merged by localize()
│   │   │   ├── karir.json  event-promo.json  tentang.json  poli.json …
│   │   ├── dokterFoto.ts          # Static-import map for doctor portraits
│   │   └── *Foto.ts               # Other static image registries
│   ├── images/                    # Bundled assets (imported, hashed by the bundler)
│   │   ├── hero/  dokter/  artikel/  berita/  event/  promo/  profil/  mitra/  logo/
│   │
│   ├── lib/
│   │   ├── i18n.ts                # tp(), tpObj(), localize(), trDays(), trMonths()
│   │   ├── lang.ts                # getLang() — reads the language cookie on the server
│   │   ├── langCookie.ts          # Client-side cookie read/write helpers
│   │   ├── eventPromo.ts          # Typed accessors + English merge for promos/events
│   │   ├── facilityUnit.ts        # Accessors for /layanan/* content
│   │   ├── karir.ts               # Career accessors, WIB dates, mailto / WhatsApp builders
│   │   ├── fetchWHO.ts            # WHO news fetch + normalisation
│   │   ├── whoNewsTypes.ts        # WHO payload types
│   │   └── overhaul.ts            # Link gating / page-transition utilities
│   │
│   └── types/
│       └── index.ts               # Shared domain types (Language, Dokter, EventPromo, …)
│
├── next.config.mjs                # reactStrictMode + remote image allow-list
├── tailwind.config.js             # Palette, font stack, content globs
├── postcss.config.js
├── tsconfig.json                  # strict:false, @/* path alias
├── package.json                   # dev / build / start scripts
└── README.md
```

---

## 🛠️ Build & Testing

### npm scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server on port 3000 |
| `npm run build` | Create the production build (stop `next dev` first) |
| `npm start` | Serve the production build |

```bash
# Development with hot reload
npm run dev

# Type check — the project gate; expected output is empty
npx tsc --noEmit -p tsconfig.json

# Production build
npm run build

# Serve the build locally
npm start
```

### Route smoke tests

The site is content-driven, so verification is mostly render checking against server-rendered
HTML. The language cookie makes both variants directly testable:

```bash
# 1. Indonesian mode
curl -s -o /dev/null -w "%{http_code}\n" http://127.0.0.1:3000/

# 2. English mode — server-rendered from the mhm_lang cookie
curl -s -H "Cookie: mhm_lang=en" http://127.0.0.1:3000/layanan/icu-hdu | grep -o "8 beds"

# 3. Dynamic detail routes
curl -s -o /dev/null -w "%{http_code}\n" \
  -H "Cookie: mhm_lang=en" http://127.0.0.1:3000/tentang-kami/karir/1

# 4. Every static route must return 200 in both languages
for r in / /cari-dokter /faq /layanan/ugd /layanan/poli-spesialis /tentang-kami/karir; do
  printf "%-28s " "$r"
  curl -s -o /dev/null -w "id=%{http_code} " -H "Cookie: mhm_lang=id"  "http://127.0.0.1:3000$r"
  curl -s -o /dev/null -w "en=%{http_code}\n" -H "Cookie: mhm_lang=en" "http://127.0.0.1:3000$r"
done
```

### Manual QA checklist

- [ ] `npx tsc --noEmit -p tsconfig.json` exits clean with no output.
- [ ] Every `/layanan/*`, `/informasi-pasien/*`, and `/edukasi-kesehatan/*` route returns `200` in both languages.
- [ ] No Indonesian sentence remains visible in English mode. Proper nouns are exempt by design (*BPJS Kesehatan*, *KARS*, *KRIS*, *SatuSehat*, *SIMRS*, *WIB*, street addresses).
- [ ] `alt` text, `aria-label`, input placeholders, `<title>`, and meta descriptions switch with the language.
- [ ] Booking and emergency modals open, trap focus, and close without layout shift.
- [ ] The feedback form validates input, transmits attachments, disables the submit button while sending, shows the animated success card, and resets after the transition.
- [ ] Doctor filtering by clinic, status, and free-text search behaves identically in both languages.
- [ ] Career dates render locale-correctly (`31 Okt 2026` → `31 Oct 2026`) and application templates follow the active language.
- [ ] Mobile viewports use the dedicated `mobile-*` image variants where provided.

### Automated tests

No test runner is bundled yet. When adding coverage, the recommended pairing is **Vitest**
for pure helpers (`src/lib/i18n.ts`, `karir.ts` date formatting, normalisers) and
**Playwright** for the bilingual switch and booking flows.

---

## 🌐 Localization Workflow

Content changes must be made in **both** languages:

1. Edit the Indonesian source of truth in `src/data/<name>.json`.
2. Add only the changed leaves to `src/data/en/<name>.json`. Arrays merge **by index**, so
   item order and count must stay identical to the Indonesian file.
3. Inline UI strings use `tp(lang, 'Bahasa', 'English')` or `tpObj(lang, { id, en })`;
   shared dictionary entries live in `src/context/LanguageContext.tsx`.
4. Weekday and month names are normalised centrally by `trDays()` / `trMonths()` — never
   hard-code translated month names inside datasets.
5. Re-run the English-mode route scan after any content edit to confirm no leakage.

---

## 🤝 Contributing

1. **Branch** from the current working branch with a scoped name:
   ```bash
   git checkout -b feat/doctor-directory-clinic-filter
   ```
2. **Stay inside the requested scope.** A ticket naming one file or one section means just
   that; only a ticket that explicitly says "whole page" or "site-wide" licenses broader edits.
3. **Treat specifications as requirements.** Literal Tailwind class strings and numbered
   rules in a brief are not suggestions. "Show me other designs" means a new treatment of
   the *same* copy — do not invent new text.
4. **Light theme only.** Dark surfaces are out of scope for this product and will be rejected.
5. **Quality gate before pushing:**
   ```bash
   npx tsc --noEmit -p tsconfig.json   # must be silent
   npm run dev                          # exercise the affected routes in the browser
   ```
6. **Commit convention** — short imperative subject, one concern per commit, conventional prefix:
   ```text
   feat(i18n): make ICU/HDU capacity bilingual
   fix(bmi): reject decimal point input instead of converting it
   ```
7. **Pull request** must list the affected routes, show before/after screenshots, paste the
   type-check result, and name any dataset whose English overlay was touched.

### Conventions & house rules

- Component files are `PascalCase.tsx`; helper modules are `camelCase.ts`.
- Content belongs in `src/data/*.json`; do not hard-code copy inside components.
- Reuse `localize()` / `tp()` / `tpObj()` rather than writing per-page language branches.
- Never commit `.env.local`, secrets, or `.next` build artifacts.
- Do not run `next build` alongside `next dev` (see the warning in *Getting Started*).

---

## 📝 License

Proprietary and confidential. Copyright © 2026 **Medistra Horizon Hospital Medan**. All
rights reserved.

Source code, branding, photography, and medical content in this repository may not be
copied, modified, redistributed, or deployed without prior written permission from hospital
management. Third-party assets remain under their own terms: lucide-react (ISC),
Framer Motion (MIT), Tailwind CSS (MIT), Next.js and React (MIT), and the inlined WhatsApp
mark from Simple Icons (CC0).

---

## 🙏 Acknowledgements

Built with the Next.js App Router, Tailwind CSS, and Framer Motion. Health-news content is
sourced from the public [World Health Organization](https://www.who.int) feed. Feedback
delivery is handled by [Formspree](https://formspree.io).
