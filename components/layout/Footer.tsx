import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-ink text-cream pt-14 pb-8 mt-10">
      <div className="max-w-[1180px] mx-auto px-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#E8C870] to-gold flex items-center justify-center text-white">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4 13h16a8 8 0 0 1-16 0Z" />
                  <circle cx="12" cy="7" r="2.6" />
                </svg>
              </div>
              <div className="font-serif text-xl font-bold">Shaku Maku</div>
            </div>
            <p className="text-cream/70 text-sm leading-relaxed max-w-[260px]">
              Small-batch hummus, dips & lebneh made fresh in Arizona for every weekly preorder.
              Pickup at local farmers markets or doorstep delivery across the Phoenix area.
            </p>
          </div>

          <div>
            <h4 className="text-[11px] uppercase tracking-[.1em] font-bold text-gold mb-4">Shop</h4>
            <ul className="space-y-2.5">
              {[
                { href: '/shop', label: 'All Products' },
                { href: '/shop?cat=Hummus+%26+Dips', label: 'Hummus & Dips' },
                { href: '/shop?cat=Lebneh', label: 'Lebneh' },
                { href: '/shop?cat=Bundles', label: 'Bundles' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-cream/75 text-sm hover:text-cream transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] uppercase tracking-[.1em] font-bold text-gold mb-4">Company</h4>
            <ul className="space-y-2.5">
              {[
                { href: '/about',     label: 'About Us' },
                { href: '/markets',   label: 'Farmers Markets' },
                { href: '/wholesale', label: 'Wholesale' },
                { href: '/bulk',      label: 'Bulk & Catering' },
                { href: '/contact',   label: 'Contact' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-cream/75 text-sm hover:text-cream transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] uppercase tracking-[.1em] font-bold text-gold mb-4">Stay in Touch</h4>
            <ul className="space-y-2.5">
              <li><a href="#" className="text-cream/75 text-sm hover:text-cream transition-colors">📷 @shakumaku.az</a></li>
              <li><a href="mailto:hello@shakumaku.com" className="text-cream/75 text-sm hover:text-cream transition-colors">hello@shakumaku.com</a></li>
              <li><a href="tel:+16025550199" className="text-cream/75 text-sm hover:text-cream transition-colors">(602) 555-0199</a></li>
            </ul>
            <div className="mt-4">
              <Link
                href="/wholesale"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold text-white text-sm font-semibold hover:bg-gold-dk active:scale-95 transition-all duration-150 select-none"
              >
                Carry Us in Your Store
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-cream/15 flex flex-wrap justify-between gap-3 text-[13px] text-cream/55">
          <span>© 2026 Shaku Maku LLC · Phoenix, Arizona · Made fresh, made local.</span>
          <Link href="/admin" className="text-cream/70 hover:text-cream transition-colors">Team Login →</Link>
        </div>
      </div>
    </footer>
  );
}
