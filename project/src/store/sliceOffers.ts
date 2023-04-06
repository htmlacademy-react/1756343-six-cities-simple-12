import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { City, Offers } from '../types/offers';
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
  },
});

export const { setOffersData, setCurrentCity } = sliceOffers.actions;
