import { store } from '../store/store';
import { City, Offer, Offers } from './offers';
import { Reviews } from './reviews';
import { User } from './user';

export type OffersData = {
  data: Offers;
  isError: boolean;
  isLoading: boolean;
};

export type OfferData = {
  data: Offer | null;
  isError: boolean;
  isLoading: boolean;
}

export type OffersInitData = {
  city: City;
  offers: OffersData;
  offer: OfferData;
  nearbyOffers: Offers;
};

export type AuthInitData = {
  authorizationStatus: boolean;
  user: User;
}

export type ReviewsInitData = {
  reviews: Reviews;
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
