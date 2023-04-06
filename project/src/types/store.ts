import { store } from '../store/store';
import { City, Offers } from './offers';
import { User } from './user';

export type OffersData = {
  data?: Offers;
  isLoading?: boolean;
};

export type OffersInitData = {
  city: City;
  offers: OffersData;
};

export type AuthInitData = {
  authorizationStatus: boolean;
  user: User;
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
