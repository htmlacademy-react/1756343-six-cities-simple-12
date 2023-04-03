import { RootState } from '../types/store';

export const citySelector = (state: RootState) => state.offers.city;
export const offersSelector = (state: RootState) => state.offers.offers;
export const isOffersLoadingSelector = (state: RootState) => state.offers.isOffersLoading;
