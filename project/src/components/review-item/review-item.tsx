import { RATING_STARS } from '../../const';
import { formatDate, getFullMonthAndYear } from '../../helpers/format-date';
import { Review } from '../../types/reviews';

type ReviewProp = {
  review: Review;
}

const ReviewItem = ({review}: ReviewProp):JSX.Element => {
  const { comment, date, rating, user } = review;

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
            <span style={{width: `${rating / RATING_STARS * 100}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{comment}</p>
        <time className="reviews__time" dateTime={formatDate(date)}>{getFullMonthAndYear(date)}</time>
      </div>
    </li>
  );
};

export default ReviewItem;
