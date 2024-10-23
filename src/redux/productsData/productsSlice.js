import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productsData: [], // Holds the products data
  productsLoading: false,   // Manages loading state
  popularItems: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // Action to set products data, replacing old data
    setProductsData: (state, action) => {
      state.productsData = action.payload; // Replace the old data with the new data
    },
    // Action to set loading state
    setProductsLoading: (state, action) => {
      state.productsLoading = action.payload; // True for loading, false for not loading
    },
    // Optional: If you want to clear products data
    clearProductsData: (state) => {
      state.productsData = []; // Clear the products data
    },
    setPopularItems: (state, action) => {
      state.popularItems = action.payload; // Set the popular items
    },
  },
});

// Export actions to use in components
export const { setProductsData, setProductsLoading, clearProductsData, setPopularItems } = productsSlice.actions;

// Export the reducer to add to the store
export default productsSlice.reducer;
