'use client';

import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useState,
  type ReactNode,
} from 'react';
import { getProd } from './data';

export interface CartItem {
  productId: string;
  qty: number;
}

interface CartState {
  items: CartItem[];
  drawerOpen: boolean;
}

type Action =
  | { type: 'ADD'; productId: string; qty?: number }
  | { type: 'REMOVE'; productId: string }
  | { type: 'SET_QTY'; productId: string; qty: number }
  | { type: 'OPEN_DRAWER' }
  | { type: 'CLOSE_DRAWER' }
  | { type: 'CLEAR' };

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case 'ADD': {
      const qty = action.qty ?? 1;
      const existing = state.items.find((i) => i.productId === action.productId);
      return {
        ...state,
        items: existing
          ? state.items.map((i) =>
              i.productId === action.productId ? { ...i, qty: i.qty + qty } : i
            )
          : [...state.items, { productId: action.productId, qty }],
      };
    }
    case 'REMOVE':
      return { ...state, items: state.items.filter((i) => i.productId !== action.productId) };
    case 'SET_QTY':
      if (action.qty <= 0) {
        return { ...state, items: state.items.filter((i) => i.productId !== action.productId) };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.productId === action.productId ? { ...i, qty: action.qty } : i
        ),
      };
    case 'OPEN_DRAWER':
      return { ...state, drawerOpen: true };
    case 'CLOSE_DRAWER':
      return { ...state, drawerOpen: false };
    case 'CLEAR':
      return { ...state, items: [] };
    default:
      return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  drawerOpen: boolean;
  addItem: (productId: string, qty?: number) => void;
  removeItem: (productId: string) => void;
  setQty: (productId: string, qty: number) => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  toast: string | null;
  showToast: (msg: string) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [], drawerOpen: false });
  const [toast, setToast] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2400);
  }, []);

  const addItem = useCallback(
    (productId: string, qty?: number) => {
      dispatch({ type: 'ADD', productId, qty });
      const p = getProd(productId);
      if (p) showToast(`${p.name} added to order`);
    },
    [showToast]
  );

  const itemCount = state.items.reduce((s, i) => s + i.qty, 0);
  const subtotal = state.items.reduce((s, i) => {
    const p = getProd(i.productId);
    return s + (p ? p.price * i.qty : 0);
  }, 0);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        drawerOpen: state.drawerOpen,
        addItem,
        removeItem: (productId) => dispatch({ type: 'REMOVE', productId }),
        setQty: (productId, qty) => dispatch({ type: 'SET_QTY', productId, qty }),
        openDrawer: () => dispatch({ type: 'OPEN_DRAWER' }),
        closeDrawer: () => dispatch({ type: 'CLOSE_DRAWER' }),
        clearCart: () => dispatch({ type: 'CLEAR' }),
        itemCount,
        subtotal,
        toast,
        showToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
