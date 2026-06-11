export type Badge = 'Vegan' | 'Seed-Oil Free' | 'Spicy' | 'Contains Dairy' | 'Limited Time' | 'Sold Out';
export type Category = 'Hummus & Dips' | 'Lebneh' | 'Bundles' | 'Seasonal';

export interface Product {
  id: string;
  name: string;
  cat: Category;
  size: string;
  price: number;
  desc: string;
  ingredients: string;
  allergens: string;
  storage: string;
  shelf: string;
  badges: Badge[];
  hidden: boolean;
}

export interface Market {
  id: string;
  name: string;
  date: string;
  day: string;
  time: string;
  address: string;
  cutoff: string;
  pickupOn: boolean;
  hidden: boolean;
}

export interface Order {
  id: string;
  name: string;
  email: string;
  phone: string;
  items: { id: string; qty: number }[];
  fulfill: 'pickup' | 'delivery';
  marketId: string;
  date: string;
  addr: string;
  fee: number;
  notes: string;
  status: string;
  placed: string;
}

export const CATEGORY_COLORS: Record<Category, [string, string]> = {
  'Hummus & Dips': ['#F2DC90', '#C9963F'],  // light gold → gold
  'Lebneh':        ['#F0DFA8', '#C9963F'],  // pale gold → gold
  'Bundles':       ['#E8D888', '#B89030'],  // warm gold → dark gold
  'Seasonal':      ['#1A1A1A', '#C9963F'],  // black → gold (dramatic)
};

