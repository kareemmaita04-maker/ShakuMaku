'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <section className="py-14 px-5">
        <div className="max-w-[560px] mx-auto text-center bg-paper border border-line rounded-3xl p-12 shadow-card">
          <div className="w-20 h-20 rounded-full bg-olive/12 flex items-center justify-center mx-auto mb-5 text-4xl">✓</div>
          <h2 className="font-serif text-[28px] font-semibold">Message sent!</h2>
          <p className="text-ink-soft mt-3 mb-6">Thanks for reaching out — we&apos;ll reply to your email soon.</p>
          <button onClick={() => setDone(false)} className="px-6 py-3.5 rounded-full bg-terracotta text-white font-semibold hover:bg-terra-dk active:scale-95 transition-all duration-150 select-none">
            Send Another
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-14 px-5">
      <div className="max-w-[920px] mx-auto">
        <div className="text-center max-w-[680px] mx-auto mb-10">
          <div className="text-[13px] font-bold tracking-widest uppercase text-gold-dk mb-3">Say Hello</div>
          <h1 className="font-serif text-[clamp(34px,5vw,52px)] font-semibold">Get in Touch</h1>
          <p className="text-ink-soft mt-3.5 text-[17px]">Questions about an order, a market, delivery, wholesale or catering? Drop us a note.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-8">
          <div className="flex flex-col gap-4">
            {[
              { icon: '📷', label: 'Instagram', val: '@shakumaku.az', href: '#' },
              { icon: '✉️', label: 'Email', val: 'hello@shakumaku.com', href: 'mailto:hello@shakumaku.com' },
              { icon: '📞', label: 'Phone', val: '(602) 555-0199', href: 'tel:+16025550199' },
            ].map((c) => (
              <div key={c.label} className="bg-paper border border-line rounded-2xl p-5">
                <div className="text-[22px]">{c.icon}</div>
                <div className="font-semibold mt-1.5">{c.label}</div>
                <a href={c.href} className="text-terracotta text-sm hover:underline">{c.val}</a>
              </div>
            ))}
          </div>

          <div className="bg-paper border border-line rounded-3xl p-7 shadow-card">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: 'Name *', placeholder: '' },
                { label: 'Email *', placeholder: '', type: 'email' },
              ].map((f) => (
                <div key={f.label}>
                  <label className="block text-[13px] font-semibold text-ink-soft mb-1.5">{f.label}</label>
                  <input type={f.type ?? 'text'} className="w-full px-3.5 py-3 rounded-xl border-[1.5px] border-line bg-cream text-ink text-sm focus:border-terracotta focus:ring-2 focus:ring-terracotta/10 outline-none transition-all" />
                </div>
              ))}
              <div className="sm:col-span-2">
                <label className="block text-[13px] font-semibold text-ink-soft mb-1.5">Inquiry type</label>
                <select className="w-full px-3.5 py-3 rounded-xl border-[1.5px] border-line bg-cream text-ink text-sm focus:border-terracotta outline-none transition-all">
                  {['General question', 'Farmers market pickup', 'Delivery question', 'Wholesale', 'Bulk order / catering'].map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-[13px] font-semibold text-ink-soft mb-1.5">Message *</label>
                <textarea rows={5} className="w-full px-3.5 py-3 rounded-xl border-[1.5px] border-line bg-cream text-ink text-sm focus:border-terracotta focus:ring-2 focus:ring-terracotta/10 outline-none transition-all resize-none" />
              </div>
            </div>
            <button
              onClick={() => setDone(true)}
              className="mt-5 w-full py-3.5 rounded-full bg-terracotta text-white font-semibold hover:bg-terra-dk active:scale-[.98] transition-all duration-150 select-none"
            >
              Send Message
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
