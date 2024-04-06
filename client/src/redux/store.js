import { configureStore } from "@reduxjs/toolkit";
import restaurantSlice from "./restaurantSlice";
import restaurantDataSlice from "./restaurantDataSlice";

export const store = configureStore({
  reducer: restaurantSlice,
  restaurantDataSlice,
});
