import Link from 'next/link';
import { CuttingBoard } from '@/components/products/CuttingBoard';

export default function ShopPage() {
  return (
    <section className="py-14 px-5 bg-ink">
      <div className="max-w-[1200px] mx-auto">

        {/* Header */}
        <div className="text-center max-w-[600px] mx-auto mb-10">
          <div className="text-[12.5px] font-bold tracking-widest uppercase text-gold mb-3">
            Made Fresh Weekly
          </div>
          <h1 className="font-serif text-[clamp(34px,5vw,52px)] font-semibold text-cream">The Shop</h1>
          <p className="text-cream/70 mt-3 text-[17px] leading-relaxed">
            Hover any item and click to add it to your order.{' '}
            Pickup at a market or delivered to your door.
          </p>
        </div>

        {/* Cutting board */}
        <CuttingBoard />

        {/* Footer note */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8 text-sm text-cream/60">
          <span>Order cutoff: <strong className="text-cream">Sunday at 9&nbsp;PM</strong></span>
          <span className="opacity-30">·</span>
          <span>Made fresh the following week</span>
          <span className="opacity-30">·</span>
          <Link href="/checkout" className="text-terracotta font-semibold hover:text-terra-dk transition-colors">
            Go to Checkout →
          </Link>
        </div>

      </div>
    </section>
  );
}
