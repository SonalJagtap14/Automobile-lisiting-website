import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { UserDTO } from '../../types';
import { fetchUser, updateUser } from '../../api';

interface UserState {
  data: UserDTO | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UserState = {
  data: null,
  status: 'idle',
  error: null,
};

export const getUserInfo = createAsyncThunk(
  'user/fetchUser',
  async () => {
    const response = await fetchUser();
    return response;
  }
);

export const updateUserInfo = createAsyncThunk(
  'user/updateUser',
  async (userData: UserDTO) => {
    const response = await updateUser(userData);
    return response;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get User Info
      .addCase(getUserInfo.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch user info';
      })
      
      // Update User Info
      .addCase(updateUserInfo.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(updateUserInfo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to update user info';
      });
  }
});

export default userSlice.reducer;