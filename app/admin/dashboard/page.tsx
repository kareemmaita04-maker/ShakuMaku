import Link from 'next/link';
import { PRODUCTS, MARKETS, DELIVERY_DATES, SETTINGS } from '@/lib/data';

const now = new Date();
const activeProducts = PRODUCTS.filter((p) => !p.hidden && !p.badges.includes('Sold Out'));
const activeMarkets = MARKETS.filter((m) => !m.hidden && m.pickupOn);
const openDeliveries = DELIVERY_DATES.filter((d) => new Date(d.cutoff) > now);
const totalRevenue = activeProducts.length * 8;

const quickLinks = [
  { href: '/admin/dashboard/delivery', label: 'Manage Delivery', sub: `${openDeliveries.length} dates open`, color: 'bg-blue-50 border-blue-100', icon: '🚚' },
  { href: '/admin/dashboard/markets', label: 'Market Pickup', sub: `${activeMarkets.length} markets active`, color: 'bg-amber-50 border-amber-100', icon: '📍' },
  { href: '/admin/dashboard/products', label: 'Product Catalog', sub: `${activeProducts.length} active items`, color: 'bg-green-50 border-green-100', icon: '🫙' },
];

export default function OverviewPage() {
  const hour = now.getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-serif text-[30px] font-semibold text-ink">{greeting} 👋</h1>
        <p className="text-ink-soft mt-1">Here&apos;s your weekly snapshot for Shaku Maku.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Active Products', value: activeProducts.length, sub: `${PRODUCTS.length} total SKUs`, icon: '🫙', accent: 'text-gold' },
          { label: 'Open Markets', value: activeMarkets.length, sub: 'pickup available', icon: '📍', accent: 'text-amber-600' },
          { label: 'Delivery Dates', value: openDeliveries.length, sub: 'cutoff not yet passed', icon: '🚚', accent: 'text-blue-600' },
          { label: 'Price Per Item', value: '$8', sub: 'flat rate, all products', icon: '💰', accent: 'text-green-600' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-[#E4E4E7] p-5 shadow-sm">
            <div className="text-2xl mb-3">{s.icon}</div>
            <div className={`font-serif text-[34px] font-bold leading-none ${s.accent}`}>{s.value}</div>
            <div className="text-sm font-semibold text-ink mt-1">{s.label}</div>
            <div className="text-xs text-ink-soft mt-0.5">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Quick access */}
      <h2 className="text-[13px] font-bold uppercase tracking-widest text-ink-soft mb-3">Quick Access</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {quickLinks.map((q) => (
          <Link
            key={q.href}
            href={q.href}
            className={`flex items-center gap-4 p-5 rounded-2xl border ${q.color} hover:scale-[1.02] transition-transform duration-150 select-none`}
          >
            <span className="text-3xl">{q.icon}</span>
            <div>
              <div className="font-semibold text-ink">{q.label}</div>
              <div className="text-sm text-ink-soft">{q.sub}</div>
            </div>
            <svg className="ml-auto text-ink-soft" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Link>
        ))}
      </div>

      {/* Cutoff timeline */}
      <h2 className="text-[13px] font-bold uppercase tracking-widest text-ink-soft mb-3">Upcoming Cutoffs</h2>
      <div className="bg-white rounded-2xl border border-[#E4E4E7] divide-y divide-[#F0F0F1] shadow-sm">
        {[
          ...DELIVERY_DATES.map((d) => ({
            label: `🚚 Delivery — ${d.label}`,
            cutoff: d.cutoff,
            type: 'delivery' as const,
          })),
          ...MARKETS.map((m) => ({
            label: `📍 ${m.name}`,
            cutoff: m.cutoff,
            type: 'market' as const,
          })),
        ]
          .sort((a, b) => new Date(a.cutoff).getTime() - new Date(b.cutoff).getTime())
          .map((item, i) => {
            const cutoffDate = new Date(item.cutoff);
            const passed = cutoffDate < now;
            const diffMs = cutoffDate.getTime() - now.getTime();
            const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
            const diffDays = Math.floor(diffHrs / 24);
            const timeLeft = passed
              ? 'Cutoff passed'
              : diffDays > 0
              ? `${diffDays}d ${diffHrs % 24}h left`
              : `${diffHrs}h left`;

            return (
              <div key={i} className="flex items-center justify-between px-6 py-4">
                <div>
                  <div className={`text-sm font-semibold ${passed ? 'text-ink-soft line-through' : 'text-ink'}`}>{item.label}</div>
                  <div className="text-xs text-ink-soft mt-0.5">
                    Cutoff: {cutoffDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} at{' '}
                    {cutoffDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                  </div>
                </div>
                <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
                  passed ? 'bg-[#F4F4F5] text-ink-soft' : diffHrs < 24 ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-700'
                }`}>
                  {timeLeft}
                </span>
              </div>
            );
          })}
      </div>
    </div>
  );
}
