import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCartdata = createAsyncThunk("carts", async () => {
  const response = await fetch("http://localhost:8000/get_cart_details/");
  return response.json();
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    isLoading: false,
    cartdata: {},
    isError: false,
  },

  extraReducers: (builder) => {
    builder.addCase(fetchCartdata.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCartdata.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cartdata = action.payload;
    });
    builder.addCase(fetchCartdata.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
    });
  },
});

export default cartSlice.reducer;
