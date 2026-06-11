import { NextResponse } from 'next/server';
import { getOrders, addOrder } from '@/lib/store';
import { SETTINGS } from '@/lib/data';
import type { Order } from '@/lib/data';

export async function GET() {
  return NextResponse.json(getOrders());
}

export async function POST(req: Request) {
  try {
    const order: Order = await req.json();
    const totalQty = order.items.reduce((s, i) => s + i.qty, 0);
    if (totalQty < SETTINGS.minOrder) {
      return NextResponse.json({ ok: false, error: `Minimum ${SETTINGS.minOrder} items required` }, { status: 400 });
    }
    addOrder(order);
    return NextResponse.json({ ok: true, id: order.id });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
