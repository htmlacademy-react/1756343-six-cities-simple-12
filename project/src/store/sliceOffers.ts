import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { City, Offer, Offers } from '../types/offers';
import { AppDispatch, OffersInitData, OffersData, RootState } from '../types/store';

export const fetchOffers = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setOffersData({isLoading: true}));
    const {data} = await api.get<Offers>('/hotels');
    dispatch(setOffersData({data, isLoading: false}));
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
    isLoading: false,
  },
  offer: {
    data: null,
    isError: false,
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
    setOffersData: (state, { payload }: PayloadAction<OffersData>) => {
      const {data, isLoading} = payload;
      if (isLoading) {
        state.offers.isLoading = isLoading;
      }
      if (data) {
        state.offers.data = data;
        state.offers.isLoading = isLoading;
      }
    },
    changeErrorStatus: (state, {payload}: PayloadAction<boolean>) => {
      state.offer.isError = payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffer.fulfilled, (state, action) => {
        state.offer.data = action.payload;
      })
      .addCase(fetchOffer.rejected, (state) => {
        state.offer.isError = true;
      })
      .addCase(fetchNearbyOffers.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
      });
  }
});

export const { setOffersData, setCurrentCity, changeErrorStatus } = sliceOffers.actions;
