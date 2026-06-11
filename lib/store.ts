import type { Order } from './data';

// Global in-memory store — persists across requests within the same
// server process. Resets on redeploy (acceptable for weekly batch model).
declare global {
  // eslint-disable-next-line no-var
  var __smOrders: Order[] | undefined;
}

if (!global.__smOrders) global.__smOrders = [];

export function getOrders(): Order[] {
  return global.__smOrders!;
}

export function addOrder(order: Order): void {
  global.__smOrders!.unshift(order);
}

export function updateOrderStatus(id: string, status: string): boolean {
  const o = global.__smOrders!.find((x) => x.id === id);
  if (!o) return false;
  o.status = status;
  return true;
}
