'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useCart } from '@/lib/cart';

const NAV = [
  { href: '/',           label: 'Home' },
  { href: '/shop',       label: 'Shop' },
  { href: '/markets',    label: 'Farmers Markets' },
  { href: '/wholesale',  label: 'Wholesale' },
  { href: '/bulk',       label: 'Bulk Orders' },
  { href: '/about',      label: 'About' },
  { href: '/contact',    label: 'Contact' },
];

export function Header() {
  const pathname = usePathname();
  const { itemCount, openDrawer } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-[60] bg-cream/95 backdrop-blur-md border-b border-line">
        <div className="max-w-[1180px] mx-auto px-5 flex items-center justify-between h-[74px]">
          {/* Logo — Link to home */}
          <Link href="/" className="flex items-center gap-2.5 select-none hover:opacity-80 transition-opacity duration-150">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E8C870] to-gold flex items-center justify-center text-white shadow-card">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 13h16a8 8 0 0 1-16 0Z" />
                <circle cx="12" cy="7" r="2.6" />
              </svg>
            </div>
            <div>
              <div className="font-serif text-[22px] font-bold tracking-tight leading-none">Shaku Maku</div>
              <div className="text-[9px] font-bold tracking-[.28em] uppercase text-terracotta mt-0.5">Fresh · Local · AZ</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={`px-3.5 py-2 rounded-full text-[14.5px] font-medium transition-colors duration-150 select-none ${
                  pathname === n.href
                    ? 'text-terracotta font-semibold'
                    : 'text-ink-soft hover:text-ink hover:bg-cream-2'
                }`}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={openDrawer}
              className="relative w-11 h-11 rounded-full bg-cream-2 hover:bg-cream-3 flex items-center justify-center transition-colors duration-150 active:scale-95"
              aria-label="Open cart"
            >
              <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M6 6h15l-1.5 9h-12L6 6Z" />
                <path d="M6 6 5 2H2" />
                <circle cx="9" cy="20" r="1.4" />
                <circle cx="18" cy="20" r="1.4" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1.5 rounded-full bg-terracotta text-white text-[11px] font-bold flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden w-11 h-11 rounded-xl bg-cream-2 flex items-center justify-center active:scale-95"
              aria-label="Open menu"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[85] bg-ink/40"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="fixed top-0 right-0 h-full w-[300px] z-[90] bg-cream flex flex-col px-6 py-6 shadow-bowl"
            >
              <div className="flex justify-between items-center mb-8">
                <div className="font-serif text-xl font-bold">Shaku Maku</div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-10 h-10 rounded-full bg-cream-2 flex items-center justify-center text-2xl leading-none active:scale-95"
                >
                  ×
                </button>
              </div>
              <nav className="flex flex-col gap-1">
                {NAV.map((n) => (
                  <Link
                    key={n.href}
                    href={n.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-serif text-2xl font-semibold py-3 border-b border-line text-ink active:text-terracotta select-none"
                  >
                    {n.label}
                  </Link>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
