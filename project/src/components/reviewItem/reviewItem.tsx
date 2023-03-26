import { monthNames } from '../../const';
import { Review } from '../../types/reviews';

type ReviewProp = {
  review: Review;
}

const ReviewItem = ({review}: ReviewProp):JSX.Element => {
  const { comment, date, rating, user } = review;
  const d = new Date(date),
    year = d.getFullYear(),
    month = d.getMonth();

  const formatDate = ():string => {
    let mon = `${ d.getMonth() + 1}`,
      day = `${ d.getDate()}`;

    if (mon.length < 2) {
      mon = `0${ mon}`;
    }
    if (day.length < 2) {
      day = `0${ day}`;
    }
    return [year, mon, day].join('-');
  };

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={user.avatarUrl} width="54" height="54" alt="Reviews avatar" />
        </div>
        <span className="reviews__user-name">{user.name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${rating / 5 * 100}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{comment}</p>
        <time className="reviews__time" dateTime={formatDate()}>{`${monthNames[month]} ${year}`}</time>
      </div>
    </li>
  );
};

export default ReviewItem;
