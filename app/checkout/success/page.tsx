'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function SuccessContent() {
  const params = useSearchParams();
  const orderId = params.get('order_id') ?? '';

  return (
    <section className="py-14 px-5">
      <div className="max-w-[560px] mx-auto text-center bg-paper border border-line rounded-3xl p-12 shadow-card">
        <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-5 text-4xl">✓</div>
        <h2 className="font-serif text-[30px] font-semibold">Payment Confirmed!</h2>
        <p className="text-ink-soft mt-3 mb-2 text-[16px]">
          Your order <strong className="text-ink">{orderId}</strong> is paid and confirmed.
        </p>
        <p className="text-ink-soft text-[15px] mb-8">
          We&apos;ll make it fresh and have it ready for your chosen pickup or delivery date.
          A receipt was sent to your email by Stripe.
        </p>
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
