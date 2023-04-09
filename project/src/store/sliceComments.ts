import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { NewComment, Reviews } from '../types/reviews';
import { AppDispatch, CommentsInitData, RootState } from '../types/store';

export const fetchComments = createAsyncThunk<Reviews, string, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'comments/fetchComments',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Reviews>(`/comments/${_arg}`);
    return data;
  },
);

export const sendComment = createAsyncThunk<Reviews, NewComment, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'comments/sendComment',
  async ({comment, rating, hotelId}, {dispatch, extra: api}) => {
    const {data} = await api.post<Reviews>(`/comments/${hotelId}`, {comment, rating});
    return data;
  },
);

const initialState: CommentsInitData = {
  comments: [],
};

export const sliceComments = createSlice({
  name: 'sliceComments',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(sendComment.fulfilled, (state, action) => {
        state.comments = action.payload;
      });
  }
});
