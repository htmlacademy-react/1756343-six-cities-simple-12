import React, { useState, memo } from 'react';
import { Options } from '../../const';

type SortOptionsProp = {
  handleSorting: (value: string) => void;
  currentSort: string;
}

const SortOptions = ({handleSorting, currentSort}: SortOptionsProp): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const handlerOpenOptions = (): void => {
    setIsOpen(!isOpen);
  };

  const handlerSetCurrentSort = (e: React.MouseEvent<HTMLLIElement, MouseEvent>): void => {
    handleSorting(e.currentTarget.innerText);
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

export default memo(SortOptions);
