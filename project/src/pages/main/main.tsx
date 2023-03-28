/* eslint-disable jsx-a11y/anchor-is-valid */

import { useEffect } from 'react';
import CardsList from '../../components/cardsList/cardsList';
import CitiesList from '../../components/citiesList/citiesList';
import Map from '../../components/map/map';
import { CITIES } from '../../const';
import useActiveOffer from '../../hooks/useActiveOffer';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { offersList } from '../../mocks/offers';
import { citySelector, offersSelector } from '../../store/selectors';
import { changeCity, setOffers } from '../../store/sliceOffers';

const Main = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const city = useAppSelector(citySelector);
  const offers = useAppSelector(offersSelector);
  const { activeOffer, setActive } = useActiveOffer();

  useEffect(() => {
    const filteredOffersList = offersList.filter((offer) => offer.city.name === city.name);
    dispatch(setOffers(filteredOffersList));
  }, [city, dispatch]);

  const handleChangeCity = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>):void => {
    e.preventDefault();
    const selectedCity = CITIES.find((c) => c.name === e.currentTarget.innerText);
    if (selectedCity) {
      dispatch(changeCity(selectedCity));
    }
  };

  return (
    <>
      <div style={{display: 'none'}}>
        <svg xmlns="http://www.w3.org/2000/svg"><symbol id="icon-arrow-select" viewBox="0 0 7 4"><path fillRule="evenodd" clipRule="evenodd" d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z"></path></symbol><symbol id="icon-bookmark" viewBox="0 0 17 18"><path d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z"></path></symbol><symbol id="icon-star" viewBox="0 0 13 12"><path fillRule="evenodd" clipRule="evenodd" d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z"></path></symbol></svg>
      </div>

      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <div className="header__nav-profile">
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                  </div>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList cities={CITIES} activeCity={city.name} handleChangeCity={handleChangeCity} />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offers.length} places to stay in {city.name}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type">
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active">Popular</li>
                  <li className="places__option">Price: low to high</li>
                  <li className="places__option">Price: high to low</li>
                  <li className="places__option">Top rated first</li>
                </ul>
              </form>
              <CardsList offers={offers} onHover={setActive} cn={'cities__places-list places__list tabs__content'} />
            </section>
            <div className="cities__right-section">
              <Map activeOffer={activeOffer} cn={'cities__map'} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Main;
