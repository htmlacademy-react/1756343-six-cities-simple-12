import { useEffect, useState } from 'react';
import CardsList from '../../components/cardsList/cardsList';
import CitiesList from '../../components/citiesList/citiesList';
import Header from '../../components/header/header';
import Map from '../../components/map/map';
import SortOptions from '../../components/sortOptions/sortOptions';
import { CITIES } from '../../const';
import { sort } from '../../helpers/sort';
import useActiveOffer from '../../hooks/useActiveOffer';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { offersList } from '../../mocks/offers';
import { citySelector, offersSelector } from '../../store/selectors';
import { setCurrentCity, setOffers } from '../../store/sliceOffers';

const Main = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const city = useAppSelector(citySelector);
  const offers = useAppSelector(offersSelector);
  const { activeOffer, setActive } = useActiveOffer();
  const [currentOffers, setCurrentOffers] = useState(offers);

  useEffect(() => {
    const filteredOffersList = offersList.filter((offer) => offer.city.name === city.name);
    dispatch(setOffers(filteredOffersList));
  }, [city, dispatch]);

  useEffect(() => {
    setCurrentOffers(offers);
  }, [offers]);

  const handleChangeCity = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>):void => {
    e.preventDefault();
    const selectedCity = CITIES.find((c) => c.name === e.currentTarget.innerText);
    if (selectedCity) {
      dispatch(setCurrentCity(selectedCity));
    }
  };

  const handleSorting = (option: string): void => {
    const sortedOffers = sort(option, offers);
    setCurrentOffers(sortedOffers);
  };

  return (
    <>
      <Header />
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
              <SortOptions handleSorting={handleSorting} />
              <CardsList offers={currentOffers} onHover={setActive} cn={'cities__places-list places__list tabs__content'} />
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
