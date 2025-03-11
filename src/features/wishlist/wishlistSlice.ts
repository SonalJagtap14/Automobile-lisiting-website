import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWishlist, addToWishlist, removeFromWishlist } from '../../api';
import { PayloadAction } from "@reduxjs/toolkit";
import { CarDTO } from "../../types";

interface WishlistState {
  items: CarDTO[];//number[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: WishlistState = {
  items: [],
  status: 'idle',
  error: null,
};

export const getWishlist = createAsyncThunk(
  'wishlist/fetchWishlist',
  async () => {
    const response = await fetchWishlist();
    return response;
  }
);

// export const addCarToWishlist = createAsyncThunk(
//   'wishlist/addToWishlist',
//   async (carId: number) => {
//     await addToWishlist(carId);
//     return carId;
//   }
// );

// export const removeCarFromWishlist = createAsyncThunk(
//   'wishlist/removeFromWishlist',
//   async (carId: number) => {
//     await removeFromWishlist(carId);
//     return carId;
//   }
// );

// const wishlistSlice = createSlice({
//   name: 'wishlist',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // Get Wishlist
//       .addCase(getWishlist.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(getWishlist.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.items = action.payload;
//       })
//       .addCase(getWishlist.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message || 'Failed to fetch wishlist';
//       })
      
//       // Add to Wishlist
//       .addCase(addCarToWishlist.fulfilled, (state, action) => {
//         if (!state.items.includes(action.payload)) {
//           state.items.push(action.payload);
//         }
//       })
      
//       // Remove from Wishlist
//       .addCase(removeCarFromWishlist.fulfilled, (state, action) => {
//         state.items = state.items.filter(id => id !== action.payload);
//       });
//   }
// });

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addCarToWishlist: (state, action: PayloadAction<CarDTO>) => {
      const carExists = state.items.some((car) => car.id === action.payload.id);
      if (!carExists) {
        state.items.push(action.payload);
      }
    },
    removeCarFromWishlist: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((car) => car.id !== action.payload);
    },
  },
});


export const { addCarToWishlist, removeCarFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;