export const PRODUCTS: Product[] = [
  {
    id: 'p1', name: 'Classic Hummus', cat: 'Hummus & Dips', size: '8 oz', price: 8,
    desc: 'Our signature stone-ground chickpea hummus — silky, lemony and bright.',
    ingredients: 'Chickpeas, tahini, lemon juice, olive oil, sea salt',
    allergens: 'Contains sesame (tahini). Made in a facility that handles dairy.',
    storage: 'Keep refrigerated at 34–40°F.', shelf: 'Best within 7 days of pickup/delivery.',
    badges: ['Vegan', 'Seed-Oil Free'], hidden: false,
  },
  {
    id: 'p2', name: 'Avocado Hummus', cat: 'Hummus & Dips', size: '8 oz', price: 8,
    desc: 'Creamy hummus blended with ripe avocado, cilantro and basil.',
    ingredients: 'Chickpeas, avocado, cilantro, basil, tahini, lemon juice, olive oil, sea salt',
    allergens: 'Contains sesame (tahini).',
    storage: 'Keep refrigerated at 34–40°F.', shelf: 'Best within 5 days — avocado is fresh!',
    badges: ['Vegan', 'Seed-Oil Free'], hidden: false,
  },
  {
    id: 'p3', name: 'Cilantro Hummus', cat: 'Hummus & Dips', size: '8 oz', price: 8,
    desc: 'A zesty, herb-forward hummus with a jalapeño kick.',
    ingredients: 'Chickpeas, cilantro, jalapeño, tahini, lemon juice, olive oil, sea salt',
    allergens: 'Contains sesame (tahini).',
    storage: 'Keep refrigerated at 34–40°F.', shelf: 'Best within 7 days.',
    badges: ['Vegan', 'Seed-Oil Free', 'Spicy'], hidden: false,
  },
  {
    id: 'p4', name: "The Mo's Mix", cat: 'Hummus & Dips', size: '8 oz', price: 8,
    desc: 'Our house garden blend — garlicky, green and packed with herbs.',
    ingredients: 'Chickpeas, garlic, cilantro, basil, spinach, tahini, lemon juice, olive oil, sea salt',
    allergens: 'Contains sesame (tahini).',
    storage: 'Keep refrigerated at 34–40°F.', shelf: 'Best within 7 days.',
    badges: ['Vegan', 'Seed-Oil Free'], hidden: false,
  },
  {
    id: 'p5', name: 'The Cali Dip', cat: 'Hummus & Dips', size: '8 oz', price: 8,
    desc: 'Sun-dried tomato and basil for a Mediterranean-meets-California vibe.',
    ingredients: 'Chickpeas, garlic, sun-dried tomato, basil, tahini, lemon juice, olive oil, sea salt',
    allergens: 'Contains sesame (tahini).',
    storage: 'Keep refrigerated at 34–40°F.', shelf: 'Best within 7 days.',
    badges: ['Vegan', 'Seed-Oil Free'], hidden: false,
  },
  {
    id: 'p6', name: 'Three Layer Dip', cat: 'Hummus & Dips', size: '8 oz', price: 8,
    desc: 'Layers of feta, pesto and sun-dried tomato — a crowd favorite.',
    ingredients: 'Feta cheese, pesto, sun-dried tomato, Italian seasoning, olive oil',
    allergens: 'Contains dairy & nuts (pesto).',
    storage: 'Keep refrigerated at 34–40°F.', shelf: 'Best within 6 days.',
    badges: ['Contains Dairy', 'Seed-Oil Free'], hidden: false,
  },
  {
    id: 'p7', name: 'Lemon Lebneh', cat: 'Lebneh', size: '8 oz', price: 8,
    desc: 'Thick, tangy strained yogurt brightened with fresh lemon.',
    ingredients: 'Pasteurized milk, lemon puree, probiotics',
    allergens: 'Contains dairy.',
    storage: 'Keep refrigerated at 34–40°F.', shelf: 'Best within 10 days.',
    badges: ['Contains Dairy', 'Seed-Oil Free'], hidden: false,
  },
  {
    id: 'p8', name: 'Mango Lebneh', cat: 'Lebneh', size: '8 oz', price: 8,
    desc: 'Velvety lebneh swirled with sweet ripe mango.',
    ingredients: 'Pasteurized milk, mango puree, probiotics',
    allergens: 'Contains dairy.',
    storage: 'Keep refrigerated at 34–40°F.', shelf: 'Best within 10 days.',
    badges: ['Contains Dairy', 'Seed-Oil Free'], hidden: false,
  },
  {
    id: 'p9', name: 'Strawberry Lebneh', cat: 'Lebneh', size: '8 oz', price: 8,
    desc: "Creamy lebneh with real strawberry — breakfast's best friend.",
    ingredients: 'Pasteurized milk, strawberry puree, probiotics',
    allergens: 'Contains dairy.',
    storage: 'Keep refrigerated at 34–40°F.', shelf: 'Best within 10 days.',
    badges: ['Contains Dairy', 'Seed-Oil Free'], hidden: false,
  },
  {
    id: 'p10', name: 'Blueberry Lebneh', cat: 'Lebneh', size: '8 oz', price: 8,
    desc: 'Lebneh folded with juicy blueberries. Lightly sweet, deeply good.',
    ingredients: 'Pasteurized milk, blueberry puree, probiotics',
    allergens: 'Contains dairy.',
    storage: 'Keep refrigerated at 34–40°F.', shelf: 'Best within 10 days.',
    badges: ['Contains Dairy', 'Seed-Oil Free'], hidden: false,
  },
  {
    id: 'p11', name: 'Pomegranate Lebneh', cat: 'Lebneh', size: '8 oz', price: 8,
    desc: 'Tart pomegranate meets silky lebneh — our seasonal star.',
    ingredients: 'Pasteurized milk, pomegranate puree, probiotics',
    allergens: 'Contains dairy.',
    storage: 'Keep refrigerated at 34–40°F.', shelf: 'Best within 10 days.',
    badges: ['Contains Dairy', 'Seed-Oil Free', 'Limited Time'], hidden: false,
  },
  {
    id: 'p12', name: 'Dip Lovers Bundle', cat: 'Bundles', size: '4 × 8 oz', price: 8,
    desc: 'Pick our four best-selling dips at a bundle price. Perfect for sharing.',
    ingredients: 'Includes Classic Hummus, Avocado Hummus, The Cali Dip & Three Layer Dip.',
    allergens: 'Contains sesame & dairy.',
    storage: 'Keep refrigerated at 34–40°F.', shelf: 'Best within 6 days.',
    badges: ['Seed-Oil Free'], hidden: false,
  },
  {
    id: 'p13', name: 'Lebneh Tasting Set', cat: 'Bundles', size: '4 × 8 oz', price: 8,
    desc: 'A flight of four fruit lebnehs — the sweetest way to start the week.',
    ingredients: 'Includes Lemon, Mango, Strawberry & Blueberry Lebneh.',
    allergens: 'Contains dairy.',
    storage: 'Keep refrigerated at 34–40°F.', shelf: 'Best within 10 days.',
    badges: ['Contains Dairy', 'Seed-Oil Free'], hidden: false,
  },
];

