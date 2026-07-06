import Link from 'next/link';
import Image from 'next/image';
import { CuttingBoard } from '@/components/products/CuttingBoard';

const reviews = [
  { text: '"The mango lebneh is unreal. I preorder every single week and pick up at the Downtown market."', name: 'Layla H.', loc: 'Phoenix, AZ', initial: 'L' },
  { text: '"Got the Dip Lovers Bundle delivered for game night — everyone asked where I bought it. Seed-oil free is a huge plus."', name: 'Daniel B.', loc: 'Tempe, AZ', initial: 'D' },
  { text: '"Fresh, local, and you can taste it. The cilantro hummus has the perfect amount of heat."', name: 'Priya N.', loc: 'Scottsdale, AZ', initial: 'P' },
];

const steps = [
  { n: '01', title: 'Order Online', desc: 'Browse and add fresh dips, hummus & lebneh to your order.' },
  { n: '02', title: 'Cutoff Sunday 9 PM', desc: 'Every week we take orders until Sunday at 9 PM, then we start making.' },
  { n: '03', title: 'We Make It Fresh', desc: 'After cutoff we make exactly what was ordered. Nothing sits on a shelf.' },
  { n: '04', title: 'Pick Up or Delivery', desc: 'Grab it at a farmers market or get it delivered Sat or Sun.' },
];

const TICKER_TEXT = '🫙 Fresh Hummus  ·  Stone-Ground Chickpeas  ·  Seed-Oil Free  ·  Phoenix Made  ·  Small Batch  ·  Vegan Options  ·  No Preservatives  ·  Made Weekly  ·  Farmers Market Fresh  ·';

// Curated Unsplash placeholder photos — replace with real brand photos
const igPhotos = [
  'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=600&q=80',
];

