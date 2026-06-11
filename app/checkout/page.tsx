'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/cart';
import { getProd, getMarket, MARKETS, DELIVERY_DATES, SETTINGS } from '@/lib/data';
import { money, fmtDate, isClosed } from '@/lib/utils';

type Fulfill = 'pickup' | 'delivery';

interface Confirmed {
  id: string;
  name: string;
  email: string;
  items: { id: string; qty: number }[];
  fulfill: Fulfill;
  marketName?: string;
  addr?: string;
  date: string;
  fee: number;
  total: number;
}

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [fulfill, setFulfill] = useState<Fulfill>('pickup');
  const [marketId, setMarketId] = useState('');
  const [delivDateId, setDelivDateId] = useState('');
  const [confirmed, setConfirmed] = useState<Confirmed | null>(null);
  const [placing, setPlacing] = useState(false);

  const fee = fulfill === 'delivery' ? SETTINGS.deliveryFee : 0;
  const total = subtotal + fee;

  const stripeEnabled = process.env.NEXT_PUBLIC_STRIPE_ENABLED === 'true';

  async function placeOrder(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = (fd.get('name') as string).trim();
    const email = (fd.get('email') as string).trim();
    const phone = (fd.get('phone') as string).trim();
    const notes = (fd.get('notes') as string || '').trim();

    if (fulfill === 'pickup' && !marketId) { alert('Please choose a market for pickup.'); return; }
    if (fulfill === 'delivery' && !delivDateId) { alert('Please choose a delivery date.'); return; }

    setPlacing(true);

    const id = `SM-${Date.now().toString(36).toUpperCase()}`;
    let date = '';
    let marketName: string | undefined;
    let addr = '';

    if (fulfill === 'pickup') {
      const m = getMarket(marketId)!;
      date = m.date;
      marketName = m.name;
    } else {
      const d = DELIVERY_DATES.find((x) => x.id === delivDateId)!;
      date = d.date;
      addr = `${(fd.get('addr') as string)}, ${fd.get('city')}, AZ ${fd.get('zip')}`;
    }

    const order = {
      id,
      name,
      email,
      phone,
      items: items.map((i) => ({ id: i.productId, qty: i.qty })),
      fulfill,
      marketId: marketId || '',
      date,
      addr,
      fee,
      notes,
      status: 'pending',
      placed: new Date().toISOString(),
    };

    // Always save the order first
    try {
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      });
    } catch { /* non-fatal */ }

    // Stripe path
    if (stripeEnabled) {
      try {
        const stripeItems = items.map((i) => {
          const p = getProd(i.productId);
          return { name: p.name, price: p.price, qty: i.qty };
        });
        const res = await fetch('/api/stripe/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderId: id,
            items: stripeItems,
            fee,
            customerEmail: email,
            successPath: `/checkout/success?order_id=${id}`,
            cancelPath: '/checkout',
          }),
        });
        const data = await res.json();
        if (data.url) {
          clearCart();
          window.location.href = data.url;
          return;
        }
      } catch { /* fall through to preorder */ }
    }

    // Preorder fallback (Stripe not enabled or failed)
    setConfirmed({ id, name, email, items: order.items, fulfill, marketName, addr: addr || undefined, date, fee, total });
    clearCart();
    setPlacing(false);
  }

  if (confirmed) {
    return (
      <section className="py-14 px-5">
        <div className="max-w-[560px] mx-auto text-center bg-paper border border-line rounded-3xl p-12 shadow-card">
          <div className="w-20 h-20 rounded-full bg-olive/12 flex items-center justify-center mx-auto mb-5 text-4xl">✓</div>
          <h2 className="font-serif text-[28px] font-semibold">Order Confirmed!</h2>
          <p className="text-ink-soft mt-2 mb-6 text-[15px]">
            Thanks {confirmed.name.split(' ')[0]}! Your preorder <strong>{confirmed.id}</strong> is in. We&apos;ll make it fresh and send a confirmation to <strong>{confirmed.email}</strong>.
          </p>
          <div className="text-left bg-cream-2 rounded-2xl p-5 space-y-2 mb-6 text-sm">
            {confirmed.items.map((i) => {
              const p = getProd(i.id);
              return (
                <div key={i.id} className="flex justify-between">
                  <span>{i.qty} × {p.name}</span>
                  <span>{money(p.price * i.qty)}</span>
                </div>
              );
            })}
            <div className="flex justify-between pt-2 border-t border-line">
              <span>{confirmed.fulfill === 'pickup' ? 'Pickup' : 'Delivery'}</span>
              <span>{confirmed.fee ? money(confirmed.fee) : 'Free'}</span>
            </div>
            <div className="flex justify-between font-bold text-base">
              <span>Total</span>
              <span>{money(confirmed.total)}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-line text-ink-soft">
              <span>{confirmed.fulfill === 'pickup' ? 'Pickup at' : 'Deliver to'}</span>
              <span className="text-right max-w-[55%]">{confirmed.fulfill === 'pickup' ? confirmed.marketName : confirmed.addr} · {fmtDate(confirmed.date)}</span>
            </div>
          </div>
          <Link href="/shop" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-terracotta text-white font-semibold hover:bg-terra-dk active:scale-95 transition-all duration-150 select-none">
            Continue Shopping
          </Link>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="py-14 px-5">
        <div className="max-w-[560px] mx-auto text-center bg-paper border border-line rounded-3xl p-12 shadow-card">
          <div className="text-5xl mb-4">🫙</div>
          <h2 className="font-serif text-2xl font-semibold">Your order is empty</h2>
          <p className="text-ink-soft mt-2 mb-6">Add some fresh dips before checking out.</p>
          <Link href="/shop" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-terracotta text-white font-semibold hover:bg-terra-dk active:scale-95 transition-all duration-150 select-none">
            Browse the Shop
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-14 px-5">
      <div className="max-w-[1180px] mx-auto">
        <div className="text-center mb-8">
          <div className="text-[13px] font-bold tracking-widest uppercase text-gold-dk mb-2">Almost There</div>
          <h1 className="font-serif text-[clamp(34px,5vw,52px)] font-semibold">Checkout</h1>
        </div>

        <form onSubmit={placeOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_.85fr] gap-8 items-start">
            {/* Left — steps */}
            <div className="space-y-5">
              {/* Step 1 — Fulfillment */}
              <div className="bg-paper border border-line rounded-[20px] p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 rounded-full bg-terracotta text-white flex items-center justify-center font-bold text-sm flex-shrink-0">1</div>
                  <h3 className="font-serif text-xl font-semibold">How would you like to get it?</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {([['pickup', '📍', 'Market Pickup', 'Free · grab it at a market'], ['delivery', '🚙', 'Local Delivery', `Flat $${SETTINGS.deliveryFee} · to your door`]] as const).map(([val, icon, title, desc]) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setFulfill(val)}
                      className={`border-2 rounded-2xl p-4 text-center transition-all duration-150 active:scale-[.98] select-none ${fulfill === val ? 'border-terracotta bg-terracotta/5' : 'border-line hover:border-terracotta/50'}`}
                    >
                      <div className="text-3xl mb-2">{icon}</div>
                      <div className="font-bold text-[16px]">{title}</div>
                      <p className="text-sm text-ink-soft mt-0.5">{desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2 — Market or delivery details */}
              <div className="bg-paper border border-line rounded-[20px] p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 rounded-full bg-terracotta text-white flex items-center justify-center font-bold text-sm flex-shrink-0">2</div>
                  <h3 className="font-serif text-xl font-semibold">
                    {fulfill === 'pickup' ? 'Choose your market & date' : 'Delivery details'}
                  </h3>
                </div>

                {fulfill === 'pickup' ? (
                  <div className="space-y-2">
                    {MARKETS.filter((m) => !m.hidden && m.pickupOn).map((m) => {
                      const closed = isClosed(m.cutoff);
                      return (
                        <button
                          key={m.id}
                          type="button"
                          disabled={closed}
                          onClick={() => !closed && setMarketId(m.id)}
                          className={`w-full flex gap-3 items-center border-[1.5px] rounded-xl p-4 text-left transition-all duration-150 select-none ${
                            marketId === m.id ? 'border-terracotta bg-terracotta/5' : 'border-line hover:border-terracotta/40'
                          } ${closed ? 'opacity-50 cursor-not-allowed' : 'active:scale-[.99]'}`}
                        >
                          <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 relative ${marketId === m.id ? 'border-terracotta' : 'border-line'}`}>
                            {marketId === m.id && <div className="absolute inset-[3px] rounded-full bg-terracotta" />}
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-sm">{m.name}</div>
                            <div className="text-xs text-ink-soft mt-0.5">{m.day}, {fmtDate(m.date)} · {m.time}</div>
                            <div className={`text-[11px] mt-0.5 ${closed ? 'text-spicy' : 'text-ink-soft'}`}>
                              {closed ? 'Cutoff passed — unavailable' : `Cutoff: ${new Date(m.cutoff).toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}`}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-cream-2 rounded-xl px-4 py-3 text-[12.5px] text-ink-soft">
                      Order by <strong>Sunday 9 PM</strong> for delivery on your chosen Friday, Saturday, or Sunday. Available in select Phoenix-area ZIPs: {SETTINGS.deliveryZips}.
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="sm:col-span-2">
                        <label className="block text-[13px] font-semibold text-ink-soft mb-1.5">Street address *</label>
                        <input name="addr" required placeholder="123 Main St" className="w-full px-3.5 py-3 rounded-xl border-[1.5px] border-line bg-cream text-ink text-sm focus:border-terracotta focus:ring-2 focus:ring-terracotta/10 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-[13px] font-semibold text-ink-soft mb-1.5">City *</label>
                        <input name="city" required placeholder="Phoenix" className="w-full px-3.5 py-3 rounded-xl border-[1.5px] border-line bg-cream text-ink text-sm focus:border-terracotta focus:ring-2 focus:ring-terracotta/10 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-[13px] font-semibold text-ink-soft mb-1.5">ZIP code *</label>
                        <input name="zip" required placeholder="85016" className="w-full px-3.5 py-3 rounded-xl border-[1.5px] border-line bg-cream text-ink text-sm focus:border-terracotta focus:ring-2 focus:ring-terracotta/10 outline-none transition-all" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[13px] font-semibold text-ink-soft mb-2">Delivery date *</label>
                      <div className="flex flex-wrap gap-2">
                        {DELIVERY_DATES.map((d) => {
                          const closed = isClosed(d.cutoff);
                          return (
                            <button
                              key={d.id}
                              type="button"
                              disabled={closed}
                              onClick={() => !closed && setDelivDateId(d.id)}
                              className={`px-4 py-2.5 rounded-full border-[1.5px] text-sm font-semibold transition-all duration-150 select-none ${
                                delivDateId === d.id ? 'bg-terracotta border-terracotta text-white' : 'bg-paper border-line text-ink-soft hover:border-terracotta'
                              } ${closed ? 'opacity-40 cursor-not-allowed' : 'active:scale-95'}`}
                            >
                              {d.label}{closed ? ' (closed)' : ''}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Step 3 — Your details */}
              <div className="bg-paper border border-line rounded-[20px] p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 rounded-full bg-terracotta text-white flex items-center justify-center font-bold text-sm flex-shrink-0">3</div>
                  <h3 className="font-serif text-xl font-semibold">Your details</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[13px] font-semibold text-ink-soft mb-1.5">Full name *</label>
                    <input name="name" required className="w-full px-3.5 py-3 rounded-xl border-[1.5px] border-line bg-cream text-ink text-sm focus:border-terracotta focus:ring-2 focus:ring-terracotta/10 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-[13px] font-semibold text-ink-soft mb-1.5">Email *</label>
                    <input name="email" type="email" required className="w-full px-3.5 py-3 rounded-xl border-[1.5px] border-line bg-cream text-ink text-sm focus:border-terracotta focus:ring-2 focus:ring-terracotta/10 outline-none transition-all" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[13px] font-semibold text-ink-soft mb-1.5">Phone number *</label>
                    <input name="phone" required className="w-full px-3.5 py-3 rounded-xl border-[1.5px] border-line bg-cream text-ink text-sm focus:border-terracotta focus:ring-2 focus:ring-terracotta/10 outline-none transition-all" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[13px] font-semibold text-ink-soft mb-1.5">Order notes (optional)</label>
                    <textarea name="notes" rows={2} placeholder="Allergies, pickup time, gate code…" className="w-full px-3.5 py-3 rounded-xl border-[1.5px] border-line bg-cream text-ink text-sm focus:border-terracotta focus:ring-2 focus:ring-terracotta/10 outline-none transition-all resize-none" />
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className="bg-paper border border-line rounded-[20px] p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-terracotta text-white flex items-center justify-center font-bold text-sm flex-shrink-0">4</div>
                  <h3 className="font-serif text-xl font-semibold">Payment</h3>
                </div>
                {stripeEnabled ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-ink-soft bg-cream-2 rounded-xl px-4 py-3">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                      Secure payment powered by Stripe. We never see your card details.
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {['Visa', 'MC', 'Amex', 'Apple Pay', 'Google Pay'].map((m) => (
                        <span key={m} className="text-[11px] font-semibold bg-cream-2 text-ink-soft px-2.5 py-1 rounded-lg">{m}</span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-800">
                    <strong>Preorder mode</strong> — Stripe is not yet connected. Orders are confirmed but payment is not collected. Add your Stripe keys in Vercel to enable payments.
                  </div>
                )}
              </div>
            </div>

            {/* Right — summary */}
            <div className="lg:sticky lg:top-24 bg-paper border border-line rounded-[20px] p-6">
              <h3 className="font-serif text-[22px] font-semibold mb-5">Order Summary</h3>
              <div className="space-y-1">
                {items.map((item) => {
                  const p = getProd(item.productId);
                  return (
                    <div key={item.productId} className="flex justify-between text-sm py-1.5 text-ink-soft">
                      <span>{item.qty} × {p.name}</span>
                      <span className="text-ink font-medium">{money(p.price * item.qty)}</span>
                    </div>
                  );
                })}
              </div>
              <div className="border-t border-line mt-3 pt-3 space-y-1.5">
                <div className="flex justify-between text-sm text-ink-soft">
                  <span>Subtotal</span>
                  <span className="text-ink">{money(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-ink-soft">
                  <span>{fulfill === 'delivery' ? 'Delivery fee' : 'Pickup'}</span>
                  <span className="text-ink">{fee ? money(fee) : 'Free'}</span>
                </div>
                <div className="flex justify-between font-serif text-[23px] font-semibold pt-2 border-t border-line mt-2">
                  <span>Total</span>
                  <span>{money(total)}</span>
                </div>
              </div>
              <button
                type="submit"
                disabled={placing}
                className="mt-5 w-full py-3.5 rounded-full bg-terracotta text-white font-semibold hover:bg-terra-dk active:scale-[.98] transition-all duration-150 select-none disabled:opacity-60"
              >
                {placing ? 'Processing…' : stripeEnabled ? '💳 Pay with Stripe' : 'Place Preorder'}
              </button>
              <p className="text-[12px] text-ink-soft text-center mt-3">Weekly cutoff: <strong>Sunday 9 PM</strong> · Made fresh · Fri, Sat, or Sun fulfillment</p>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
