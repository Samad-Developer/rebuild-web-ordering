import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cart/cartSlice'
import themeReducer from './themeSettings/themeSlice'
import addressModalReducer from './modal/addressModalSlice'
import productsReducer from './productsData/productsSlice'

const store = configureStore({
  reducer: {
    cart: cartReducer,
    theme: themeReducer,
    addressModal: addressModalReducer,
    productsData: productsReducer,
    // Add other reducers here
  }
});

export default store;
