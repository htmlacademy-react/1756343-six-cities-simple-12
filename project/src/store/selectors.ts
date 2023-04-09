import { RootState } from '../types/store';

export const citySelector = (state: RootState) => state.offers.city;
export const offersSelector = (state: RootState) => state.offers.offers;
export const authSelector = (state: RootState) => state.auth.authorizationStatus;
export const userSelector = (state: RootState) => state.auth.user;
export const offerSelector = (state: RootState) => state.offers.offer;
export const nearbyOffersSelector = (state: RootState) => state.offers.nearbyOffers;
export const commentsSelector = (state: RootState) => state.comments.comments;
