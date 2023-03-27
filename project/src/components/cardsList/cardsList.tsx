import { useState } from 'react';
import { Offer, Offers } from '../../types/offers';
import Card from '../card/card';

type CardsListProp = {
    offers: Offers;
    onHover: (id: number) => void;
    cn: string;
}

const CardsList = ({offers, onHover, cn}: CardsListProp): JSX.Element => {
  const [activeCard, setActivaCard] = useState<null|Offer>(null);

  const handleActiveCard = (offer: Offer): void => {
    if (!activeCard || offer.id !== activeCard.id) {
      setActivaCard(offer);
      onHover(offer.id);
    }
  };

  return (
    <div className={cn}>
      {offers.map((offer) => <Card key={offer.id} offer={offer} handleActiveCard={handleActiveCard} />)}
    </div>
  );
};

export default CardsList;
