import {combineReducers} from '@reduxjs/toolkit';
import { sliceAuth } from './slice-auth';
import { sliceOffers } from './slice-offers';
import { sliceReviews } from './slice-reviews';

export const rootReducer = combineReducers({
  offers: sliceOffers.reducer,
  auth: sliceAuth.reducer,
  reviews: sliceReviews.reducer,
});
