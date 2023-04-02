import { Options } from '../const';
import { Offers } from '../types/offers';

export const sort = (option: string, offers: Offers): Offers => {
  switch(option) {
    case Options.POPULAR:
      return offers;
    case Options.LOW_TO_HIGH:
      return [...offers].sort((offer, nextOffer) => offer.price - nextOffer.price);
    case Options.HIGH_TO_LOW:
      return [...offers].sort((offer, nextOffer) => nextOffer.price - offer.price);
    case Options.TOP_RATED:
      return [...offers].sort((offer, nextOffer) => nextOffer.rating - offer.rating);
    default:
      return offers;
  }
};
