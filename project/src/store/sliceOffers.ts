import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { City, Offers } from '../types/offers';
import { AppDispatch, OffersData, RootState } from '../types/store';

export const fetchOffers = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setOffersDataLoadingStatus(true));
    const {data} = await api.get<Offers>('/hotels');
    dispatch(setOffersDataLoadingStatus(false));
    dispatch(setOffers(data));
  },
);

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
  isOffersLoading: false,
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
    setOffersDataLoadingStatus: (state, {payload}: PayloadAction<boolean>) => {
      state.isOffersLoading = payload;
    },
  },
});

export const { setOffers, setCurrentCity, setOffersDataLoadingStatus } = sliceOffers.actions;
