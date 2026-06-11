import { NextResponse } from 'next/server';
import { updateOrderStatus } from '@/lib/store';

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const { status } = await req.json();
    const ok = updateOrderStatus(params.id, status);
    if (!ok) return NextResponse.json({ ok: false, error: 'Order not found' }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