export const MARKETS: Market[] = [
  // ── Week 1 · Cutoff: Sunday June 14 by 9 PM ──
  {
    id: 'm1', name: 'Downtown Phoenix Farmers Market',
    date: '2026-06-20', day: 'Saturday', time: '8:00 AM – 1:00 PM',
    address: '721 N Central Ave, Phoenix, AZ 85004',
    cutoff: '2026-06-14T21:00', pickupOn: true, hidden: false,
  },
  {
    id: 'm2', name: 'Old Town Scottsdale Market',
    date: '2026-06-21', day: 'Sunday', time: '9:00 AM – 1:00 PM',
    address: '3806 N Brown Ave, Scottsdale, AZ 85251',
    cutoff: '2026-06-14T21:00', pickupOn: true, hidden: false,
  },
  // ── Week 2 · Cutoff: Sunday June 21 by 9 PM ──
  {
    id: 'm3', name: 'Gilbert Farmers Market',
    date: '2026-06-27', day: 'Saturday', time: '8:00 AM – 12:00 PM',
    address: '222 N Ash St, Gilbert, AZ 85234',
    cutoff: '2026-06-21T21:00', pickupOn: true, hidden: false,
  },
  {
    id: 'm4', name: 'Uptown Farmers Market',
    date: '2026-06-28', day: 'Sunday', time: '8:00 AM – 1:00 PM',
    address: '5757 N Central Ave, Phoenix, AZ 85012',
    cutoff: '2026-06-21T21:00', pickupOn: true, hidden: false,
  },
  // ── Week 3 · Cutoff: Sunday June 28 by 9 PM ──
  {
    id: 'm5', name: 'Tempe Sunday Market',
    date: '2026-07-05', day: 'Sunday', time: '9:00 AM – 1:00 PM',
    address: '520 S Mill Ave, Tempe, AZ 85281',
    cutoff: '2026-06-28T21:00', pickupOn: true, hidden: false,
  },
];

// Each week has three fulfillment options (Fri / Sat / Sun).
// All share the same Sunday-night cutoff for that week.
export const DELIVERY_DATES = [
  // ── Week 1 · Cutoff: Sunday June 14 by 9 PM ──
  { id: 'd1', label: 'Friday, June 19',   date: '2026-06-19', cutoff: '2026-06-14T21:00' },
  { id: 'd2', label: 'Saturday, June 20', date: '2026-06-20', cutoff: '2026-06-14T21:00' },
  { id: 'd3', label: 'Sunday, June 21',   date: '2026-06-21', cutoff: '2026-06-14T21:00' },
  // ── Week 2 · Cutoff: Sunday June 21 by 9 PM ──
  { id: 'd4', label: 'Friday, June 26',   date: '2026-06-26', cutoff: '2026-06-21T21:00' },
  { id: 'd5', label: 'Saturday, June 27', date: '2026-06-27', cutoff: '2026-06-21T21:00' },
  { id: 'd6', label: 'Sunday, June 28',   date: '2026-06-28', cutoff: '2026-06-21T21:00' },
  // ── Week 3 · Cutoff: Sunday June 28 by 9 PM ──
  { id: 'd7', label: 'Friday, July 3',    date: '2026-07-03', cutoff: '2026-06-28T21:00' },
  { id: 'd8', label: 'Saturday, July 4',  date: '2026-07-04', cutoff: '2026-06-28T21:00' },
  { id: 'd9', label: 'Sunday, July 5',    date: '2026-07-05', cutoff: '2026-06-28T21:00' },
];

export const SETTINGS = {
  deliveryFee: 9,
  deliveryZips: '85004, 85006, 85012, 85013, 85014, 85016, 85018, 85251, 85254, 85281',
  deliveryDays: 'Friday, Saturday & Sunday',
  orderCutoff: 'Sunday by 9:00 PM',
};

export function getProd(id: string) {
  return PRODUCTS.find((p) => p.id === id)!;
}

export function getMarket(id: string) {
  return MARKETS.find((m) => m.id === id);
}
