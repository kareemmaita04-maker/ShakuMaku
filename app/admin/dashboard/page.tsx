'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { PRODUCTS, MARKETS, type Order } from '@/lib/data';
import { money, fmtDate } from '@/lib/utils';

// ─── Status config ────────────────────────────────────────────────────────────
const STATUS_CFG = {
  all:       { label: 'All Orders',  emoji: '📋', pill: 'bg-ink text-cream',                    badge: 'bg-ink/10 text-ink' },
  pending:   { label: 'Pending',     emoji: '⏳', pill: 'bg-amber-100 text-amber-800 border border-amber-200',  badge: 'bg-amber-100 text-amber-700' },
  preparing: { label: 'Preparing',   emoji: '👨‍🍳', pill: 'bg-blue-100 text-blue-800 border border-blue-200',    badge: 'bg-blue-100 text-blue-700' },
  ready:     { label: 'Ready',       emoji: '✅', pill: 'bg-purple-100 text-purple-800 border border-purple-200', badge: 'bg-purple-100 text-purple-700' },
  delivered: { label: 'Delivered',   emoji: '🚚', pill: 'bg-green-100 text-green-800 border border-green-200',  badge: 'bg-green-100 text-green-700' },
  cancelled: { label: 'Cancelled',   emoji: '❌', pill: 'bg-red-100 text-red-700 border border-red-200',        badge: 'bg-red-100 text-red-600' },
} as const;

type TabKey = keyof typeof STATUS_CFG;
const TABS: TabKey[] = ['all', 'pending', 'preparing', 'ready', 'delivered', 'cancelled'];
const STATUS_OPTIONS: Exclude<TabKey, 'all'>[] = ['pending', 'preparing', 'ready', 'delivered', 'cancelled'];

function getProd(id: string) { return PRODUCTS.find((p) => p.id === id); }
function getMarketName(id: string) { return MARKETS.find((m) => m.id === id)?.name ?? '—'; }

