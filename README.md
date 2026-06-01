# Shaku Maku

A self-contained single-page prototype for **Shaku Maku** — a local Arizona food business selling fresh hummus, dips, and lebneh.

## What's inside

`index.html` — the entire app: HTML, CSS, and JavaScript in one file. No build step, no dependencies beyond Google Fonts.

### Customer site
- Home, Shop, Farmers Markets, Wholesale, Bulk Orders, About, Contact pages
- Shopping cart with drawer UI
- Checkout flow (pickup at market or flat-$9 local delivery)
- Product detail modal with related products

### Admin dashboard
- Orders management with status pipeline
- Weekly production list (aggregated from active orders, by market & date)
- Product CRUD (add / edit / hide / delete)
- Farmers market management
- Wholesale lead tracking
- Bulk & catering inquiry tracking
- CSV exports for orders, production, pickups, delivery, leads, and customer emails
- Delivery settings (fee, days, ZIP zones)

## Running it

Open `index.html` in any browser — no server needed.

## Notes

This is a **prototype**. The following are intentionally stubbed:
- **Payment** — placeholder for Stripe or Shopify Checkout
- **Admin login** — accepts any credentials
- **Data** — all in-memory; resets on page refresh
- **Image upload** — drag-and-drop placeholder

## Stack

- Vanilla HTML / CSS / JavaScript
- [Fraunces](https://fonts.google.com/specimen/Fraunces) + [DM Sans](https://fonts.google.com/specimen/DM+Sans) via Google Fonts
- SVG product illustrations generated inline
