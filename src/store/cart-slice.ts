import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../data/products";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: Record<string, CartItem>;
}

const initialState: CartState = {
  items: {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<{ product: Product }>) {
      const { product } = action.payload;
      const existing = state.items[product.id];
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items[product.id] = { product, quantity: 1 };
      }
    },
    removeFromCart(state, action: PayloadAction<{ productId: string }>) {
      delete state.items[action.payload.productId];
    },
    clearCart(state) {
      state.items = {};
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
