import Link from 'next/link';
import { HeroCarousel } from '@/components/home/HeroCarousel';
import { ProductCard } from '@/components/products/ProductCard';
import { BowlSVG } from '@/components/ui/BowlSVG';
import { PRODUCTS } from '@/lib/data';

const featured = PRODUCTS.filter((p) => ['p1', 'p2', 'p8', 'p9'].includes(p.id));

const reviews = [
  { text: '"The mango lebneh is unreal. I preorder every single week and pick up at the Downtown market."', name: 'Layla H.', loc: 'Phoenix, AZ', initial: 'L' },
  { text: '"Got the Dip Lovers Bundle delivered for game night — everyone asked where I bought it. Seed-oil free is a huge plus."', name: 'Daniel B.', loc: 'Tempe, AZ', initial: 'D' },
  { text: '"Fresh, local, and you can taste it. The cilantro hummus has the perfect amount of heat."', name: 'Priya N.', loc: 'Scottsdale, AZ', initial: 'P' },
];

const steps = [
  { n: '1', icon: '🛒', title: 'Order Online', desc: 'Browse the shop and add fresh dips, hummus & lebneh to your order.' },
  { n: '2', icon: '📍', title: 'Pick Pickup or Delivery', desc: 'Choose a farmers market pickup or Phoenix-area doorstep delivery.' },
  { n: '3', icon: '👨‍🍳', title: 'We Make It Fresh', desc: 'After Sunday\'s cutoff we make exactly what was ordered — nothing sits on a shelf.' },
  { n: '4', icon: '🎉', title: 'Enjoy', desc: 'Grab it at the market or have it delivered refrigerated on your chosen Friday, Saturday, or Sunday.' },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative px-5 py-16 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(60% 80% at 88% 10%, rgba(201,150,63,.22), transparent 60%), radial-gradient(50% 70% at 6% 92%, rgba(0,0,0,.04), transparent 60%)',
          }}
        />
        <div className="max-w-[1180px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 text-[13px] font-bold tracking-widest uppercase text-terracotta mb-5">
              <span className="w-6 h-[1.5px] bg-terracotta" />
              Made fresh · Phoenix, Arizona
            </span>
            <h1 className="font-serif text-[clamp(40px,6.2vw,68px)] font-semibold leading-[1.08] tracking-tight">
              Fresh Local Hummus, Dips &{' '}
              <em className="not-italic text-terracotta font-medium">Lebneh</em>{' '}
              in Arizona
            </h1>
            <p className="text-[18.5px] text-ink-soft mt-5 mb-8 max-w-[480px] leading-relaxed">
              Order online for farmers market pickup or Phoenix-area doorstep delivery. Made fresh for each weekly preorder.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/shop" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-terracotta text-white font-semibold hover:bg-terra-dk active:scale-95 transition-all duration-150 select-none shadow-[0_10px_22px_-12px_rgba(190,84,54,.9)]">
                Shop Now
              </Link>
              <Link href="/markets" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border-[1.5px] border-ink text-ink font-semibold hover:bg-ink hover:text-cream active:scale-95 transition-all duration-150 select-none">
                Find Us at Markets
              </Link>
              <Link href="/wholesale" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gold text-white font-semibold hover:bg-gold-dk active:scale-95 transition-all duration-150 select-none">
                Carry Us in Your Store
              </Link>
            </div>
            <div className="flex gap-7 mt-9 flex-wrap">
              {[['13+', 'Fresh flavors'], ['5', 'Local markets'], ['Sun', 'Weekly cutoff']].map(([val, lbl]) => (
                <div key={lbl} className="text-sm text-ink-soft">
                  <div className="font-serif text-[25px] text-ink font-semibold leading-none">{val}</div>
                  {lbl}
                </div>
              ))}
            </div>
          </div>
          <HeroCarousel />
        </div>
      </section>

      {/* Featured products */}
      <section className="py-16 px-5">
        <div className="max-w-[1180px] mx-auto">
          <div className="text-center max-w-[620px] mx-auto mb-10">
            <div className="text-[13px] font-bold tracking-widest uppercase text-gold-dk mb-3">Customer Favorites</div>
            <h2 className="font-serif text-[clamp(30px,4.4vw,44px)] font-semibold">Featured This Week</h2>
            <p className="text-ink-soft mt-3.5 text-[17px]">Small batches, big flavor. Add your favorites and pick your pickup or delivery date at checkout.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((p) => <ProductCard key={p.id} p={p} />)}
          </div>
          <div className="text-center mt-9">
            <Link href="/shop" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border-[1.5px] border-ink text-ink font-semibold hover:bg-ink hover:text-cream active:scale-95 transition-all duration-150 select-none">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-5 bg-cream-2">
        <div className="max-w-[1180px] mx-auto">
          <div className="text-center max-w-[620px] mx-auto mb-10">
            <div className="text-[13px] font-bold tracking-widest uppercase text-gold-dk mb-3">How It Works</div>
            <h2 className="font-serif text-[clamp(30px,4.4vw,44px)] font-semibold">Preorder, We Make It Fresh</h2>
            <p className="text-ink-soft mt-3.5 text-[17px]">Everything is made to order each week — choose what you want and when you&apos;ll get it.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((s) => (
              <div key={s.n} className="relative bg-paper border border-line rounded-[18px] p-6">
                <div className="font-serif text-[46px] font-semibold text-cream-3 leading-none">{s.n}</div>
                <span className="absolute top-6 right-6 text-[26px]">{s.icon}</span>
                <h3 className="font-serif text-xl font-semibold mt-1.5 mb-2">{s.title}</h3>
                <p className="text-sm text-ink-soft">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Markets split */}
      <section className="py-16 px-5">
        <div className="max-w-[1180px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-[13px] font-bold tracking-widest uppercase text-gold-dk mb-3">Farmers Market Pickup</div>
            <h2 className="font-serif text-[clamp(28px,4vw,40px)] font-semibold mb-2">Find Us at Your Local Market</h2>
            <p className="text-ink-soft text-[16.5px] mb-3">Skip the fee and say hi! Preorder online, then grab your fresh order at any of our Arizona farmers markets.</p>
            <ul className="space-y-2 mb-6">
              {['Free pickup — no delivery charge', 'Order by Sunday 9 PM for that week\'s markets', 'Meet the makers and try samples'].map((l) => (
                <li key={l} className="flex gap-3 items-start text-[15.5px]">
                  <span className="text-terracotta text-xs mt-1">✦</span> {l}
                </li>
              ))}
            </ul>
            <Link href="/markets" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-terracotta text-white font-semibold hover:bg-terra-dk active:scale-95 transition-all duration-150 select-none">
              See Upcoming Markets
            </Link>
          </div>
          <div className="rounded-[26px] overflow-hidden shadow-bowl" style={{ aspectRatio: '5/4' }}>
            <BowlSVG c1="#E8D888" c2="#B89030" id="home-mkt" />
          </div>
        </div>
      </section>

      {/* Delivery split */}
      <section className="py-16 px-5 bg-cream-2">
        <div className="max-w-[1180px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="rounded-[26px] overflow-hidden shadow-bowl md:order-first order-last" style={{ aspectRatio: '5/4' }}>
            <BowlSVG c1="#F2DC90" c2="#C9963F" id="home-del" />
          </div>
          <div>
            <div className="text-[13px] font-bold tracking-widest uppercase text-gold-dk mb-3">Local Delivery</div>
            <h2 className="font-serif text-[clamp(28px,4vw,40px)] font-semibold mb-2">Doorstep Delivery, Phoenix-Area</h2>
            <p className="text-ink-soft text-[16.5px] mb-3">Local doorstep delivery for a flat <strong>$9 fee</strong>. Order by <strong>Sunday 9 PM</strong> and choose your delivery day at checkout.</p>
            <ul className="space-y-2 mb-6">
              {['Order cutoff: every Sunday by 9 PM', 'Delivered cold & fresh on Fri, Sat, or Sun', 'Flat $9 fee anywhere in our delivery zone'].map((l) => (
                <li key={l} className="flex gap-3 items-start text-[15.5px]">
                  <span className="text-terracotta text-xs mt-1">✦</span> {l}
                </li>
              ))}
            </ul>
            <Link href="/shop" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-terracotta text-white font-semibold hover:bg-terra-dk active:scale-95 transition-all duration-150 select-none">
              Order for Delivery
            </Link>
          </div>
        </div>
      </section>

      {/* Wholesale CTA */}
      <section className="py-16 px-5">
        <div className="max-w-[1180px] mx-auto">
          <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-olive to-olive-dk text-cream px-12 py-14 text-center">
            <div className="absolute w-96 h-96 rounded-full bg-gold/18 -top-40 -right-28 pointer-events-none" />
            <h2 className="relative font-serif text-[clamp(28px,4vw,42px)] font-semibold text-cream">Carry Shaku Maku in Your Store</h2>
            <p className="relative max-w-[540px] mx-auto mt-3.5 mb-7 opacity-92 text-[17px]">Interested in offering fresh local hummus, dips, or lebneh to your customers? We partner with local Arizona businesses for wholesale orders and weekly fresh production.</p>
            <Link href="/wholesale" className="relative inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gold text-white font-semibold hover:bg-gold-dk active:scale-95 transition-all duration-150 select-none">
              Become a Wholesale Partner
            </Link>
          </div>
        </div>
      </section>

      {/* Our Story snippet */}
      <section className="py-16 px-5 bg-cream-2">
        <div className="max-w-[1180px] mx-auto text-center">
          <div className="text-[13px] font-bold tracking-widest uppercase text-gold-dk mb-3">Our Story</div>
          <h2 className="font-serif text-[clamp(30px,4.4vw,44px)] font-semibold max-w-[560px] mx-auto">Born in a Home Kitchen, Made for Arizona</h2>
          <p className="text-ink-soft mt-4 text-[17px] max-w-[640px] mx-auto">Shaku Maku started with a family recipe, a love of fresh ingredients, and a simple idea: hummus and lebneh taste better when they&apos;re made fresh and made local.</p>
          <div className="mt-8">
            <Link href="/about" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border-[1.5px] border-ink text-ink font-semibold hover:bg-ink hover:text-cream active:scale-95 transition-all duration-150 select-none">
              Read Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-16 px-5">
        <div className="max-w-[1180px] mx-auto">
          <div className="text-center max-w-[620px] mx-auto mb-10">
            <div className="text-[13px] font-bold tracking-widest uppercase text-gold-dk mb-3">Loved Locally</div>
            <h2 className="font-serif text-[clamp(30px,4.4vw,44px)] font-semibold">What the Valley is Saying</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((r) => (
              <div key={r.name} className="bg-paper border border-line rounded-[18px] p-6">
                <div className="text-gold tracking-[2px] mb-3">★★★★★</div>
                <p className="font-serif text-[15.5px] italic text-ink leading-snug">{r.text}</p>
                <div className="flex items-center gap-3 mt-4">
                  <div className="w-10 h-10 rounded-full bg-cream-3 flex items-center justify-center font-bold text-terracotta">{r.initial}</div>
                  <div>
                    <div className="font-semibold text-sm">{r.name}</div>
                    <div className="text-ink-soft text-xs">{r.loc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram placeholder */}
      <section className="py-16 px-5 pb-4">
        <div className="max-w-[1180px] mx-auto">
          <div className="text-center mb-6">
            <div className="text-[13px] font-bold tracking-widest uppercase text-gold-dk mb-2">@shakumaku.az</div>
            <h2 className="font-serif text-[clamp(30px,4.4vw,44px)] font-semibold">Follow the Fresh Batches</h2>
            <p className="text-ink-soft mt-2 text-[17px]">See this week&apos;s flavors, market days and behind-the-scenes on Instagram.</p>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2.5 mt-4">
            {[
              ['#F2DC90','#C9963F'], ['#F0DFA8','#C9963F'], ['#E8D888','#B89030'],
              ['#1A1A1A','#C9963F'], ['#F2DC90','#A87A2B'], ['#E0D080','#C9963F'],
            ].map(([a, b], i) => (
              <div key={i} className="rounded-xl overflow-hidden cursor-pointer hover:scale-[1.04] transition-transform duration-200" style={{ aspectRatio: '1' }}>
                <BowlSVG c1={a} c2={b} id={`ig-${i}`} />
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <a href="#" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border-[1.5px] border-ink text-ink font-semibold hover:bg-ink hover:text-cream active:scale-95 transition-all duration-150 select-none">
              📷 Follow @shakumaku.az
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
