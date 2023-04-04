import { useParams } from 'react-router-dom';
import CardsList from '../../components/cardsList/cardsList';
import Header from '../../components/header/header';
import Map from '../../components/map/map';
import ReviewForm from '../../components/reviewForm/reviewForm';
import ReviewsList from '../../components/reviewsList/reviewsList';
import { RATING_STARS } from '../../const';
import useActiveOffer from '../../hooks/useActiveOffer';
import { useAppSelector } from '../../hooks/useRedux';
import { reviews } from '../../mocks/reviews';
import { citySelector, offersSelector } from '../../store/selectors';

const Room = (): JSX.Element => {
  const {id} = useParams();
  const {data} = useAppSelector(offersSelector);
  const city = useAppSelector(citySelector);
  const { activeOffer, setActive } = useActiveOffer();
  const selectOffer = data?.find((offer) => offer.id === Number(id));
  const nearbyOffer = data?.filter((offer) => offer.id !== Number(id) && offer.city.name === city.name);

  if (!selectOffer) {
    return <>Not found</>;
  }

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {selectOffer.images.map((image) => (
                <div className="property__image-wrapper" key={image}>
                  <img className="property__image" src={image} alt="Studio" />
                </div>
              ))}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {selectOffer.isPremium && (
                <div className="property__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="property__name-wrapper">
                <h1 className="property__name">{selectOffer.title}</h1>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: `${selectOffer.rating / RATING_STARS * 100}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{selectOffer.rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {selectOffer.type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {selectOffer.bedrooms}
                </li>
                <li className="property__feature property__feature--adults">
                  Max {selectOffer.maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{selectOffer.price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {selectOffer.goods.map((good) => (
                    <li className="property__inside-item" key={good}>
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="property__avatar user__avatar" src={selectOffer.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="property__user-name">
                    {selectOffer.host.name}
                  </span>
                  {selectOffer.host.isPro && (
                    <span className="property__user-status">Pro</span>
                  )}
                </div>
                <div className="property__description">
                  <p className="property__text">{selectOffer.description}</p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <ReviewsList reviews={reviews} />
                <ReviewForm />
              </section>
            </div>
          </div>
          {nearbyOffer && <Map activeOffer={activeOffer} offers={nearbyOffer} cn={'property__map'} />}
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            {nearbyOffer && <CardsList offers={nearbyOffer} onHover={setActive} cn={'near-places__list places__list'} />}
          </section>
        </div>
      </main>
    </div>

  );
};

export default Room;
