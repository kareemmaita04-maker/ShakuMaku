'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { PRODUCTS, MARKETS, DELIVERY_DATES } from '@/lib/data';

const visibleProducts = PRODUCTS.filter((p) => !p.hidden);
const activeMarkets = MARKETS.filter((m) => !m.hidden && m.pickupOn);
const upcomingDeliveries = DELIVERY_DATES.length;

export default function AdminDashboard() {
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin');
  }

  return (
    <div className="min-h-screen bg-cream-2">
      {/* Top bar */}
      <div className="bg-ink text-cream px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#E8C870] to-gold flex items-center justify-center text-white">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 13h16a8 8 0 0 1-16 0Z" />
              <circle cx="12" cy="7" r="2.6" />
            </svg>
          </div>
          <div>
            <div className="font-serif text-[18px] font-bold leading-none">Shaku Maku</div>
            <div className="text-[10px] uppercase tracking-widest text-gold mt-0.5">Admin Dashboard</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-cream/70 text-sm hover:text-cream transition-colors">
            ← View Site
          </Link>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-full border border-cream/30 text-cream/80 text-sm hover:bg-cream/10 transition-colors select-none"
          >
            Sign Out
          </button>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-6 py-10">
        <h1 className="font-serif text-[32px] font-semibold mb-1">Good morning 👋</h1>
        <p className="text-ink-soft mb-8">Here&apos;s a snapshot of your shop.</p>

        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Active Products', value: visibleProducts.length, icon: '🫙' },
            { label: 'Active Markets', value: activeMarkets.length, icon: '📍' },
            { label: 'Delivery Dates', value: upcomingDeliveries, icon: '🚚' },
            { label: 'Total SKUs', value: PRODUCTS.length, icon: '📦' },
          ].map((s) => (
            <div key={s.label} className="bg-paper border border-line rounded-[18px] p-5">
              <div className="text-2xl mb-2">{s.icon}</div>
              <div className="font-serif text-[32px] font-semibold leading-none">{s.value}</div>
              <div className="text-sm text-ink-soft mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Products table */}
        <div className="bg-paper border border-line rounded-[18px] overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-line flex items-center justify-between">
            <h2 className="font-serif text-xl font-semibold">Products</h2>
            <span className="text-sm text-ink-soft">{visibleProducts.length} active</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line bg-cream-2 text-ink-soft text-[12px] uppercase tracking-wide">
                  <th className="text-left px-6 py-3">Name</th>
                  <th className="text-left px-6 py-3">Category</th>
                  <th className="text-left px-6 py-3">Size</th>
                  <th className="text-right px-6 py-3">Price</th>
                  <th className="text-left px-6 py-3">Badges</th>
                  <th className="text-center px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {PRODUCTS.map((p, i) => (
                  <tr key={p.id} className={`border-b border-line last:border-0 ${i % 2 === 0 ? '' : 'bg-cream-2/40'}`}>
                    <td className="px-6 py-3.5 font-medium">{p.name}</td>
                    <td className="px-6 py-3.5 text-ink-soft">{p.cat}</td>
                    <td className="px-6 py-3.5 text-ink-soft">{p.size}</td>
                    <td className="px-6 py-3.5 text-right font-semibold">${p.price}</td>
                    <td className="px-6 py-3.5">
                      <div className="flex flex-wrap gap-1">
                        {p.badges.map((b) => (
                          <span key={b} className="text-[11px] bg-cream-3 text-ink-soft px-2 py-0.5 rounded-full">{b}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-3.5 text-center">
                      {p.hidden ? (
                        <span className="text-[11px] bg-cream-3 text-ink-soft px-2.5 py-1 rounded-full">Hidden</span>
                      ) : p.badges.includes('Sold Out') ? (
                        <span className="text-[11px] bg-spicy/10 text-spicy px-2.5 py-1 rounded-full">Sold Out</span>
                      ) : (
                        <span className="text-[11px] bg-green-50 text-green-700 px-2.5 py-1 rounded-full">Active</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Markets table */}
        <div className="bg-paper border border-line rounded-[18px] overflow-hidden">
          <div className="px-6 py-4 border-b border-line flex items-center justify-between">
            <h2 className="font-serif text-xl font-semibold">Upcoming Markets</h2>
            <span className="text-sm text-ink-soft">{activeMarkets.length} with pickup open</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line bg-cream-2 text-ink-soft text-[12px] uppercase tracking-wide">
                  <th className="text-left px-6 py-3">Market</th>
                  <th className="text-left px-6 py-3">Date</th>
                  <th className="text-left px-6 py-3">Time</th>
                  <th className="text-left px-6 py-3">Cutoff</th>
                  <th className="text-center px-6 py-3">Pickup</th>
                </tr>
              </thead>
              <tbody>
                {MARKETS.map((m, i) => (
                  <tr key={m.id} className={`border-b border-line last:border-0 ${i % 2 === 0 ? '' : 'bg-cream-2/40'}`}>
                    <td className="px-6 py-3.5 font-medium">{m.name}</td>
                    <td className="px-6 py-3.5 text-ink-soft">{m.day}, {m.date}</td>
                    <td className="px-6 py-3.5 text-ink-soft">{m.time}</td>
                    <td className="px-6 py-3.5 text-ink-soft">{new Date(m.cutoff).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}</td>
                    <td className="px-6 py-3.5 text-center">
                      {m.pickupOn ? (
                        <span className="text-[11px] bg-green-50 text-green-700 px-2.5 py-1 rounded-full">Open</span>
                      ) : (
                        <span className="text-[11px] bg-cream-3 text-ink-soft px-2.5 py-1 rounded-full">Closed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
