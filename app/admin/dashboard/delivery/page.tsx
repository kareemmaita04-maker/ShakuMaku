import { DELIVERY_DATES, SETTINGS } from '@/lib/data';

const now = new Date();

function CutoffBadge({ cutoff }: { cutoff: string }) {
  const date = new Date(cutoff);
  const passed = date < now;
  const diffMs = date.getTime() - now.getTime();
  const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHrs / 24);

  if (passed) return <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-[#F4F4F5] text-ink-soft">Closed</span>;
  if (diffHrs < 24) return <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-red-50 text-red-600">Closes in {diffHrs}h</span>;
  return <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-green-50 text-green-700">Open · {diffDays}d {diffHrs % 24}h left</span>;
}

export default function DeliveryPage() {
  const openCount = DELIVERY_DATES.filter((d) => new Date(d.cutoff) > now).length;
  const zones = SETTINGS.deliveryZips.split(',').map((z) => z.trim());

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-serif text-[30px] font-semibold text-ink">Delivery</h1>
        <p className="text-ink-soft mt-1">Manage your delivery dates, cutoffs, and zone settings.</p>
      </div>

      {/* Settings row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-2xl border border-[#E4E4E7] p-5 shadow-sm">
          <div className="text-2xl mb-2">💵</div>
          <div className="font-serif text-[34px] font-bold text-green-600 leading-none">${SETTINGS.deliveryFee}</div>
          <div className="text-sm font-semibold text-ink mt-1">Flat Delivery Fee</div>
          <div className="text-xs text-ink-soft mt-0.5">Charged at checkout</div>
        </div>
        <div className="bg-white rounded-2xl border border-[#E4E4E7] p-5 shadow-sm">
          <div className="text-2xl mb-2">📅</div>
          <div className="font-serif text-[34px] font-bold text-blue-600 leading-none">{SETTINGS.deliveryDays}</div>
          <div className="text-sm font-semibold text-ink mt-1">Delivery Days</div>
          <div className="text-xs text-ink-soft mt-0.5">Fresh each week</div>
        </div>
        <div className="bg-white rounded-2xl border border-[#E4E4E7] p-5 shadow-sm">
          <div className="text-2xl mb-2">🗺️</div>
          <div className="font-serif text-[34px] font-bold text-amber-600 leading-none">{zones.length}</div>
          <div className="text-sm font-semibold text-ink mt-1">Delivery Zip Codes</div>
          <div className="text-xs text-ink-soft mt-0.5">Phoenix area zones</div>
        </div>
      </div>

      {/* Delivery dates */}
      <h2 className="text-[13px] font-bold uppercase tracking-widest text-ink-soft mb-3">Upcoming Delivery Dates</h2>
      <div className="space-y-3 mb-8">
        {DELIVERY_DATES.map((d) => {
          const deliveryDate = new Date(d.date);
          const cutoffDate = new Date(d.cutoff);
          const passed = cutoffDate < now;

          return (
            <div key={d.id} className={`bg-white rounded-2xl border border-[#E4E4E7] shadow-sm p-5 flex flex-col sm:flex-row sm:items-center gap-4 ${passed ? 'opacity-60' : ''}`}>
              <div className="flex items-center gap-4 flex-1">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 ${passed ? 'bg-[#F4F4F5]' : 'bg-blue-50'}`}>
                  🚚
                </div>
                <div>
                  <div className="font-semibold text-ink text-[15px]">{d.label}</div>
                  <div className="text-xs text-ink-soft mt-0.5">
                    Delivery date: {deliveryDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>
              </div>
              <div className="sm:text-right">
                <CutoffBadge cutoff={d.cutoff} />
                <div className="text-xs text-ink-soft mt-1.5">
                  Order cutoff: {cutoffDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} at{' '}
                  {cutoffDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Zip zones */}
      <h2 className="text-[13px] font-bold uppercase tracking-widest text-ink-soft mb-3">Delivery Zone — Zip Codes</h2>
      <div className="bg-white rounded-2xl border border-[#E4E4E7] shadow-sm p-6">
        <p className="text-sm text-ink-soft mb-4">Orders are accepted from customers within these Phoenix-area zip codes.</p>
        <div className="flex flex-wrap gap-2">
          {zones.map((zip) => (
            <span key={zip} className="text-sm font-semibold bg-[#F4F4F5] text-ink px-4 py-2 rounded-xl">
              {zip}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
