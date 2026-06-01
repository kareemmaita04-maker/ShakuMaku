import { MARKETS } from '@/lib/data';

const now = new Date();

function StatusBadge({ market }: { market: typeof MARKETS[number] }) {
  const cutoff = new Date(market.cutoff);
  const marketDate = new Date(market.date);
  const passed = cutoff < now;
  const marketPassed = marketDate < now;

  if (marketPassed) return <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-[#F4F4F5] text-ink-soft">Past</span>;
  if (!market.pickupOn) return <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-[#F4F4F5] text-ink-soft">Pickup Off</span>;
  if (passed) return <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-orange-50 text-orange-600">Cutoff Passed</span>;

  const diffMs = cutoff.getTime() - now.getTime();
  const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHrs / 24);
  const timeLeft = diffDays > 0 ? `${diffDays}d ${diffHrs % 24}h left` : `${diffHrs}h left`;

  return <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-green-50 text-green-700">Open · {timeLeft}</span>;
}

export default function MarketsPage() {
  const active = MARKETS.filter((m) => !m.hidden && m.pickupOn && new Date(m.cutoff) > now);
  const upcoming = MARKETS.filter((m) => !m.hidden && new Date(m.date) >= now);
  const past = MARKETS.filter((m) => new Date(m.date) < now);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-serif text-[30px] font-semibold text-ink">Market Pickup</h1>
        <p className="text-ink-soft mt-1">Overview of all farmers market locations and pickup availability.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-2xl border border-[#E4E4E7] p-5 shadow-sm text-center">
          <div className="font-serif text-[34px] font-bold text-green-600 leading-none">{active.length}</div>
          <div className="text-sm font-semibold text-ink mt-1">Pickup Open</div>
        </div>
        <div className="bg-white rounded-2xl border border-[#E4E4E7] p-5 shadow-sm text-center">
          <div className="font-serif text-[34px] font-bold text-amber-600 leading-none">{upcoming.length}</div>
          <div className="text-sm font-semibold text-ink mt-1">Upcoming Markets</div>
        </div>
        <div className="bg-white rounded-2xl border border-[#E4E4E7] p-5 shadow-sm text-center">
          <div className="font-serif text-[34px] font-bold text-ink-soft leading-none">{past.length}</div>
          <div className="text-sm font-semibold text-ink mt-1">Past Markets</div>
        </div>
      </div>

      {/* Market cards */}
      <h2 className="text-[13px] font-bold uppercase tracking-widest text-ink-soft mb-3">All Markets</h2>
      <div className="space-y-4">
        {MARKETS.map((m) => {
          const cutoffDate = new Date(m.cutoff);
          const marketDate = new Date(m.date);
          const isPast = marketDate < now;

          return (
            <div key={m.id} className={`bg-white rounded-2xl border border-[#E4E4E7] shadow-sm overflow-hidden ${isPast ? 'opacity-55' : ''}`}>
              <div className="flex flex-col sm:flex-row">
                {/* Color bar */}
                <div className={`sm:w-2 w-full h-2 sm:h-auto shrink-0 rounded-l-2xl ${
                  isPast ? 'bg-[#E4E4E7]' : m.pickupOn ? 'bg-green-400' : 'bg-amber-300'
                }`} />

                <div className="flex-1 p-5">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-3 justify-between">
                    <div className="flex items-start gap-4">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0 ${isPast ? 'bg-[#F4F4F5]' : 'bg-amber-50'}`}>
                        📍
                      </div>
                      <div>
                        <div className="font-semibold text-ink text-[15px]">{m.name}</div>
                        <div className="text-xs text-ink-soft mt-0.5">{m.address}</div>
                        <div className="flex flex-wrap gap-3 mt-2 text-xs text-ink-soft">
                          <span>📅 {m.day}, {new Date(m.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                          <span>🕐 {m.time}</span>
                        </div>
                      </div>
                    </div>
                    <div className="sm:text-right shrink-0">
                      <StatusBadge market={m} />
                      <div className="text-xs text-ink-soft mt-1.5">
                        Cutoff: {cutoffDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} at{' '}
                        {cutoffDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>

                  {/* Map link */}
                  <div className="mt-3 pt-3 border-t border-[#F0F0F1]">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(m.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold hover:text-gold-dk transition-colors"
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                      Open in Google Maps
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
