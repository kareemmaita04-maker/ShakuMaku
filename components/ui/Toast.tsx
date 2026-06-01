'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useCart } from '@/lib/cart';

export function Toast() {
  const { toast } = useCart();
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          key="toast"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-2.5 bg-ink text-cream px-5 py-3.5 rounded-2xl font-semibold text-sm shadow-bowl pointer-events-none whitespace-nowrap"
        >
          <span className="text-base">✓</span> {toast}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
