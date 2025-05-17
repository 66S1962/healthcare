import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// ✅ Login action
export const login = createAsyncThunk('user/login', async (userData, thunkAPI) => {
  try {
    const response = await axios.post('http://localhost:3001/login', userData);
    return response.data.user;  // Return user data on successful login
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);  // Reject with error if login fails
  }
});

// ✅ Update user profile
export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async (userData, thunkAPI) => {
    try {
      console.log("Updating user profile with:", userData);
      return userData; // Temporarily returning user data as is
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);  // Reject with error if update fails
    }
  }
);

const UserSlice = createSlice({
  name: 'user',
  initialState: {
    user: JSON.parse(localStorage.getItem('user')) || null,  // Load user data from localStorage if available
    isLoading: false,
    isSuccess: false,
    isError: false,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isSuccess = false;
      state.isError = false;
      state.isLoading = false;
      localStorage.removeItem('user');  // Remove user data from localStorage on logout
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔐 Login action
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
        localStorage.setItem('user', JSON.stringify(action.payload));  // Store user data in localStorage on successful login
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
        alert(action.payload.message || "Login failed. Please try again!");  // Show an alert if login fails
      });

    builder
      // 🔄 Update profile action
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload };
        state.isLoading = false;
        state.isSuccess = true;
        localStorage.setItem('user', JSON.stringify(state.user));  // Store updated user data in localStorage
      })
      .addCase(updateUserProfile.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { logout } = UserSlice.actions;
export default UserSlice.reducer;
