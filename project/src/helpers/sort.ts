import { Options } from '../const';
import { Offers } from '../types/offers';

export const sort = (option: string, offers: Offers): Offers => {
  switch(option) {
    case Options.Popular:
      return offers;
    case Options.PriceAsk:
      return [...offers].sort((offer, nextOffer) => offer.price - nextOffer.price);
    case Options.PriceDesc:
      return [...offers].sort((offer, nextOffer) => nextOffer.price - offer.price);
    case Options.TopRating:
      return [...offers].sort((offer, nextOffer) => nextOffer.rating - offer.rating);
    default:
      return offers;
  }
};
