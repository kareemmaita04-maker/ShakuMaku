import { PRODUCTS, type Category } from '@/lib/data';

const BADGE_COLORS: Record<string, string> = {
  'Vegan':          'bg-green-50 text-green-700',
  'Seed-Oil Free':  'bg-blue-50 text-blue-700',
  'Spicy':          'bg-red-50 text-red-600',
  'Contains Dairy': 'bg-amber-50 text-amber-700',
  'Limited Time':   'bg-purple-50 text-purple-700',
  'Sold Out':       'bg-[#F4F4F5] text-ink-soft',
};

const CATEGORIES: Category[] = ['Hummus & Dips', 'Lebneh', 'Bundles'];

export default function ProductsPage() {
  const activeCount = PRODUCTS.filter((p) => !p.hidden && !p.badges.includes('Sold Out')).length;
  const soldOutCount = PRODUCTS.filter((p) => p.badges.includes('Sold Out')).length;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-serif text-[30px] font-semibold text-ink">Product Catalog</h1>
        <p className="text-ink-soft mt-1">All products grouped by category.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-2xl border border-[#E4E4E7] p-5 shadow-sm text-center">
          <div className="font-serif text-[34px] font-bold text-green-600 leading-none">{activeCount}</div>
          <div className="text-sm font-semibold text-ink mt-1">Active</div>
        </div>
        <div className="bg-white rounded-2xl border border-[#E4E4E7] p-5 shadow-sm text-center">
          <div className="font-serif text-[34px] font-bold text-red-500 leading-none">{soldOutCount}</div>
          <div className="text-sm font-semibold text-ink mt-1">Sold Out</div>
        </div>
        <div className="bg-white rounded-2xl border border-[#E4E4E7] p-5 shadow-sm text-center">
          <div className="font-serif text-[34px] font-bold text-ink leading-none">{PRODUCTS.length}</div>
          <div className="text-sm font-semibold text-ink mt-1">Total SKUs</div>
        </div>
      </div>

      {/* Per-category tables */}
      <div className="space-y-8">
        {CATEGORIES.map((cat) => {
          const items = PRODUCTS.filter((p) => p.cat === cat);
          return (
            <div key={cat} className="bg-white rounded-2xl border border-[#E4E4E7] shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-[#F0F0F1] flex items-center justify-between bg-[#FAFAFA]">
                <h2 className="font-serif text-[18px] font-semibold text-ink">{cat}</h2>
                <span className="text-xs font-semibold text-ink-soft bg-[#F0F0F1] px-3 py-1.5 rounded-full">
                  {items.length} items
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#F0F0F1] text-left text-[11px] font-bold uppercase tracking-wide text-ink-soft">
                      <th className="px-6 py-3">Product</th>
                      <th className="px-6 py-3">Size</th>
                      <th className="px-6 py-3 text-right">Price</th>
                      <th className="px-6 py-3">Shelf Life</th>
                      <th className="px-6 py-3">Badges</th>
                      <th className="px-6 py-3 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((p, i) => (
                      <tr key={p.id} className={`border-b border-[#F0F0F1] last:border-0 text-sm ${i % 2 !== 0 ? 'bg-[#FAFAFA]' : ''}`}>
                        <td className="px-6 py-4">
                          <div className="font-semibold text-ink">{p.name}</div>
                          <div className="text-xs text-ink-soft mt-0.5 max-w-[220px] truncate">{p.desc}</div>
                        </td>
                        <td className="px-6 py-4 text-ink-soft">{p.size}</td>
                        <td className="px-6 py-4 text-right font-bold text-green-700">${p.price}</td>
                        <td className="px-6 py-4 text-ink-soft text-xs max-w-[140px]">{p.shelf}</td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {p.badges.map((b) => (
                              <span key={b} className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${BADGE_COLORS[b] ?? 'bg-[#F4F4F5] text-ink-soft'}`}>
                                {b}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          {p.badges.includes('Sold Out') ? (
                            <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-red-50 text-red-500">Sold Out</span>
                          ) : p.hidden ? (
                            <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-[#F4F4F5] text-ink-soft">Hidden</span>
                          ) : (
                            <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-green-50 text-green-700">Active</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
