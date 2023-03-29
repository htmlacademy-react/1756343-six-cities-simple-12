import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { City, Offers } from '../types/offers';
import { OffersData } from '../types/store';

const initialState: OffersData = {
  city: {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13
    }
  },
  offers: [] as Offers,
};

export const sliceOffers = createSlice({
  name: 'sliceOffers',
  initialState,
  reducers: {
    setCurrentCity: (state, { payload }: PayloadAction<City>) => {
      state.city = payload;
    },

    setOffers: (state, { payload }: PayloadAction<Offers>) => {
      state.offers = payload;
    },
  },
});

export const { setOffers, setCurrentCity } = sliceOffers.actions;
