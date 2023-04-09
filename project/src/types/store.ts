import { store } from '../store/store';
import { City, Offer, Offers } from './offers';
import { Reviews } from './reviews';
import { User } from './user';

export type OffersData = {
  data?: Offers;
  isLoading?: boolean;
};

export type OfferData = {
  data: Offer | null;
  isError: boolean;
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

export type CommentsInitData = {
  comments: Reviews;
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
