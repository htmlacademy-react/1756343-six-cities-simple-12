import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppRoutes, RATING_STARS } from '../../const';
import { sendReview } from '../../store/sliceReviews';
import { store } from '../../store/store';
import Star from '../star/star';

const ReviewForm = (): JSX.Element => {
  const {id = ''} = useParams();
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    rating: 0,
    review: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const {value, name} = e.target;
    if (formState[name as keyof typeof formState] !== value) {
      setFormState({
        ...formState,
        [name]: value,
      });
    }
  };

  const handleSubmitComment = (e:React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    store.dispatch(sendReview({
      review: formState.review,
      rating: formState.rating,
      hotelId: id,
    }));

    setFormState({
      rating: 0,
      review: '',
    });
  };

  if (!id) {
    navigate(AppRoutes[404]);
  }

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={(e) => handleSubmitComment(e)}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {
          Array.from({length: RATING_STARS}, (_, i) => i + 1)
            .reverse()
            .map((el) => (<Star key={el} star={el} setRating={handleChange} />))
        }
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formState.review}
        onChange={(e) => handleChange(e)}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={!formState.review.length}>Submit</button>
      </div>
    </form>
  );
};

export default ReviewForm;
