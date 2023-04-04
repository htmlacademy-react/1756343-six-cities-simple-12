import { store } from '../store/store';
import { City, Offers } from './offers';

export type OffersData = {
  data?: Offers;
  isLoading?: boolean;
};

export type initialData = {
  city: City;
  offers: OffersData;
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
