import { useState } from 'react';
import { Offer, Offers } from '../../types/offers';
import Card from '../card/card';

type CardsListProp = {
    offers: Offers;
    onHover: (offer: Offer) => void;
}

const CardsList = ({offers, onHover}: CardsListProp): JSX.Element => {
  const [activeCard, setActivaCard] = useState<null|Offer>(null);

  const handleActiveCard = (offer: Offer): void => {
    if (!activeCard || offer.id !== activeCard.id) {
      setActivaCard(offer);
      onHover(offer);
    }
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => <Card key={offer.id} offer={offer} handleActiveCard={handleActiveCard} />)}
    </div>
  );
};

export default CardsList;
