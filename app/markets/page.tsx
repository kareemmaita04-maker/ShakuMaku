import Link from 'next/link';
import { MARKETS } from '@/lib/data';
import { fmtDate, fmtCutoff, isClosed } from '@/lib/utils';

export default function MarketsPage() {
  return (
    <section className="py-14 px-5">
      <div className="max-w-[1180px] mx-auto">
        <div className="text-center max-w-[680px] mx-auto mb-10">
          <div className="text-[13px] font-bold tracking-widest uppercase text-gold-dk mb-3">Pickup Locations</div>
          <h1 className="font-serif text-[clamp(34px,5vw,52px)] font-semibold">Farmers Markets</h1>
          <p className="text-ink-soft mt-3.5 text-[17px]">Preorder online and pick up your fresh order at any of these Arizona markets — free of charge. Reserve before each market&apos;s cutoff time.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MARKETS.filter((m) => !m.hidden).map((m) => {
            const closed = isClosed(m.cutoff) || !m.pickupOn;
            return (
              <div key={m.id} className="bg-paper border border-line rounded-[18px] overflow-hidden">
                <div className="p-6 border-b border-dashed border-line">
                  <h3 className="font-serif text-[22px] font-semibold">{m.name}</h3>
                  <div className="flex flex-col gap-2 mt-3 text-sm text-ink-soft">
                    <div className="flex gap-2.5 items-start">
                      <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-terracotta" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
                      </svg>
                      <span>{m.day}, {fmtDate(m.date)}</span>
                    </div>
                    <div className="flex gap-2.5 items-start">
                      <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-terracotta" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
                      </svg>
                      <span>{m.time}</span>
                    </div>
                    <div className="flex gap-2.5 items-start">
                      <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-terracotta" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 21s-7-6.3-7-11a7 7 0 0 1 14 0c0 4.7-7 11-7 11Z" /><circle cx="12" cy="10" r="2.5" />
                      </svg>
                      <span>{m.address}</span>
                    </div>
                  </div>
                </div>
                <div className="p-6 flex flex-col gap-3">
                  <div className={`text-[12.5px] rounded-xl px-3 py-2 font-medium ${
                    closed
                      ? 'bg-spicy/10 text-spicy font-semibold'
                      : 'bg-cream-2 text-ink-soft'
                  }`}>
                    {closed
                      ? m.pickupOn ? 'Order cutoff has passed for this date' : 'Pickup unavailable'
                      : `Pickup available · cutoff ${fmtCutoff(m.cutoff)}`}
                  </div>
                  {closed ? (
                    <button
                      disabled
                      className="w-full py-3 rounded-full border border-line text-ink-soft font-semibold text-sm opacity-50 cursor-not-allowed select-none"
                    >
                      Closed for This Week
                    </button>
                  ) : (
                    <Link
                      href="/shop"
                      className="block w-full py-3 rounded-full bg-terracotta text-white font-semibold text-sm text-center hover:bg-terra-dk active:scale-[.98] transition-all duration-150 select-none"
                    >
                      Preorder for Pickup
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
