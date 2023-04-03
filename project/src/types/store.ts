import { store } from '../store/store';
import { City, Offers } from './offers';

export type OffersData = {
  city: City;
  offers: Offers;
  isOffersLoading: boolean;
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
