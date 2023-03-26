import { Reviews } from '../../types/reviews';
import ReviewItem from '../reviewItem/reviewItem';

type ReviewsListProp = {
  reviews: Reviews;
}

const ReviewsList = ({reviews}: ReviewsListProp):JSX.Element => (
  <>
    <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
    <ul className="reviews__list">
      {reviews.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </ul>
  </>
);

export default ReviewsList;
