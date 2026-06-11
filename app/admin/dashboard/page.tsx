'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { PRODUCTS, MARKETS, type Order } from '@/lib/data';
import { money, fmtDate } from '@/lib/utils';

const STATUS_META: Record<string, { label: string; color: string; dot: string }> = {
  pending:   { label: 'Pending',    color: 'bg-amber-50 text-amber-700 border-amber-200',  dot: 'bg-amber-400' },
  preparing: { label: 'Preparing',  color: 'bg-blue-50 text-blue-700 border-blue-200',    dot: 'bg-blue-400' },
  ready:     { label: 'Ready',      color: 'bg-purple-50 text-purple-700 border-purple-200', dot: 'bg-purple-400' },
  delivered: { label: 'Delivered',  color: 'bg-green-50 text-green-700 border-green-200', dot: 'bg-green-500' },
  cancelled: { label: 'Cancelled',  color: 'bg-red-50 text-red-600 border-red-200',       dot: 'bg-red-400' },
};

const STATUSES = ['pending', 'preparing', 'ready', 'delivered', 'cancelled'];

function StatusBadge({ status }: { status: string }) {
  const m = STATUS_META[status] ?? STATUS_META.pending;
  return (
    <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full border ${m.color}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${m.dot}`} />
      {m.label}
    </span>
  );
}

function getProd(id: string) {
  return PRODUCTS.find((p) => p.id === id);
}

function getMarketName(id: string) {
  return MARKETS.find((m) => m.id === id)?.name ?? '—';
}

export default function AdminDashboard() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [updating, setUpdating] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      setOrders(data);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 30000); // auto-refresh every 30s
    return () => clearInterval(interval);
  }, [fetchOrders]);

  async function handleStatusChange(orderId: string, newStatus: string) {
    setUpdating(orderId);
    try {
      await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      setOrders((prev) => prev.map((o) => o.id === orderId ? { ...o, status: newStatus } : o));
    } finally {
      setUpdating(null);
    }
  }

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin');
  }

  const filtered = filter === 'all' ? orders : orders.filter((o) => o.status === filter);
  const counts = STATUSES.reduce<Record<string, number>>((acc, s) => {
    acc[s] = orders.filter((o) => o.status === s).length;
    return acc;
  }, {});
  const totalRevenue = orders.filter(o => o.status !== 'cancelled').reduce((s, o) => {
    const sub = o.items.reduce((a, i) => a + (getProd(i.id)?.price ?? 0) * i.qty, 0);
    return s + sub + o.fee;
  }, 0);

  return (
    <div className="min-h-screen bg-cream-2">
      {/* Top bar */}
      <div className="bg-ink text-cream px-6 py-4 flex items-center justify-between sticky top-0 z-40">
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
          <button
            onClick={fetchOrders}
            className="text-cream/70 text-sm hover:text-cream transition-colors select-none flex items-center gap-1.5"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M23 4v6h-6M1 20v-6h6"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/>
            </svg>
            Refresh
          </button>
          <Link href="/" className="text-cream/70 text-sm hover:text-cream transition-colors">← View Site</Link>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-full border border-cream/30 text-cream/80 text-sm hover:bg-cream/10 transition-colors select-none"
          >
            Sign Out
          </button>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 py-10">

        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4 mb-8">
          <div className="bg-paper border border-line rounded-[18px] p-5 col-span-2 md:col-span-1">
            <div className="text-2xl mb-2">📋</div>
            <div className="font-serif text-[32px] font-semibold leading-none">{orders.length}</div>
            <div className="text-sm text-ink-soft mt-1">Total Orders</div>
          </div>
          {STATUSES.slice(0, 3).map((s) => (
            <div key={s} className="bg-paper border border-line rounded-[18px] p-5">
              <div className="text-2xl mb-2">{s === 'pending' ? '⏳' : s === 'preparing' ? '👨‍🍳' : '✅'}</div>
              <div className="font-serif text-[32px] font-semibold leading-none">{counts[s] ?? 0}</div>
              <div className="text-sm text-ink-soft mt-1 capitalize">{s}</div>
            </div>
          ))}
          <div className="bg-paper border border-line rounded-[18px] p-5">
            <div className="text-2xl mb-2">🚚</div>
            <div className="font-serif text-[32px] font-semibold leading-none">{counts.delivered ?? 0}</div>
            <div className="text-sm text-ink-soft mt-1">Delivered</div>
          </div>
          <div className="bg-paper border border-line rounded-[18px] p-5">
            <div className="text-2xl mb-2">💰</div>
            <div className="font-serif text-[28px] font-semibold leading-none">{money(totalRevenue)}</div>
            <div className="text-sm text-ink-soft mt-1">Revenue</div>
          </div>
        </div>

        {/* Orders */}
        <div className="bg-paper border border-line rounded-[18px] overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-line flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-serif text-xl font-semibold">Orders</h2>
            {/* Filter tabs */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all select-none ${filter === 'all' ? 'bg-ink text-cream' : 'bg-cream-2 text-ink-soft hover:bg-cream-3'}`}
              >
                All ({orders.length})
              </button>
              {STATUSES.map((s) => (
                <button
                  key={s}
                  onClick={() => setFilter(s)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold capitalize transition-all select-none ${filter === s ? 'bg-ink text-cream' : 'bg-cream-2 text-ink-soft hover:bg-cream-3'}`}
                >
                  {s} ({counts[s] ?? 0})
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="px-6 py-16 text-center text-ink-soft">Loading orders…</div>
          ) : filtered.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <div className="text-4xl mb-3">🫙</div>
              <p className="text-ink-soft font-medium">
                {orders.length === 0 ? 'No orders yet — they\'ll appear here as customers check out.' : `No ${filter} orders.`}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-line">
              {filtered.map((order) => {
                const orderTotal = order.items.reduce((s, i) => s + (getProd(i.id)?.price ?? 0) * i.qty, 0) + order.fee;
                const placedDate = new Date(order.placed);
                return (
                  <div key={order.id} className="px-6 py-5">
                    <div className="flex flex-col lg:flex-row lg:items-start gap-4">

                      {/* Left — order info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="font-mono text-[13px] font-bold text-ink bg-cream-2 px-2.5 py-0.5 rounded-lg">{order.id}</span>
                          <StatusBadge status={order.status} />
                          <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${order.fulfill === 'delivery' ? 'bg-blue-50 text-blue-700' : 'bg-amber-50 text-amber-700'}`}>
                            {order.fulfill === 'delivery' ? '🚚 Delivery' : '📍 Pickup'}
                          </span>
                        </div>

                        {/* Customer */}
                        <div className="font-semibold text-[15px] text-ink">{order.name}</div>
                        <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-ink-soft mt-0.5">
                          <span>📧 {order.email}</span>
                          {order.phone && <span>📱 {order.phone}</span>}
                          <span>🕐 {placedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at {placedDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</span>
                        </div>

                        {/* Fulfillment info */}
                        <div className="text-xs text-ink-soft mt-1">
                          {order.fulfill === 'pickup'
                            ? `📍 ${getMarketName(order.marketId)} · ${fmtDate(order.date)}`
                            : `🏠 ${order.addr} · ${fmtDate(order.date)}`}
                        </div>

                        {/* Items */}
                        <div className="mt-3 flex flex-wrap gap-2">
                          {order.items.map((item) => {
                            const p = getProd(item.id);
                            return (
                              <span key={item.id} className="text-xs bg-cream-2 text-ink px-2.5 py-1 rounded-full font-medium">
                                {item.qty}× {p?.name ?? item.id}
                              </span>
                            );
                          })}
                        </div>

                        {/* Notes */}
                        {order.notes && (
                          <div className="mt-2 text-xs text-ink-soft italic bg-cream-2 rounded-lg px-3 py-1.5">
                            💬 {order.notes}
                          </div>
                        )}
                      </div>

                      {/* Right — total + status control */}
                      <div className="flex flex-row lg:flex-col items-center lg:items-end gap-3 lg:gap-2 shrink-0">
                        <div className="font-serif text-[22px] font-semibold text-ink">{money(orderTotal)}</div>
                        {order.fee > 0 && <div className="text-xs text-ink-soft">incl. ${order.fee} delivery</div>}
                        <select
                          value={order.status}
                          disabled={updating === order.id}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          className="mt-1 px-3 py-2 rounded-xl border border-line bg-cream text-ink text-sm font-semibold focus:outline-none focus:border-gold cursor-pointer disabled:opacity-50 min-w-[140px]"
                        >
                          {STATUSES.map((s) => (
                            <option key={s} value={s} className="capitalize">{STATUS_META[s].label}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Products table */}
        <div className="bg-paper border border-line rounded-[18px] overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-line flex items-center justify-between">
            <h2 className="font-serif text-xl font-semibold">Products</h2>
            <span className="text-sm text-ink-soft">{PRODUCTS.filter(p => !p.hidden).length} active</span>
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
                  <tr key={p.id} className={`border-b border-line last:border-0 ${i % 2 !== 0 ? 'bg-cream-2/40' : ''}`}>
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
            <span className="text-sm text-ink-soft">{MARKETS.filter(m => !m.hidden && m.pickupOn).length} with pickup open</span>
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
                  <tr key={m.id} className={`border-b border-line last:border-0 ${i % 2 !== 0 ? 'bg-cream-2/40' : ''}`}>
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
