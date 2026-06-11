import { NextResponse } from 'next/server';
import { getOrders, addOrder } from '@/lib/store';
import type { Order } from '@/lib/data';

export async function GET() {
  return NextResponse.json(getOrders());
}

export async function POST(req: Request) {
  try {
    const order: Order = await req.json();
    addOrder(order);
    return NextResponse.json({ ok: true, id: order.id });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
