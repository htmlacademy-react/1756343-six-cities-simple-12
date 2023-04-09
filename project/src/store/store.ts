import { configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../api';
import { sliceAuth } from './sliceAuth';
import { sliceComments } from './sliceComments';
import { sliceOffers } from './sliceOffers';

const api = createAPI();

export const store = configureStore({
  reducer: {
    offers: sliceOffers.reducer,
    auth: sliceAuth.reducer,
    comments: sliceComments.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    })
});