function StatusPill({ status }: { status: string }) {
  const cfg = STATUS_CFG[status as TabKey] ?? STATUS_CFG.pending;
  return (
    <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${cfg.pill}`}>
      {cfg.emoji} {cfg.label}
    </span>
  );
}

// ─── Order card ───────────────────────────────────────────────────────────────
function OrderCard({ order, onStatusChange, updating }: {
  order: Order;
  onStatusChange: (id: string, status: string) => void;
  updating: string | null;
}) {
  const placed = new Date(order.placed);
  const orderTotal = order.items.reduce((s, i) => s + (getProd(i.id)?.price ?? 0) * i.qty, 0) + order.fee;

  return (
    <div className="bg-paper border border-line rounded-[18px] p-5 flex flex-col gap-4">
      {/* Header row */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-[13px] font-bold bg-cream-2 text-ink px-2.5 py-1 rounded-lg">{order.id}</span>
          <StatusPill status={order.status} />
          <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${order.fulfill === 'delivery' ? 'bg-blue-50 text-blue-700' : 'bg-amber-50 text-amber-700'}`}>
            {order.fulfill === 'delivery' ? '🚚 Delivery' : '📍 Pickup'}
          </span>
        </div>
        <div className="text-xs text-ink-soft">
          {placed.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} · {placed.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Left — customer + items */}
        <div className="flex-1 min-w-0 space-y-2">
          <div>
            <div className="font-semibold text-[15px] text-ink">{order.name}</div>
            <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-ink-soft mt-0.5">
              <span>📧 {order.email}</span>
              {order.phone && <span>📱 {order.phone}</span>}
            </div>
          </div>

          <div className="text-xs text-ink-soft">
            {order.fulfill === 'pickup'
              ? `📍 ${getMarketName(order.marketId)} · ${fmtDate(order.date)}`
              : `🏠 ${order.addr} · ${fmtDate(order.date)}`}
          </div>

          <div className="flex flex-wrap gap-1.5">
            {order.items.map((item) => {
              const p = getProd(item.id);
              return (
                <span key={item.id} className="text-xs bg-cream-2 text-ink px-2.5 py-1 rounded-full font-medium">
                  {item.qty}× {p?.name ?? item.id}
                </span>
              );
            })}
          </div>

          {order.notes && (
            <div className="text-xs text-ink-soft italic bg-cream-2 rounded-lg px-3 py-1.5">
              💬 {order.notes}
            </div>
          )}
        </div>

        {/* Right — total + status dropdown */}
        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 sm:gap-2 shrink-0">
          <div className="text-right">
            <div className="font-serif text-[22px] font-bold text-ink leading-none">{money(orderTotal)}</div>
            {order.fee > 0 && <div className="text-[11px] text-ink-soft mt-0.5">incl. ${order.fee} delivery</div>}
          </div>
          <div className="flex flex-col items-end gap-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-ink-soft">Update Status</label>
            <select
              value={order.status}
              disabled={updating === order.id}
              onChange={(e) => onStatusChange(order.id, e.target.value)}
              className="px-3 py-2 rounded-xl border-[1.5px] border-line bg-cream-2 text-ink text-sm font-semibold focus:outline-none focus:border-gold cursor-pointer disabled:opacity-50 min-w-[150px]"
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>{STATUS_CFG[s].emoji} {STATUS_CFG[s].label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabKey>('all');
  const [updating, setUpdating] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    try {
      const res = await fetch('/api/orders');
      setOrders(await res.json());
    } catch { /* silent */ }
    finally { setLoading(false); }
  }, []);

  useEffect(() => {
    fetchOrders();
    const t = setInterval(fetchOrders, 30_000);
    return () => clearInterval(t);
  }, [fetchOrders]);

  async function handleStatusChange(orderId: string, newStatus: string) {
    setUpdating(orderId);
    await fetch(`/api/orders/${orderId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });
    setOrders((prev) => prev.map((o) => o.id === orderId ? { ...o, status: newStatus } : o));
    setUpdating(null);
  }

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin');
  }

  // Counts per status
  const counts = STATUS_OPTIONS.reduce<Record<string, number>>((acc, s) => {
    acc[s] = orders.filter((o) => o.status === s).length;
    return acc;
  }, {});
  counts.all = orders.length;

  const visibleOrders = activeTab === 'all' ? orders : orders.filter((o) => o.status === activeTab);

  const totalRevenue = orders
    .filter((o) => o.status !== 'cancelled')
    .reduce((s, o) => s + o.items.reduce((a, i) => a + (getProd(i.id)?.price ?? 0) * i.qty, 0) + o.fee, 0);

  return (
    <div className="min-h-screen bg-cream-2">
      {/* Top bar */}
      <div className="bg-ink text-cream px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#E8C870] to-gold flex items-center justify-center text-white">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 13h16a8 8 0 0 1-16 0Z" /><circle cx="12" cy="7" r="2.6" />
            </svg>
          </div>
          <div>
            <div className="font-serif text-[18px] font-bold leading-none">Shaku Maku</div>
            <div className="text-[10px] uppercase tracking-widest text-gold mt-0.5">Admin Dashboard</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={fetchOrders} className="text-cream/70 text-sm hover:text-cream transition-colors select-none flex items-center gap-1.5">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M23 4v6h-6M1 20v-6h6"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/>
            </svg>
            Refresh
          </button>
          <Link href="/" className="text-cream/70 text-sm hover:text-cream transition-colors">← View Site</Link>
          <button onClick={handleLogout} className="px-4 py-2 rounded-full border border-cream/30 text-cream/80 text-sm hover:bg-cream/10 transition-colors select-none">
            Sign Out
          </button>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 py-8">

        {/* Stat cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3 mb-8">
          {[
            { label: 'Total Orders', value: orders.length, icon: '📋' },
            { label: 'Pending',      value: counts.pending ?? 0,   icon: '⏳' },
            { label: 'Preparing',    value: counts.preparing ?? 0, icon: '👨‍🍳' },
            { label: 'Ready',        value: counts.ready ?? 0,     icon: '✅' },
            { label: 'Delivered',    value: counts.delivered ?? 0, icon: '🚚' },
            { label: 'Revenue',      value: money(totalRevenue),   icon: '💰' },
          ].map((s) => (
            <div key={s.label} className="bg-paper border border-line rounded-[16px] p-4">
              <div className="text-xl mb-2">{s.icon}</div>
              <div className="font-serif text-[26px] font-bold leading-none">{s.value}</div>
              <div className="text-xs text-ink-soft mt-1 font-medium">{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── Orders section ── */}
        <div className="mb-8">
          <h2 className="font-serif text-2xl font-semibold mb-4">Orders</h2>

          {/* Tabs */}
          <div className="flex gap-2 flex-wrap mb-5 border-b border-line pb-4">
            {TABS.map((tab) => {
              const cfg = STATUS_CFG[tab];
              const count = counts[tab] ?? 0;
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 select-none ${
                    isActive
                      ? 'bg-ink text-cream shadow-sm'
                      : 'bg-paper border border-line text-ink-soft hover:border-ink hover:text-ink'
                  }`}
                >
                  <span>{cfg.emoji}</span>
                  <span>{cfg.label}</span>
                  {count > 0 && (
                    <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center ${
                      isActive ? 'bg-white/20 text-cream' : STATUS_CFG[tab].badge
                    }`}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Order cards */}
          {loading ? (
            <div className="py-16 text-center text-ink-soft">Loading orders…</div>
          ) : visibleOrders.length === 0 ? (
            <div className="py-16 text-center bg-paper border border-line rounded-[18px]">
              <div className="text-4xl mb-3">{STATUS_CFG[activeTab].emoji}</div>
              <p className="text-ink-soft font-medium">
                {orders.length === 0
                  ? "No orders yet — they'll appear here as customers check out."
                  : `No ${activeTab === 'all' ? '' : activeTab + ' '}orders right now.`}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {visibleOrders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  onStatusChange={handleStatusChange}
                  updating={updating}
                />
              ))}
            </div>
          )}
        </div>

        {/* ── Products table ── */}
        <div className="bg-paper border border-line rounded-[18px] overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-line flex items-center justify-between">
            <h2 className="font-serif text-xl font-semibold">Products</h2>
            <span className="text-sm text-ink-soft">{PRODUCTS.filter((p) => !p.hidden).length} active</span>
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

        {/* ── Markets table ── */}
        <div className="bg-paper border border-line rounded-[18px] overflow-hidden">
          <div className="px-6 py-4 border-b border-line flex items-center justify-between">
            <h2 className="font-serif text-xl font-semibold">Upcoming Markets</h2>
            <span className="text-sm text-ink-soft">{MARKETS.filter((m) => !m.hidden && m.pickupOn).length} with pickup open</span>
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
                      {m.pickupOn
                        ? <span className="text-[11px] bg-green-50 text-green-700 px-2.5 py-1 rounded-full">Open</span>
                        : <span className="text-[11px] bg-cream-3 text-ink-soft px-2.5 py-1 rounded-full">Closed</span>}
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
