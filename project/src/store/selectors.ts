import { City, Offers } from '../types/offers';
import { RootState } from '../types/store';

export const citySelector = (state: RootState): City => state.offers.city;
export const offersSelector = (state: RootState): Offers => state.offers.offers;
