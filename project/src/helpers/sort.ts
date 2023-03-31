import { HIGH_TO_LOW, LOW_TO_HIGH, POPULAR, TOP_RATED } from '../const';
import { Offers } from '../types/offers';

export const sort = (option: string, offers: Offers): Offers => {
  switch(option) {
    case POPULAR:
      return offers;
    case LOW_TO_HIGH:
      return [...offers].sort((offer, nextOffer) => offer.price - nextOffer.price);
    case HIGH_TO_LOW:
      return [...offers].sort((offer, nextOffer) => nextOffer.price - offer.price);
    case TOP_RATED:
      return [...offers].sort((offer, nextOffer) => nextOffer.rating - offer.rating);
    default:
      return offers;
  }
};
