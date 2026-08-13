# Anemone Purchase Requests

A **Purchase Requests** (Purchase Order) application built with **Nuxt 4**, **Vue 3**, **TypeScript**, and **@nuxt/ui**. Cabang (branch) users browse the HO product catalog, build an order cart, and submit a purchase order.

## Tech Stack

- [Nuxt 4](https://nuxt.com) — framework
- [Vue 3](https://vuejs.org) — UI library
- [TypeScript](https://www.typescriptlang.org) — typed language
- [@nuxt/ui v4](https://ui.nuxt.com) — component library (Tailwind CSS v4)
- [Tailwind CSS v4](https://tailwindcss.com) — styling

## Project Structure

```
app/
  assets/css/main.css        # Tailwind + Nuxt UI entry
  components/
    ui/                      # reusable primitives (AppHeader, QuantityStepper)
    order/                   # order feature components (ProductCard, CartSummary, ...)
  composables/useCart.ts     # cart state, stock clamping, totals
  data/                      # mock products & order metadata
  layouts/default.vue        # shared header + container
  pages/                     # index, order, order-history
  types/order.ts             # Product, CartItem, PaymentMethod types
  utils/format.ts            # currency formatting
```

## Requirements

- [Node.js](https://nodejs.org) 18.20+ / 20.10+ / 22+
- npm, pnpm, yarn, or bun

## Setup

Install dependencies:

```bash
npm install
```

## Development Server

Start the dev server on `http://localhost:3000`:

```bash
npm run dev
```

Pages:

| Route            | Description                          |
| ---------------- | ------------------------------------ |
| `/`              | Landing page (Beranda)               |
| `/order`         | Purchase order form (catalog + cart) |
| `/order-history` | Order history (placeholder)          |

## Production

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Notes

- Mock data lives in `app/data/` — replace with real API calls when a backend is available.
- The primary/brand color is **pink**, configured in `app/app.config.ts`.
