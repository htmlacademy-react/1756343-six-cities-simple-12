type StarProp = {
  star:number;
  setRating: ((e: React.ChangeEvent<HTMLInputElement>) => void);
}

const Star = ({star, setRating}: StarProp): JSX.Element => (
  <>
    <input onChange={(e) => setRating(e)} className="form__rating-input visually-hidden" name="rating" value={star} id={`${star}-stars`} type="radio" />
    <label htmlFor={`${star}-stars`} className="reviews__rating-label form__rating-label" title="perfect">
      <svg className="form__star-image" width="37" height="33">
        <use xlinkHref="#icon-star"></use>
      </svg>
    </label>
  </>
);

export default Star;
