import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cart/cartSlice'
import themeReducer from './settings/themeSlice'

const store = configureStore({
  reducer: {
    cart: cartReducer,
    theme: themeReducer,
    // Add other reducers here
  }
});

export default store;
