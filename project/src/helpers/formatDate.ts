import { MONTH_NAMES } from '../const';

export const formatDate = (date: string):string => {
  const d = new Date(date),
    year = d.getFullYear();
  let month = `${ d.getMonth() + 1}`,
    day = `${ d.getDate()}`;

  if (month.length < 2) {
    month = `0${ month}`;
  }
  if (day.length < 2) {
    day = `0${ day}`;
  }

  return [year, month, day].join('-');
};

export const getFullMonthAndYear = (date: string):string => {
  const d = new Date(date),
    year = d.getFullYear(),
    month = MONTH_NAMES[d.getMonth()];

  return `${month} ${year}`;
};
