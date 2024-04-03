import { configureStore } from "@reduxjs/toolkit";
import restaurantSlice from "./restaurantSlice";

export const store = configureStore({
  reducer: restaurantSlice,
  //   middleware: (getDefaultMiddleware) =>
  //     getDefaultMiddleware({
  //       serializableCheck: false,
  //     }),
});
