import { useCallback, useMemo, useState } from 'react';
import CardsList from '../../components/cardsList/cardsList';
import CitiesList from '../../components/citiesList/citiesList';
import Header from '../../components/header/header';
import MainEmpty from '../../components/mainEmpty/mainEmpty';
import Map from '../../components/map/map';
import SortOptions from '../../components/sortOptions/sortOptions';
import Spinner from '../../components/spinner/spinner';
import { CITIES, Options } from '../../const';
import { sort } from '../../helpers/sort';
import useActiveOffer from '../../hooks/useActiveOffer';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { citySelector, offersSelector } from '../../store/selectors';
import { setCurrentCity } from '../../store/sliceOffers';

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
          {isError ? <MainEmpty /> :
            <div className="cities__places-container container">
              {isLoading && <Spinner />}
              {!isLoading && preparedOffers && (
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
