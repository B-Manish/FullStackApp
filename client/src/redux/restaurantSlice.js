import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchallrestaurantsdata = createAsyncThunk(
  "restaurants",
  async () => {
    const response = await fetch("http://localhost:8000/get_restaurants");
    return response.json();
  }
);

const restaurantSlice = createSlice({
  name: "restaurants",
  initialState: {
    isLoading: false,
    data: {},
    isError: false,
  },

  extraReducers: (builder) => {
    builder.addCase(fetchallrestaurantsdata.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchallrestaurantsdata.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchallrestaurantsdata.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
    });
  },
});

export default restaurantSlice.reducer;
