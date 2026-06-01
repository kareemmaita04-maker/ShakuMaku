'use client';

import { useState } from 'react';

export default function WholesalePage() {
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <section className="py-14 px-5">
        <div className="max-w-[560px] mx-auto text-center bg-paper border border-line rounded-3xl p-12 shadow-card">
          <div className="w-20 h-20 rounded-full bg-olive/12 flex items-center justify-center mx-auto mb-5 text-4xl">✓</div>
          <h2 className="font-serif text-[28px] font-semibold">Wholesale inquiry received!</h2>
          <p className="text-ink-soft mt-3 mb-6">Thanks for your interest in carrying Shaku Maku. Our team will reach out within 1–2 business days.</p>
          <button onClick={() => setDone(false)} className="px-6 py-3.5 rounded-full bg-terracotta text-white font-semibold hover:bg-terra-dk active:scale-95 transition-all duration-150 select-none">
            Back to Wholesale
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-14 px-5">
      <div className="max-w-[1180px] mx-auto">
        <div className="text-center max-w-[680px] mx-auto mb-10">
          <div className="text-[13px] font-bold tracking-widest uppercase text-gold-dk mb-3">For Stores, Cafes, Gyms & More</div>
          <h1 className="font-serif text-[clamp(34px,5vw,52px)] font-semibold">Carry Shaku Maku in Your Store</h1>
          <p className="text-ink-soft mt-3.5 text-[17px]">Interested in offering fresh local hummus, dips, or lebneh to your customers? Shaku Maku partners with local Arizona businesses for wholesale orders, samples, and weekly fresh production.</p>
        </div>

        <div className="bg-paper border border-line rounded-3xl p-8 max-w-[760px] mx-auto shadow-card">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { id: 'business', label: 'Business name *', placeholder: 'Your business' },
              { id: 'contact', label: 'Contact name *', placeholder: 'Your name' },
              { id: 'email', label: 'Email *', placeholder: 'you@business.com', type: 'email' },
              { id: 'phone', label: 'Phone number *', placeholder: '(602) 555-0100' },
              { id: 'address', label: 'Business address', placeholder: 'Street, City, AZ ZIP' },
            ].map((f) => (
              <div key={f.id} className={f.id === 'address' ? 'sm:col-span-2' : ''}>
                <label className="block text-[13px] font-semibold text-ink-soft mb-1.5">{f.label}</label>
                <input
                  type={f.type ?? 'text'}
                  placeholder={f.placeholder}
                  className="w-full px-3.5 py-3 rounded-xl border-[1.5px] border-line bg-cream text-ink text-sm focus:border-terracotta focus:ring-2 focus:ring-terracotta/10 outline-none transition-all"
                />
              </div>
            ))}
            <div>
              <label className="block text-[13px] font-semibold text-ink-soft mb-1.5">Business type</label>
              <select className="w-full px-3.5 py-3 rounded-xl border-[1.5px] border-line bg-cream text-ink text-sm focus:border-terracotta outline-none transition-all">
                {['Cafe', 'Restaurant', 'Gym', 'Specialty Market', 'Grocery / Retailer', 'Other'].map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[13px] font-semibold text-ink-soft mb-1.5">Preferred contact method</label>
              <select className="w-full px-3.5 py-3 rounded-xl border-[1.5px] border-line bg-cream text-ink text-sm focus:border-terracotta outline-none transition-all">
                {['Email', 'Phone', 'Text'].map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-[13px] font-semibold text-ink-soft mb-1.5">Products interested in</label>
              <input
                placeholder="e.g. Classic Hummus, Lebneh line"
                className="w-full px-3.5 py-3 rounded-xl border-[1.5px] border-line bg-cream text-ink text-sm focus:border-terracotta focus:ring-2 focus:ring-terracotta/10 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-[13px] font-semibold text-ink-soft mb-1.5">Estimated weekly quantity</label>
              <input
                placeholder="e.g. 40 units / week"
                className="w-full px-3.5 py-3 rounded-xl border-[1.5px] border-line bg-cream text-ink text-sm focus:border-terracotta focus:ring-2 focus:ring-terracotta/10 outline-none transition-all"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-[13px] font-semibold text-ink-soft mb-1.5">Message</label>
              <textarea
                rows={3}
                placeholder="Tell us about your store and customers"
                className="w-full px-3.5 py-3 rounded-xl border-[1.5px] border-line bg-cream text-ink text-sm focus:border-terracotta focus:ring-2 focus:ring-terracotta/10 outline-none transition-all resize-none"
              />
            </div>
            <div className="sm:col-span-2 flex items-center gap-2.5">
              <input type="checkbox" id="samples" className="w-4 h-4 accent-terracotta" />
              <label htmlFor="samples" className="text-sm cursor-pointer">Yes, I&apos;d like to receive free samples</label>
            </div>
          </div>
          <button
            onClick={() => setDone(true)}
            className="mt-6 w-full py-3.5 rounded-full bg-terracotta text-white font-semibold hover:bg-terra-dk active:scale-[.98] transition-all duration-150 select-none"
          >
            Submit Wholesale Inquiry
          </button>
        </div>
      </div>
    </section>
  );
}
