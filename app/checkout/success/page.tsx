'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { getProd } from '@/lib/data';
import { money, fmtDate } from '@/lib/utils';

interface PendingOrder {
  id: string;
  name: string;
  email: string;
  phone: string;
  items: { id: string; qty: number }[];
  fulfill: 'pickup' | 'delivery';
  marketId: string;
  marketName?: string;
  date: string;
  addr: string;
  fee: number;
  total: number;
  notes: string;
  status: string;
  placed: string;
}

function SuccessContent() {
  const params = useSearchParams();
  const orderId = params.get('order_id') ?? '';
  const [order, setOrder] = useState<PendingOrder | null>(null);

  useEffect(() => {
    if (!orderId) return;

    // Read order saved before Stripe redirect
    try {
      const raw = sessionStorage.getItem('sm_pending_order');
      if (raw) {
        const o: PendingOrder = JSON.parse(raw);
        if (o.id === orderId) {
          setOrder(o);
          // POST to orders API once, then clear so a re-render won't re-post
          fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(o),
          }).finally(() => {
            sessionStorage.removeItem('sm_pending_order');
          });
        }
      }
    } catch {
      // sessionStorage unavailable; order will be handled server-side via webhook
    }
  }, [orderId]);

  if (!orderId) {
    return (
      <section className="py-14 px-5">
        <div className="max-w-[560px] mx-auto text-center bg-paper border border-line rounded-3xl p-12 shadow-card">
          <h2 className="font-serif text-2xl font-semibold">Nothing to show</h2>
          <p className="text-ink-soft mt-2 mb-6">No order ID found.</p>
          <Link href="/shop" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-terracotta text-white font-semibold hover:bg-terra-dk active:scale-95 transition-all duration-150 select-none">
            Browse the Shop
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-14 px-5">
      <div className="max-w-[560px] mx-auto">
        <div className="text-center bg-paper border border-line rounded-3xl p-10 shadow-card">
          <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-5 text-4xl">✓</div>
          <h2 className="font-serif text-[30px] font-semibold">Payment Confirmed!</h2>
          {order ? (
            <p className="text-ink-soft mt-2 mb-1 text-[16px]">
              Thanks <strong className="text-ink">{order.name.split(' ')[0]}</strong>! Your order <strong className="text-ink">{orderId}</strong> is paid and being prepared.
            </p>
          ) : (
            <p className="text-ink-soft mt-2 mb-1 text-[16px]">
              Order <strong className="text-ink">{orderId}</strong> is paid and confirmed.
            </p>
          )}
          <p className="text-ink-soft text-[14px] mb-6">A receipt was sent to your email by Stripe.</p>

          {order && (
            <div className="text-left bg-cream-2 rounded-2xl p-5 space-y-2 mb-6 text-sm">
              {order.items.map((i) => {
                const p = getProd(i.id);
                return (
                  <div key={i.id} className="flex justify-between">
                    <span>{i.qty} × {p.name}</span>
                    <span>{money(p.price * i.qty)}</span>
                  </div>
                );
              })}
              <div className="flex justify-between pt-2 border-t border-line">
                <span>{order.fulfill === 'pickup' ? 'Pickup' : 'Delivery'}</span>
                <span>{order.fee ? money(order.fee) : 'Free'}</span>
              </div>
              <div className="flex justify-between font-bold text-base">
                <span>Total</span>
                <span>{money(order.total)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-line text-ink-soft">
                <span>{order.fulfill === 'pickup' ? 'Pickup at' : 'Deliver to'}</span>
                <span className="text-right max-w-[55%]">
                  {order.fulfill === 'pickup' ? order.marketName : order.addr}
                  {' · '}
                  {fmtDate(order.date)}
                </span>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-terracotta text-white font-semibold hover:bg-terra-dk active:scale-95 transition-all duration-150 select-none"
            >
              Continue Shopping
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border-[1.5px] border-ink text-ink font-semibold hover:bg-ink hover:text-cream active:scale-95 transition-all duration-150 select-none"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="py-14 text-center text-ink-soft">Loading…</div>}>
      <SuccessContent />
    </Suspense>
  );
}
