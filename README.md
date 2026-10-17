# HESHAURA

Made of Love. Made by Heena.

Source backup of the HESHAURA jewellery storefront, exported from the working Sites project. This repository contains the white/champagne cinematic theme, founder campaign photos, handmade-bracelet feature, product-photo zoom, India-focused SEO content and owner administration.

## Stack

- Vinext, React and TypeScript
- Cloudflare Workers runtime, D1 database and R2 storage
- Drizzle schema migrations in `drizzle/`

## Setup

Use Node.js >=22.13.0 and pnpm 11.25.0. Install with `pnpm install --frozen-lockfile`. The existing platform tooling and local runtime are explained in [README-PLATFORM.md](README-PLATFORM.md). Run `pnpm build` after configuring the execution profile. The production application needs D1 binding `DB` and R2 binding `BUCKET`; database migrations are schema-only and must be applied through the deployment workflow.

## Current status

- Visible hero/headline/scroll animations and an admin-editable glowing scrolling line. Ticker text, speed and visibility are controlled independently of the popup at `/admin/announcements`; visitors can pause motion.

- Signature homepage design: editorial hero, curved collection cards and an interactive For Her / For Him / Together style section.

- Products and variants, inventory, owner administration and test orders are implemented.
- 32 clearly labelled demo products include two bracelet demos. Replace sample photos, prices, materials and stock before selling.
- Announcement settings are at `/admin/announcements`; the popup message does not apply a checkout discount.
- Product photos support an enlarged viewer with 1×–4× zoom and pointer gestures. Browser/device gesture testing remains pending.
- India-focused SEO is configured in `site-content/seo-keywords.json`. The public preview remains `noindex` until launch.
- WhatsApp customer login is a placeholder until the provider is connected. Demo customer state is browser-local and grants no server privileges.
- Live payment checkout is disabled. Razorpay test-payment code is separate and requires test credentials. External webhook delivery and end-to-end gateway verification remain pending.
- Shiprocket has a read-only delivery estimate integration; authentication verification remains unresolved. No live shipment booking is enabled.

## Hosting and authentication

Pushing this repository does not deploy or move the existing live preview. The storefront preview is publicly viewable without a ChatGPT or Google login; owner administration still requires authenticated access. The source currently uses Sites-managed sign-in and trusted `oai-authenticated-user-*` identity headers. A standalone Cloudflare deployment requires a real authentication layer and header validation before exposing admin routes. Never trust visitor-supplied identity headers. The `.openai/hosting.json` file records the existing Sites identity and bindings; do not create a second project accidentally.

## Secrets and data

Real API secrets, the encryption master key, provider credentials, runtime databases, customer records, saved orders and uploaded R2 objects are not exported here. Product demo definitions and public campaign assets are included. Configure secrets through the hosting provider's secure settings; never commit `.env` files or passwords. Stored integration credentials are encrypted in the live database and require the original master key. Do not regenerate that key for an existing database.

## Validation

The application build, TypeScript check and relevant tests passed in the source workspace. Tests under `tests/` cover product access, checkout quotes, integration protection, demo imports, announcements, SEO and zoom calculations. Some integration tests reference the workspace's installed Miniflare package path; adapt that path for another installation. Browser visual and mobile gesture checks are still required.

Source snapshot: `b94fddae061ccce95b2621be289a137c1a4afcc3`.
