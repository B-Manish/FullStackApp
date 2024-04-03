import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchrestaurantdata = createAsyncThunk("restaurants", async () => {
  const response = await fetch("http://localhost:8000/get_restaurants");
  return response.json();
});

const restaurantSlice = createSlice({
  name: "restaurants",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },

  extraReducers: (builder) => {
    builder.addCase(fetchrestaurantdata.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchrestaurantdata.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchrestaurantdata.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
    });
  },
});

export default restaurantSlice.reducer;
