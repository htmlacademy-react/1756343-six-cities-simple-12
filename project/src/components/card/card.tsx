import { memo } from 'react';
import { Link } from 'react-router-dom';
import { RATING_STARS } from '../../const';
import { Offer } from '../../types/offers';

type CardProp = {
  offer: Offer;
  handleActiveCard: (offer: Offer) => void;
}

const Card = ({offer, handleActiveCard}: CardProp): JSX.Element => {
  const {isPremium, price, previewImage, title, type, rating, id} = offer;

  return (
    <article
      className="cities__card place-card"
      onMouseEnter={() => handleActiveCard(offer)}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`offer/${id}`}>
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place" />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${rating / RATING_STARS * 100}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`offer/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};

export default memo(Card);
