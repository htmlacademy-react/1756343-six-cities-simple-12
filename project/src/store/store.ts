import { configureStore } from '@reduxjs/toolkit';
import { sliceOffers } from './sliceOffers';

export const store = configureStore({
  reducer: {
    offers: sliceOffers.reducer,
  },
});
