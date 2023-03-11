import { useState } from 'react';
import { Offers } from '../../types/offers';
import Card from '../card/card';

type CardsListProp = {
    offers: Offers;
}

const CardsList = ({offers}: CardsListProp): JSX.Element => {
  const [activeCard, setActivaCard] = useState<null|number>(null);

  const handleActiveCard = (id: number): void => {
    if (id !== activeCard) {
      setActivaCard(id);
    }
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => <Card key={offer.id} offer={offer} handleActiveCard={handleActiveCard} />)}
    </div>
  );
};

export default CardsList;
