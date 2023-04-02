import React, { useEffect, useState } from 'react';
import { Options } from '../../const';
import { useAppSelector } from '../../hooks/useRedux';
import { citySelector } from '../../store/selectors';

type SortOptionsProp = {
  handleSorting: (option: string) => void;
}

const SortOptions = ({handleSorting}: SortOptionsProp): JSX.Element => {
  const city = useAppSelector(citySelector);
  const [isOpen, setIsOpen] = useState(false);
  const [currentSort, setCurrentSort] = useState<string>(Options.POPULAR);

  useEffect(() => {
    setCurrentSort(Options.POPULAR);
    setIsOpen(false);
  }, [city]);

  const handlerOpenOptions = (): void => {
    setIsOpen(!isOpen);
  };

  const handlerSetCurrentSort = (e: React.MouseEvent<HTMLLIElement, MouseEvent>): void => {
    if (e.currentTarget.innerText !== currentSort) {
      setCurrentSort(e.currentTarget.innerText);
      handleSorting(e.currentTarget.innerText);
    }
    setIsOpen(!isOpen);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" onClick={handlerOpenOptions}>
        {currentSort}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpen ? 'places__options--opened' : ''}`}>
        {Object.values(Options).map((option) => (
          <li
            className={`places__option ${option === currentSort ? 'places__option--active' : ''}`}
            key={option}
            onClick={(e) => handlerSetCurrentSort(e)}
          >
            {option}
          </li>
        ))}
      </ul>
    </form>
  );
};

export default SortOptions;
