import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { NewReview, Reviews } from '../types/reviews';
import { AppDispatch, ReviewsInitData, RootState } from '../types/store';

export const fetchReviews = createAsyncThunk<Reviews, string, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'comments/fetchReviews',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Reviews>(`/comments/${_arg}`);
    return data;
  },
);

export const sendReview = createAsyncThunk<Reviews, NewReview, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'comments/sendReview',
  async ({comment, rating, hotelId}, {dispatch, extra: api}) => {
    const {data} = await api.post<Reviews>(`/comments/${hotelId}`, {comment, rating});
    return data;
  },
);

const initialState: ReviewsInitData = {
  reviews: [],
};

export const sliceReviews = createSlice({
  name: 'sliceReviews',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(sendReview.fulfilled, (state, action) => {
        state.reviews = action.payload;
      });
  }
});
