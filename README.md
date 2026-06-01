# Shaku Maku

Fresh local hummus, dips & lebneh in Arizona — built with Next.js 14.

## Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** (custom brand color system)
- **Framer Motion** (carousel, modals, drawer, toast)
- **React Context** (cart state)

## Features

**Customer site**
- Home page with auto-rotating hummus carousel
- Shop with category / badge filtering
- Product detail modal with related products
- Cart drawer with smooth spring animations
- Checkout (market pickup or flat-$9 local delivery)
- Farmers Markets, Wholesale, Bulk Orders, About, Contact pages

**UX**
- Zero tap-highlight flash — `-webkit-tap-highlight-color: transparent` globally
- Active-state press feel on all buttons (`active:scale-95`)
- Focus ring only on keyboard navigation (`focus-visible`)
- Smooth spring-based cart & modal animations

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploying

Push to GitHub — Vercel picks it up automatically.

## Notes

This is a prototype. Payment (Stripe / Shopify), admin login, and email confirmations are stubbed and ready to wire up.
