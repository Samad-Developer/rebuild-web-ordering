import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cart/cartSlice'
import themeReducer from './settings/themeSlice'
import addressModalReducer from './modal/addressModalSlice'
const store = configureStore({
  reducer: {
    cart: cartReducer,
    theme: themeReducer,
    addressModal: addressModalReducer,
    // Add other reducers here
  }
});

export default store;
