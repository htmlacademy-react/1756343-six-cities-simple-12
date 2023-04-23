import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { deleteToken, saveToken } from '../token';
import { Auth } from '../types/auth';
import { AppDispatch, AuthInitData, RootState } from '../types/store';
import { User } from '../types/user';

export const checkAuth = createAsyncThunk<User, undefined, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<User>('/login');
    return data;
  },
);

export const login = createAsyncThunk<User, Auth, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<User>('/login', {email, password});
    if (data.token) {
      saveToken(data.token);
    }
    return data;
  },
);

export const logout = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete('/logout');
    deleteToken();
  },
);

const initialState: AuthInitData = {
  authorizationStatus: false,
  user: {
    id: 0,
    name: '',
    isPro: false,
    avatarUrl: '',
    email: '',
    token: '',
  },
};

export const sliceAuth = createSlice({
  name: 'sliceAuth',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.authorizationStatus = true;
        state.user = action.payload;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.authorizationStatus = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.authorizationStatus = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state) => {
        state.authorizationStatus = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.authorizationStatus = false;
      });
  }
});
