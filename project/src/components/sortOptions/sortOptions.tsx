import React, { useEffect, useState } from 'react';
import { POPULAR, SORT_OPTIONS } from '../../const';
import { useAppSelector } from '../../hooks/useRedux';
import { citySelector } from '../../store/selectors';

type SortOptionsProp = {
  handleSorting: (option: string) => void;
}

const SortOptions = ({handleSorting}: SortOptionsProp): JSX.Element => {
  const city = useAppSelector(citySelector);
  const [isOpen, setIsOpen] = useState(false);
  const [currentOption, setCurrentOption] = useState(POPULAR);

  useEffect(() => {
    setCurrentOption(POPULAR);
    setIsOpen(false);
  }, [city]);

  const handlerOpenOptions = (): void => {
    setIsOpen(!isOpen);
  };

  const handlerSetCurrentOption = (e: React.MouseEvent<HTMLLIElement, MouseEvent>): void => {
    if (e.currentTarget.innerText !== currentOption) {
      setCurrentOption(e.currentTarget.innerText);
      handleSorting(e.currentTarget.innerText);
    }
    setIsOpen(!isOpen);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" onClick={handlerOpenOptions}>
        {currentOption}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpen ? 'places__options--opened' : ''}`}>
        {SORT_OPTIONS.map((option) => (
          <li
            className={`places__option ${option === currentOption ? 'places__option--active' : ''}`}
            key={option}
            onClick={(e) => handlerSetCurrentOption(e)}
          >
            {option}
          </li>
        ))}
      </ul>
    </form>
  );
};

export default SortOptions;
