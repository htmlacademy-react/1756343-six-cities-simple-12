import { configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../api';
import { sliceAuth } from './sliceAuth';
import { sliceReviews } from './sliceReviews';
import { sliceOffers } from './sliceOffers';

const api = createAPI();

export const store = configureStore({
  reducer: {
    offers: sliceOffers.reducer,
    auth: sliceAuth.reducer,
    reviews: sliceReviews.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    })
});
