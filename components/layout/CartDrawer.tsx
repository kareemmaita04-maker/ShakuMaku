'use client';

import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useCart } from '@/lib/cart';
import { getProd, SETTINGS, CATEGORY_COLORS } from '@/lib/data';
import { money } from '@/lib/utils';
import { BowlSVG } from '@/components/ui/BowlSVG';

export function CartDrawer() {
  const { items, drawerOpen, closeDrawer, setQty, removeItem, itemCount, subtotal } = useCart();
  const MIN = SETTINGS.minOrder;
  const remaining = Math.max(0, MIN - itemCount);
  const meetsMinimum = itemCount >= MIN;

  return (
    <AnimatePresence>
      {drawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[95] bg-ink/45"
            onClick={closeDrawer}
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 340, damping: 34 }}
            className="fixed top-0 right-0 h-full w-[430px] max-w-[92vw] bg-cream z-[100] flex flex-col shadow-[−20px_0_50px_-30px_rgba(0,0,0,.5)]"
          >
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-5 border-b border-line">
              <h3 className="font-serif text-2xl font-semibold">Your Order</h3>
              <button
                onClick={closeDrawer}
                className="w-9 h-9 rounded-full bg-cream-2 hover:bg-cream-3 flex items-center justify-center text-2xl leading-none transition-colors active:scale-95"
              >
                ×
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <div className="text-5xl mb-4">🫙</div>
                  <p className="font-serif text-xl text-ink mb-2">Your order is empty</p>
                  <p className="text-ink-soft text-sm mb-6">Add some fresh dips to get started.</p>
                  <Link
                    href="/shop"
                    onClick={closeDrawer}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-terracotta text-white font-semibold text-sm hover:bg-terra-dk active:scale-95 transition-all duration-150 select-none"
                  >
                    Browse the Shop
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-line">
                  {items.map((item) => {
                    const p = getProd(item.productId);
                    if (!p) return null;
                    const [c1, c2] = CATEGORY_COLORS[p.cat];
                    return (
                      <div key={item.productId} className="flex gap-3.5 py-4">
                        <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                          <BowlSVG c1={c1} c2={c2} id={`cart-${p.id}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm leading-tight">{p.name}</p>
                          <p className="text-ink-soft text-xs mt-0.5">{p.size} · {money(p.price)}</p>
                          <div className="flex items-center border border-line rounded-full overflow-hidden mt-2 w-fit">
                            <button
                              onClick={() => setQty(p.id, item.qty - 1)}
                              className="w-7 h-7 text-terracotta font-bold text-base flex items-center justify-center hover:bg-cream-2 active:scale-90 transition-all"
                            >
                              −
                            </button>
                            <span className="min-w-[26px] text-center text-sm font-semibold">{item.qty}</span>
                            <button
                              onClick={() => setQty(p.id, item.qty + 1)}
                              className="w-7 h-7 text-terracotta font-bold text-base flex items-center justify-center hover:bg-cream-2 active:scale-90 transition-all"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(p.id)}
                            className="text-xs text-ink-soft underline mt-1.5 active:opacity-70"
                          >
                            Remove
                          </button>
                        </div>
                        <div className="font-bold text-sm whitespace-nowrap">{money(p.price * item.qty)}</div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-line bg-paper">
                <div className="flex justify-between text-sm text-ink-soft mb-1.5">
                  <span>Subtotal ({itemCount} item{itemCount !== 1 ? 's' : ''})</span>
                  <span>{money(subtotal)}</span>
                </div>
                <div className="flex justify-between text-xs text-ink-soft mb-3">
                  <span>Pickup is free · Delivery $9 flat</span>
                </div>

                {/* Minimum order progress */}
                {!meetsMinimum && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[13px] font-semibold text-amber-800">3-item minimum</span>
                      <span className="text-[12px] text-amber-700">Add {remaining} more to checkout</span>
                    </div>
                    <div className="flex gap-1.5">
                      {Array.from({ length: MIN }).map((_, i) => (
                        <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${i < itemCount ? 'bg-terracotta' : 'bg-amber-200'}`} />
                      ))}
                    </div>
                  </div>
                )}

                {meetsMinimum ? (
                  <Link
                    href="/checkout"
                    onClick={closeDrawer}
                    className="flex items-center justify-center w-full px-5 py-3.5 rounded-full bg-terracotta text-white font-semibold text-sm hover:bg-terra-dk active:scale-[.98] transition-all duration-150 select-none"
                  >
                    Checkout →
                  </Link>
                ) : (
                  <button
                    disabled
                    className="flex items-center justify-center w-full px-5 py-3.5 rounded-full bg-cream-3 text-ink-soft font-semibold text-sm cursor-not-allowed select-none"
                  >
                    Add {remaining} more item{remaining !== 1 ? 's' : ''} to checkout
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
