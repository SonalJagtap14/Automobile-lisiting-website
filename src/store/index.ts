import { configureStore } from '@reduxjs/toolkit';
import carsReducer from '../features/cars/carsSlice';
import wishlistReducer from '../features/wishlist/wishlistSlice';
import userReducer from '../features/user/userSlice';

export const store = configureStore({
  reducer: {
    cars: carsReducer,
    wishlist: wishlistReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;