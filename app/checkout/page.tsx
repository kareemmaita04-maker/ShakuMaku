'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/cart';
import { getProd, getMarket, MARKETS, SETTINGS } from '@/lib/data';
import { money, fmtDate, isClosed } from '@/lib/utils';

type Fulfill = 'pickup' | 'delivery';

export default function CheckoutPage() {
  const { items, subtotal, clearCart, itemCount } = useCart();
  const [fulfill, setFulfill] = useState<Fulfill>('pickup');
  const [marketId, setMarketId] = useState('');
  const [delivDate, setDelivDate] = useState('');
  const [zipError, setZipError] = useState('');
  const [placing, setPlacing] = useState(false);

  // Dynamically compute upcoming Sat & Sun delivery options
  function getDeliveryOptions() {
    const now = new Date();
    const day = now.getDay();
    const daysToSun = day === 0 ? 7 : 7 - day;
    const cutoff = new Date(now);
    cutoff.setDate(now.getDate() + daysToSun);
    cutoff.setHours(21, 0, 0, 0);
    if (day === 0 && now.getHours() < 21) cutoff.setDate(now.getDate());

    const sat = new Date(cutoff); sat.setDate(cutoff.getDate() + 6);
    const sun = new Date(cutoff); sun.setDate(cutoff.getDate() + 7);

    const fmt = (d: Date) => d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    const iso = (d: Date) => d.toISOString().split('T')[0];

    return {
      cutoffLabel: cutoff.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }) + ' by 9 PM',
      options: [
        { id: iso(sat), label: fmt(sat), short: 'Saturday' },
        { id: iso(sun), label: fmt(sun), short: 'Sunday' },
      ],
    };
  }
  const deliveryWeek = getDeliveryOptions();

  const MIN_ORDER = SETTINGS.minOrder;
  const fee = fulfill === 'delivery' ? SETTINGS.deliveryFee : 0;
  const total = subtotal + fee;

  const stripeEnabled = process.env.NEXT_PUBLIC_STRIPE_ENABLED === 'true';

  async function placeOrder(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setZipError('');
    const fd = new FormData(e.currentTarget);
    const name = (fd.get('name') as string).trim();
    const email = (fd.get('email') as string).trim();
    const phone = (fd.get('phone') as string).trim();
    const notes = (fd.get('notes') as string || '').trim();

    if (itemCount < MIN_ORDER) { alert(`A minimum of ${MIN_ORDER} items is required to check out.`); return; }
    if (fulfill === 'pickup' && !marketId) { alert('Please choose a market for pickup.'); return; }
    if (fulfill === 'delivery' && !delivDate) { alert('Please choose Saturday or Sunday delivery.'); return; }

    // Zip code validation — Maricopa County only
    if (fulfill === 'delivery') {
      const zip = (fd.get('zip') as string).trim();
      if (!SETTINGS.deliveryZips.includes(zip)) {
        setZipError('Sorry — delivery is currently only available in Maricopa County (beta). Your ZIP is outside our delivery zone.');
        return;
      }
    }

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
      date = delivDate;
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
      marketName,
      date,
      addr,
      fee,
      notes,
      total,
      status: 'pending',
      placed: new Date().toISOString(),
    };

    // Save to sessionStorage so success page can read it after Stripe redirect
    try {
      sessionStorage.setItem('sm_pending_order', JSON.stringify(order));
    } catch { /* ignore */ }

    // Redirect to Stripe — payment is required
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
      throw new Error(data.error || 'No checkout URL returned');
    } catch (err) {
      console.error('Stripe error:', err);
      alert('Payment could not be started. Please try again or contact us directly.');
      setPlacing(false);
    }
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

  if (itemCount < MIN_ORDER) {
    return (
      <section className="py-14 px-5">
        <div className="max-w-[560px] mx-auto text-center bg-paper border border-line rounded-3xl p-12 shadow-card">
          <div className="text-5xl mb-4">🛒</div>
          <h2 className="font-serif text-2xl font-semibold">Almost there!</h2>
          <p className="text-ink-soft mt-2 mb-4">
            We have a <strong className="text-ink">3-item minimum</strong> per order — you have{' '}
            <strong className="text-ink">{itemCount}</strong>. Add {MIN_ORDER - itemCount} more to continue.
          </p>
          {/* Progress */}
          <div className="flex gap-2 justify-center mb-6">
            {Array.from({ length: MIN_ORDER }).map((_, i) => (
              <div key={i} className={`w-10 h-2 rounded-full ${i < itemCount ? 'bg-terracotta' : 'bg-cream-3'}`} />
            ))}
          </div>
          <Link href="/shop" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-terracotta text-white font-semibold hover:bg-terra-dk active:scale-95 transition-all duration-150 select-none">
            Add More Items
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
                      onClick={() => { setFulfill(val); setZipError(''); }}
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
                    <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-[12.5px] text-amber-800">
                      <strong>Maricopa County Beta</strong> — Delivery is currently available throughout Maricopa County (Phoenix, Scottsdale, Tempe, Mesa, Gilbert, Chandler, Glendale, and surrounding cities). Order by <strong>Sunday 9 PM</strong> for that week&apos;s delivery.
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
                        <input
                          name="zip"
                          required
                          placeholder="85016"
                          onChange={() => setZipError('')}
                          className={`w-full px-3.5 py-3 rounded-xl border-[1.5px] bg-cream text-ink text-sm focus:ring-2 outline-none transition-all ${zipError ? 'border-spicy focus:border-spicy focus:ring-spicy/10' : 'border-line focus:border-terracotta focus:ring-terracotta/10'}`}
                        />
                        {zipError && (
                          <p className="text-spicy text-[12px] mt-1.5 leading-snug">{zipError}</p>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block text-[13px] font-semibold text-ink-soft mb-2">Choose your delivery day *</label>
                      <p className="text-[12px] text-ink-soft mb-3">
                        Order cutoff: <strong>{deliveryWeek.cutoffLabel}</strong>. Your order ships fresh the following week.
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        {deliveryWeek.options.map((opt) => (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => setDelivDate(opt.id)}
                            className={`border-2 rounded-2xl p-4 text-center transition-all duration-150 active:scale-[.98] select-none ${
                              delivDate === opt.id
                                ? 'border-terracotta bg-terracotta/5'
                                : 'border-line hover:border-terracotta/50'
                            }`}
                          >
                            <div className="text-2xl mb-1">{opt.short === 'Saturday' ? '🚗' : '☀️'}</div>
                            <div className="font-bold text-[15px]">{opt.short}</div>
                            <div className="text-xs text-ink-soft mt-0.5">{opt.label}</div>
                          </button>
                        ))}
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

              {/* Step 4 — Payment */}
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
                  <div className="bg-cream-2 border border-line rounded-xl px-4 py-4 text-sm text-ink-soft text-center space-y-1">
                    <div className="text-2xl mb-2">🔒</div>
                    <p className="font-semibold text-ink">Payment setup in progress</p>
                    <p>Orders require payment before confirmation. Stripe integration is being configured — check back soon!</p>
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
              {stripeEnabled ? (
                <button
                  type="submit"
                  disabled={placing}
                  className="mt-5 w-full py-3.5 rounded-full bg-terracotta text-white font-semibold hover:bg-terra-dk active:scale-[.98] transition-all duration-150 select-none disabled:opacity-60"
                >
                  {placing ? 'Redirecting to payment…' : '💳 Pay with Stripe'}
                </button>
              ) : (
                <button
                  type="button"
                  disabled
                  className="mt-5 w-full py-3.5 rounded-full bg-cream-3 text-ink-soft font-semibold cursor-not-allowed select-none"
                >
                  🔒 Payment Setup in Progress
                </button>
              )}
              <p className="text-[12px] text-ink-soft text-center mt-3">Weekly cutoff: <strong>Sunday 9 PM</strong> · Made fresh · Sat or Sun fulfillment</p>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
