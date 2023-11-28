// profileSlice.js
import { createSlice } from '@reduxjs/toolkit';
import * as ActionTypes from '../../Actions/User.Action';

const initialState = {
  loading: false,
  isUpdated: false,
  isDeleted: false,
  message: '',
  error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateProfileRequest: (state) => {
      state.loading = true;
      state.isUpdated = false;
      state.error = null;
    },
    updateProfileSuccess: (state) => {
      state.loading = false;
      state.isUpdated = true;
    },
    updateProfileFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateProfileReset: (state) => {
      state.isUpdated = false;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFail,
  updateProfileReset,
  clearErrors: clearProfileErrors,
} = profileSlice.actions;

export default profileSlice.reducer;
