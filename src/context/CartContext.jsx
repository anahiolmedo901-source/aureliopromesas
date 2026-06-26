import { createContext, useContext, useReducer, useEffect } from "react";

const CartContext = createContext();

const STORAGE_KEY = "fastfood_cart";

function loadCart() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.find((i) => i.id === action.payload.id);
      if (existing) {
        return state.map((i) =>
          i.id === action.payload.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...state, { ...action.payload, quantity: 1 }];
    }
    case "REMOVE_ITEM":
      return state.filter((i) => i.id !== action.payload);
    case "UPDATE_QUANTITY":
      return state.map((i) =>
        i.id === action.payload.id
          ? { ...i, quantity: Math.max(1, action.payload.quantity) }
          : i
      );
    case "CLEAR":
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, [], loadCart);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const subtotal = items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );
  const iva = subtotal * 0.16;
  const discount = subtotal >= 500 ? subtotal * 0.1 : subtotal >= 200 ? subtotal * 0.05 : 0;
  const total = subtotal + iva - discount;

  const value = { items, dispatch, subtotal, iva, discount, total };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
