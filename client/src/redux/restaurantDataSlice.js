import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchrestaurantdata = createAsyncThunk(
  "restaurant",
  async (id) => {
    const response = await fetch(
      `http://localhost:8000/get_restaurant_details/${id}`
    );
    // console.log("response.json()", response.json());
    return response.json();
  }
);

const restaurantDataSlice = createSlice({
  name: "restaurant",
  initialState: {
    isLoading: false,
    data: {},
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

export default restaurantDataSlice.reducer;
