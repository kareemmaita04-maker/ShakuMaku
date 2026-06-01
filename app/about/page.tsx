import Link from 'next/link';
import { BowlSVG } from '@/components/ui/BowlSVG';

export default function AboutPage() {
  return (
    <section className="py-14 px-5">
      <div className="max-w-[760px] mx-auto">
        <div className="text-center mb-10">
          <div className="text-[13px] font-bold tracking-widest uppercase text-gold-dk mb-3">Our Story</div>
          <h1 className="font-serif text-[clamp(34px,5vw,52px)] font-semibold">Fresh, Local, Made With Love</h1>
        </div>

        <div className="rounded-3xl overflow-hidden shadow-bowl mb-9" style={{ aspectRatio: '16/8' }}>
          <BowlSVG c1="#E8D49A" c2="#BE5436" id="about-hero" />
        </div>

        <div className="text-[18px] text-ink-soft leading-[1.75] space-y-5">
          <p>
            Shaku Maku is a local Arizona food business making fresh hummus, dips and lebneh in small batches.
            The name is a friendly Arabic greeting — <em className="text-ink">&#34;what&apos;s up?&#34;</em> — and that&apos;s exactly the spirit we bring to every market table and doorstep.
          </p>
          <p>
            It started in a home kitchen with a family recipe and a belief that food tastes better when it&apos;s made fresh and made local. We don&apos;t keep shelves stacked with product sitting around. Instead, we plan production around what our community preorders each week — so everything you get was made just for you, just before you get it.
          </p>
          <p>
            We keep our ingredients simple and clean: real chickpeas, good olive oil, fresh herbs, and fruit purees with no seed oils. Whether you find us at a Phoenix-area farmers market or we deliver to your door, we&apos;re proud to be part of your table.
          </p>
          <p>So — <em className="text-ink">shaku maku?</em> Come say hi and grab something fresh.</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-12">
          {[['Small', 'Batch made every week'], ['Local', 'Arizona owned & operated'], ['Fresh', 'Made for your order, not the shelf']].map(([val, desc]) => (
            <div key={val} className="text-center">
              <div className="font-serif text-[38px] text-terracotta font-semibold">{val}</div>
              <p className="text-ink-soft text-sm">{desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/shop" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-terracotta text-white font-semibold hover:bg-terra-dk active:scale-95 transition-all duration-150 select-none">
            Shop Fresh
          </Link>
        </div>
      </div>
    </section>
  );
}
