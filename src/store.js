import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/pages/user/userSlice';
import cartReducer from './features/pages/cart/cartSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});

export default store;
