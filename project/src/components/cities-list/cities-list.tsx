import { memo } from 'react';
import { City } from '../../types/offers';

type CitiesListProp = {
  cities: City[];
  activeCity: string;
  handleChangeCity: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

const CitiesList = ({cities, activeCity, handleChangeCity}: CitiesListProp):JSX.Element => (
  <>
    <h1 className="visually-hidden">Cities</h1>
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities.map((city) => (
            <li key={city.name} className="locations__item">
              <a className={`locations__item-link tabs__item ${activeCity === city.name ? 'tabs__item--active' : ''}`} href={city.name} onClick={(e) => handleChangeCity(e)}>
                <span>{city.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  </>
);

export default memo(CitiesList);
