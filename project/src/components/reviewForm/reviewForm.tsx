import { useState } from 'react';
import { Stars } from '../../const';
import Star from '../star/star';

const ReviewForm = (): JSX.Element => {
  const [review, setReview] = useState({
    rating: 0,
    review: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const {value, name} = e.target;
    if (review[name as keyof typeof review] !== value) {
      setReview({
        ...review,
        [name]: value,
      });
    }
  };

  const range = (n: number): number[] => (
    new Array(n)
      .fill(n + 1)
      .map((el, i) => el - (i + 1))
  );

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {range(Stars.Five).map((el, i) => (<Star key={el} star={el} setRating={handleChange} />))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={review.review}
        onChange={(e) => handleChange(e)}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled>Submit</button>
      </div>
    </form>
  );
};

export default ReviewForm;
