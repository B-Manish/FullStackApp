import { configureStore } from "@reduxjs/toolkit";
import restaurantSlice from "./restaurantSlice";
import restaurantDataSlice from "./restaurantDataSlice";
import cartSlice from "./cartSlice";

export const store = configureStore({
  reducer: restaurantSlice,
  restaurantDataSlice,
  cartSlice,
});
