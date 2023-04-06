import { RootState } from '../types/store';

export const citySelector = (state: RootState) => state.offers.city;
export const offersSelector = (state: RootState) => state.offers.offers;
export const authSelector = (state: RootState) => state.auth.authorizationStatus;
export const userSelector = (state: RootState) => state.auth.user;
