import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ReviewState {
  error: string | null;
  isSending: boolean;
}

const initialState: ReviewState = {
  error: null,
  isSending: false,
};

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    setReviewError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    clearReviewError(state) {
      state.error = null;
    },
    setReviewSendingStatus: (state, action: PayloadAction<boolean>) => {
      state.isSending = action.payload;
    },
  },
});

export const {
  setReviewError,
  clearReviewError,
  setReviewSendingStatus
} = reviewSlice.actions;

export default reviewSlice.reducer;