export default function HomePage() {
  return (
    <>
      {/* ── 1. HERO — full bleed photo ── */}
      <section className="relative h-[93vh] min-h-[600px] flex items-end overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1800&q=85"
          alt="Fresh hummus spread with olive oil"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Overlay: dark bottom fade + subtle top tint */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/88 via-ink/30 to-ink/10" />

        {/* Floating badge chips */}
        <div className="absolute top-6 left-6 flex gap-2 flex-wrap">
          <span className="bg-paper/90 backdrop-blur-sm text-ink text-[11.5px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full">Phoenix, AZ</span>
          <span className="bg-terracotta text-white text-[11.5px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full">Made Fresh Weekly</span>
        </div>

        {/* Main content */}
        <div className="relative w-full max-w-[1180px] mx-auto px-5 pb-16 md:pb-24">
          <p className="text-gold text-[13px] font-bold tracking-[.22em] uppercase mb-5">Small-batch · Seed-oil free · Arizona</p>
          <h1 className="font-serif text-[clamp(44px,7.5vw,96px)] font-semibold text-cream leading-[1.02] tracking-tight max-w-[820px]">
            Hummus & Lebneh
            <br />Made Fresh,
            <br /><em className="not-italic text-gold">Every Single Week.</em>
          </h1>
          <p className="text-cream/72 text-[18px] mt-5 mb-8 max-w-[500px] leading-relaxed">
            Order online for farmers market pickup or Maricopa County doorstep delivery. Made to order — never sitting on a shelf.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-terracotta text-white font-bold text-[16px] hover:bg-terra-dk active:scale-95 transition-all duration-150 select-none shadow-[0_16px_32px_-10px_rgba(201,150,63,.65)]"
            >
              Shop Now →
            </Link>
            <Link
              href="/markets"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-paper/12 backdrop-blur-sm border border-cream/30 text-cream font-semibold text-[16px] hover:bg-paper/22 active:scale-95 transition-all duration-150 select-none"
            >
              Find Us at Markets
            </Link>
          </div>

          {/* Stat pills */}
          <div className="flex gap-8 mt-10 flex-wrap">
            {[['13+', 'Fresh flavors'], ['5', 'AZ Markets'], ['$8', 'Per jar, flat']].map(([val, lbl]) => (
              <div key={lbl}>
                <div className="font-serif text-[30px] text-gold font-semibold leading-none">{val}</div>
                <div className="text-cream/60 text-[13px] mt-1">{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. MARQUEE TICKER ── */}
      <div className="bg-terracotta overflow-hidden py-3.5 select-none">
        <div className="ticker-track gap-10">
          {[TICKER_TEXT, TICKER_TEXT, TICKER_TEXT].map((t, i) => (
            <span key={i} className="text-[13px] font-bold tracking-widest uppercase text-white inline-block flex-shrink-0 pr-10">{t}</span>
          ))}
        </div>
      </div>

      {/* ── 3. CUTTING BOARD SHOP ── */}
      <section className="py-20 px-5">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="text-[12.5px] font-bold tracking-widest uppercase text-gold-dk mb-2">Made Fresh Weekly</div>
              <h2 className="font-serif text-[clamp(28px,4.4vw,46px)] font-semibold leading-tight">
                Hover &amp; Add to Your Order
              </h2>
            </div>
            <Link href="/checkout" className="text-[15px] font-semibold text-terracotta hover:text-terra-dk transition-colors whitespace-nowrap">
              Go to Checkout →
            </Link>
          </div>
          <CuttingBoard />
        </div>
      </section>

      {/* ── 4. BRAND STATEMENT — dark section ── */}
      <section className="relative overflow-hidden bg-ink text-cream py-24 px-5">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(55% 70% at 100% 0%, rgba(201,150,63,.14), transparent 55%)' }}
        />
        <div className="max-w-[1180px] mx-auto grid md:grid-cols-2 gap-14 items-center">
          <div>
            <p className="text-gold text-[12.5px] font-bold tracking-widest uppercase mb-5">What makes us different</p>
            <h2 className="font-serif text-[clamp(34px,5vw,62px)] font-semibold leading-[1.06] text-cream">
              Made fresh.<br />
              Never frozen.<br />
              <span className="text-gold">Never shelf-stable.</span>
            </h2>
            <Link href="/about" className="inline-flex items-center gap-2 mt-8 px-6 py-3.5 rounded-full border border-cream/30 text-cream font-semibold text-[15px] hover:bg-cream hover:text-ink active:scale-95 transition-all duration-150 select-none">
              Our Story
            </Link>
          </div>
          <div className="space-y-7">
            {[
              ['🌱', 'Seed-Oil Free', 'We use only olive oil — no canola, no soy, no seed oils. Your body will thank you.'],
              ['📅', 'Weekly Batches', 'Orders close Sunday at 9 PM. We make exactly what was ordered, nothing more.'],
              ['🫙', 'Real Ingredients', 'Stone-ground chickpeas, fresh lemon, quality tahini. No fillers, no shortcuts.'],
            ].map(([icon, title, desc]) => (
              <div key={title as string} className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-cream/8 flex items-center justify-center text-2xl flex-shrink-0">{icon}</div>
                <div>
                  <div className="font-semibold text-cream text-[16px] mb-1">{title as string}</div>
                  <p className="text-cream/58 text-[14.5px] leading-relaxed">{desc as string}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. HOW IT WORKS ── */}
      <section className="py-20 px-5 bg-cream-2">
        <div className="max-w-[1180px] mx-auto">
          <div className="text-center mb-12">
            <div className="text-[12.5px] font-bold tracking-widest uppercase text-gold-dk mb-3">The Process</div>
            <h2 className="font-serif text-[clamp(28px,4vw,44px)] font-semibold">Preorder. We Make It. You Enjoy It.</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-line rounded-[24px] overflow-hidden border border-line">
            {steps.map((s) => (
              <div key={s.n} className="bg-paper p-8">
                <div className="font-serif text-[54px] font-semibold text-cream-3 leading-none mb-4">{s.n}</div>
                <h3 className="font-serif text-[18px] font-semibold mb-2">{s.title}</h3>
                <p className="text-[14px] text-ink-soft leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. MARKETS SPLIT ── */}
      <section className="py-16 px-5">
        <div className="max-w-[1180px] mx-auto">
          <div className="grid md:grid-cols-2 rounded-[28px] overflow-hidden shadow-bowl">
            <div className="relative h-[420px] md:h-auto min-h-[440px]">
              <Image
                src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=900&q=80"
                alt="Arizona farmers market"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
            <div className="bg-cream-2 flex items-center p-10 md:p-14">
              <div>
                <div className="text-[12.5px] font-bold tracking-widest uppercase text-gold-dk mb-3">Farmers Market Pickup</div>
                <h2 className="font-serif text-[clamp(24px,3.5vw,38px)] font-semibold mb-4">Find Us at Your Local Market</h2>
                <p className="text-ink-soft text-[16px] mb-5 leading-relaxed">
                  Skip the delivery fee and say hi in person. Preorder online then pick up your fresh order at any of our Arizona farmers markets.
                </p>
                <ul className="space-y-2.5 mb-7">
                  {['Free pickup — no delivery charge', 'Order by Sunday 9 PM for that week', 'Meet the makers & try samples'].map((l) => (
                    <li key={l} className="flex gap-2.5 items-center text-[15px]">
                      <span className="w-5 h-5 rounded-full bg-terracotta/15 text-terracotta flex items-center justify-center text-[11px] font-bold flex-shrink-0">✓</span>
                      {l}
                    </li>
                  ))}
                </ul>
                <Link href="/markets" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-terracotta text-white font-semibold hover:bg-terra-dk active:scale-95 transition-all duration-150 select-none">
                  See Upcoming Markets
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. FULL-BLEED STORY QUOTE ── */}
      <section className="relative h-[540px] flex items-center justify-center text-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1800&q=80"
          alt="Fresh food being prepared"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-ink/72" />
        <div className="relative max-w-[740px] mx-auto px-6">
          <p className="text-gold text-[13px] font-bold tracking-[.22em] uppercase mb-6">Our Story</p>
          <blockquote className="font-serif text-[clamp(24px,4.2vw,50px)] font-semibold text-cream leading-[1.15]">
            &ldquo;Born in a home kitchen. Made with family recipes. Delivered fresh to Arizona.&rdquo;
          </blockquote>
          <div className="mt-8">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-cream/35 text-cream font-semibold text-[15px] hover:bg-cream hover:text-ink active:scale-95 transition-all duration-150 select-none"
            >
              Read Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* ── 8. DELIVERY SPLIT ── */}
      <section className="py-16 px-5">
        <div className="max-w-[1180px] mx-auto">
          <div className="grid md:grid-cols-2 rounded-[28px] overflow-hidden shadow-bowl">
            <div className="bg-olive flex items-center p-10 md:p-14 order-2 md:order-1">
              <div>
                <div className="text-[12.5px] font-bold tracking-widest uppercase text-gold mb-3">Local Delivery</div>
                <h2 className="font-serif text-[clamp(24px,3.5vw,38px)] font-semibold mb-4 text-cream">
                  Fresh to Your<br />Maricopa Door
                </h2>
                <p className="text-cream/68 text-[16px] mb-5 leading-relaxed">
                  Flat <strong className="text-cream">$9 delivery fee</strong> anywhere in Maricopa County. Order by Sunday and choose your Saturday or Sunday delivery.
                </p>
                <ul className="space-y-2.5 mb-7">
                  {['Maricopa County beta zone', 'Order cutoff every Sunday at 9 PM', 'Delivered cold & fresh on Sat or Sun'].map((l) => (
                    <li key={l} className="flex gap-2.5 items-center text-[15px] text-cream/80">
                      <span className="w-5 h-5 rounded-full bg-gold/20 text-gold flex items-center justify-center text-[11px] font-bold flex-shrink-0">✓</span>
                      {l}
                    </li>
                  ))}
                </ul>
                <Link href="/shop" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gold text-white font-semibold hover:bg-gold-dk active:scale-95 transition-all duration-150 select-none">
                  Order for Delivery
                </Link>
              </div>
            </div>
            <div className="relative h-[420px] md:h-auto min-h-[440px] order-1 md:order-2">
              <Image
                src="https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&w=900&q=80"
                alt="Mediterranean food spread"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 9. WHOLESALE CTA ── */}
      <section className="py-6 px-5">
        <div className="max-w-[1180px] mx-auto">
          <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#1c1408] to-ink text-cream px-10 py-16 text-center">
            <div className="absolute w-[420px] h-[420px] rounded-full bg-gold/12 -top-36 -right-20 pointer-events-none" />
            <div className="absolute w-[280px] h-[280px] rounded-full bg-gold/8 -bottom-16 -left-10 pointer-events-none" />
            <p className="relative text-gold text-[12.5px] font-bold tracking-widest uppercase mb-3">For Businesses</p>
            <h2 className="relative font-serif text-[clamp(26px,4vw,44px)] font-semibold mb-4">Carry Shaku Maku in Your Store</h2>
            <p className="relative max-w-[520px] mx-auto text-cream/68 text-[16.5px] mb-8">
              We partner with Arizona businesses for wholesale orders and weekly fresh production runs.
            </p>
            <Link href="/wholesale" className="relative inline-flex items-center gap-2 px-7 py-4 rounded-full bg-gold text-white font-bold hover:bg-gold-dk active:scale-95 transition-all duration-150 select-none">
              Become a Wholesale Partner
            </Link>
          </div>
        </div>
      </section>

      {/* ── 10. REVIEWS ── */}
      <section className="py-20 px-5">
        <div className="max-w-[1180px] mx-auto">
          <div className="text-center max-w-[620px] mx-auto mb-10">
            <div className="text-[12.5px] font-bold tracking-widest uppercase text-gold-dk mb-3">Loved Locally</div>
            <h2 className="font-serif text-[clamp(28px,4vw,44px)] font-semibold">What the Valley is Saying</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((r) => (
              <div key={r.name} className="bg-paper border border-line rounded-[20px] p-7 flex flex-col">
                <div className="text-gold tracking-[3px] mb-4 text-[12px]">★★★★★</div>
                <p className="font-serif text-[15.5px] italic text-ink leading-relaxed flex-1">{r.text}</p>
                <div className="flex items-center gap-3 mt-5 pt-5 border-t border-line">
                  <div className="w-10 h-10 rounded-full bg-terracotta/12 flex items-center justify-center font-bold text-terracotta text-[15px]">{r.initial}</div>
                  <div>
                    <div className="font-semibold text-sm">{r.name}</div>
                    <div className="text-ink-soft text-xs mt-0.5">{r.loc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 11. INSTAGRAM PHOTO GRID ── */}
      <section className="pb-20 px-5">
        <div className="max-w-[1180px] mx-auto">
          <div className="text-center mb-8">
            <div className="text-[12.5px] font-bold tracking-widest uppercase text-gold-dk mb-2">Follow Along</div>
            <h2 className="font-serif text-[clamp(26px,4vw,40px)] font-semibold">@shakumaku.az</h2>
            <p className="text-ink-soft mt-2 text-[16px]">This week&apos;s flavors, market days and behind-the-scenes.</p>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {igPhotos.map((src, i) => (
              <div key={i} className="relative rounded-xl overflow-hidden hover:scale-[1.04] transition-transform duration-200 cursor-pointer" style={{ aspectRatio: '1' }}>
                <Image
                  src={src}
                  alt={`Shaku Maku fresh food photo ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 33vw, 17vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          <div className="text-center mt-7">
            <a
              href="https://instagram.com/shakumaku.az"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border-[1.5px] border-ink text-ink font-semibold hover:bg-ink hover:text-cream active:scale-95 transition-all duration-150 select-none"
            >
              Follow @shakumaku.az
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
