import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart-slice";

const store = configureStore({
  reducer: {
    cart: cartReducer.reducer,
  },
  devTools: {
    name: "e-com",
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
