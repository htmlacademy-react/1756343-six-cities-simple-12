import { configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../api';
import { sliceOffers } from './sliceOffers';

const api = createAPI();

export const store = configureStore({
  reducer: {
    offers: sliceOffers.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    })
});
