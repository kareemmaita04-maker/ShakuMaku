'use client';

import { useState } from 'react';

const eventTypes = ['🎉 Parties', '👨‍👩‍👧 Family Gatherings', '🏢 Office Events', '🍱 Corporate Lunches', '🏘 Community Events', '💪 Gyms & Cafes'];

export default function BulkPage() {
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <section className="py-14 px-5">
        <div className="max-w-[560px] mx-auto text-center bg-paper border border-line rounded-3xl p-12 shadow-card">
          <div className="w-20 h-20 rounded-full bg-olive/12 flex items-center justify-center mx-auto mb-5 text-4xl">✓</div>
          <h2 className="font-serif text-[28px] font-semibold">Catering request received!</h2>
          <p className="text-ink-soft mt-3 mb-6">We&apos;ll put together a quote and get back to you shortly. Can&apos;t wait to feed your crowd!</p>
          <button onClick={() => setDone(false)} className="px-6 py-3.5 rounded-full bg-terracotta text-white font-semibold hover:bg-terra-dk active:scale-95 transition-all duration-150 select-none">
            Submit Another
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-14 px-5">
      <div className="max-w-[1180px] mx-auto">
        <div className="text-center max-w-[680px] mx-auto mb-10">
          <div className="text-[13px] font-bold tracking-widest uppercase text-gold-dk mb-3">Parties · Offices · Events</div>
          <h1 className="font-serif text-[clamp(34px,5vw,52px)] font-semibold">Bulk Orders & Catering</h1>
          <p className="text-ink-soft mt-3.5 text-[17px]">Feeding a crowd? We cater fresh hummus, dips and lebneh for all kinds of Arizona events.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {eventTypes.map((t) => (
            <div key={t} className="bg-paper border border-line rounded-2xl px-4 py-4 text-center font-semibold text-sm text-ink">
              {t}
            </div>
          ))}
        </div>

        <div className="bg-paper border border-line rounded-3xl p-8 max-w-[760px] mx-auto shadow-card">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { id: 'name', label: 'Name *', placeholder: '' },
              { id: 'email', label: 'Email *', placeholder: '', type: 'email' },
              { id: 'phone', label: 'Phone number *', placeholder: '' },
              { id: 'date', label: 'Event date', placeholder: '', type: 'date' },
              { id: 'people', label: 'Number of people', placeholder: 'e.g. 40', type: 'number' },
            ].map((f) => (
              <div key={f.id}>
                <label className="block text-[13px] font-semibold text-ink-soft mb-1.5">{f.label}</label>
                <input
                  type={f.type ?? 'text'}
                  placeholder={f.placeholder}
                  className="w-full px-3.5 py-3 rounded-xl border-[1.5px] border-line bg-cream text-ink text-sm focus:border-terracotta focus:ring-2 focus:ring-terracotta/10 outline-none transition-all"
                />
              </div>
            ))}
            <div>
              <label className="block text-[13px] font-semibold text-ink-soft mb-1.5">Pickup or delivery preference</label>
              <select className="w-full px-3.5 py-3 rounded-xl border-[1.5px] border-line bg-cream text-ink text-sm focus:border-terracotta outline-none transition-all">
                {['Delivery', 'Pickup', 'Not sure yet'].map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-[13px] font-semibold text-ink-soft mb-1.5">Products interested in</label>
              <input
                placeholder="e.g. Assorted hummus platters, lebneh trio"
                className="w-full px-3.5 py-3 rounded-xl border-[1.5px] border-line bg-cream text-ink text-sm focus:border-terracotta focus:ring-2 focus:ring-terracotta/10 outline-none transition-all"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-[13px] font-semibold text-ink-soft mb-1.5">Notes</label>
              <textarea
                rows={3}
                placeholder="Tell us about your event"
                className="w-full px-3.5 py-3 rounded-xl border-[1.5px] border-line bg-cream text-ink text-sm focus:border-terracotta focus:ring-2 focus:ring-terracotta/10 outline-none transition-all resize-none"
              />
            </div>
          </div>
          <button
            onClick={() => setDone(true)}
            className="mt-6 w-full py-3.5 rounded-full bg-terracotta text-white font-semibold hover:bg-terra-dk active:scale-[.98] transition-all duration-150 select-none"
          >
            Request a Catering Quote
          </button>
        </div>
      </div>
    </section>
  );
}
