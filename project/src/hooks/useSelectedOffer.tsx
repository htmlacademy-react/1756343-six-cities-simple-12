import { useState } from 'react';
import { Offer } from '../types/offers';

const useSelectedOffer = () => {
  const [selectedOffer, setSelectedOffer] = useState({});

  const onHover = (offer: Offer) => {
    setSelectedOffer(offer);
  };

  return {selectedOffer, onHover};

};

export default useSelectedOffer;
