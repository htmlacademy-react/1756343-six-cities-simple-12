import { useCallback, useMemo, useState } from 'react';
import CardsList from '../../components/cards-list/cards-list';
import CitiesList from '../../components/cities-list/cities-list';
import Header from '../../components/header/header';
import MainEmpty from '../../components/main-empty/main-empty';
import Map from '../../components/map/map';
import ServerError from '../../components/server-error/server-error';
import SortOptions from '../../components/sort-options/sort-options';
import Spinner from '../../components/spinner/spinner';
import { CITIES, Options } from '../../const';
import { sort } from '../../helpers/sort';
import useActiveOffer from '../../hooks/use-active-offer';
import { useAppDispatch, useAppSelector } from '../../hooks/use-redux';
import { citySelector, offersSelector } from '../../store/selectors';
import { setCurrentCity } from '../../store/slice-offers';

const Main = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const city = useAppSelector(citySelector);
  const {data, isLoading, isError} = useAppSelector(offersSelector);
  const { activeOffer, setActive } = useActiveOffer();
  const [currentSort, setCurrentSort] = useState<string>(Options.Popular);

  const preparedOffers = useMemo(() => {
    const filtered = data?.filter((offer) => offer.city.name === city.name);
    if (filtered) {
      const sorted = sort(currentSort, filtered);
      return sorted;
    }
  }, [city, data, currentSort]);

  const handleChangeCity = useCallback((e: React.MouseEvent<HTMLAnchorElement, MouseEvent>):void => {
    e.preventDefault();
    const selectedCity = CITIES.find((c) => c.name === e.currentTarget.innerText);
    if (selectedCity) {
      dispatch(setCurrentCity(selectedCity));
    }
  }, [dispatch]);

  const handleSorting = (value: string): void => {
    setCurrentSort(value);
  };

  return (
    <>
      <Header />
      <main className="page__main page__main--index">
        <CitiesList cities={CITIES} activeCity={city.name} handleChangeCity={handleChangeCity} />
        <div className="cities">
          {isError && <ServerError />}
          {!isLoading && !data.length && !isError ? <MainEmpty /> :
            <div className="cities__places-container container">
              {isLoading && <Spinner />}
              {!isLoading && preparedOffers && !isError && (
                <>
                  <section className="cities__places places">
                    <h2 className="visually-hidden">Places</h2>
                    <b className="places__found">{preparedOffers.length} places to stay in {city.name}</b>
                    <SortOptions handleSorting={handleSorting} currentSort={currentSort} />
                    <CardsList offers={preparedOffers} onHover={setActive} cn={'cities__places-list places__list tabs__content'} />
                  </section>
                  <div className="cities__right-section">
                    <Map activeOffer={activeOffer} offers={preparedOffers} cn={'cities__map'} />
                  </div>
                </>
              )}
            </div>}
        </div>
      </main>
    </>
  );
};

export default Main;
