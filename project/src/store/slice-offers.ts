import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { City, Offer, Offers } from '../types/offers';
import { AppDispatch, OffersInitData, RootState } from '../types/store';

export const fetchOffers = createAsyncThunk<Offers, undefined, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Offers>('/hotels');
    return data;
  },
);

export const fetchOffer = createAsyncThunk<Offer, string, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'data/fetchOffer',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Offer>(`/hotels/${_arg}`);
    return data;
  },
);

export const fetchNearbyOffers = createAsyncThunk<Offers, string, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'data/nearbyOffers',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Offers>(`/hotels/${_arg}/nearby`);
    return data;
  },
);

const initialState: OffersInitData = {
  city: {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13
    }
  },
  offers: {
    data: [],
    isError: false,
    isLoading: false,
  },
  offer: {
    data: null,
    isError: false,
    isLoading: true,
  },
  nearbyOffers: [],
};

export const sliceOffers = createSlice({
  name: 'sliceOffers',
  initialState,
  reducers: {
    setCurrentCity: (state, { payload }: PayloadAction<City>) => {
      state.city = payload;
    },
    changeErrorStatus: (state, {payload}: PayloadAction<boolean>) => {
      state.offer.isError = payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.offers.data = action.payload;
        state.offers.isLoading = false;
      })
      .addCase(fetchOffers.pending, (state) => {
        state.offers.isLoading = true;
      })
      .addCase(fetchOffers.rejected, (state) => {
        state.offers.isError = true;
        state.offers.isLoading = false;
      })
      .addCase(fetchOffer.fulfilled, (state, action) => {
        state.offer.data = action.payload;
        state.offer.isLoading = false;
      })
      .addCase(fetchOffer.rejected, (state) => {
        state.offer.isError = true;
        state.offer.isLoading = false;
      })
      .addCase(fetchNearbyOffers.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
      });
  }
});

export const { setCurrentCity, changeErrorStatus } = sliceOffers.actions;
