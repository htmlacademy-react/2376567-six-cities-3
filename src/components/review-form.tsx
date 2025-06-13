import React, { useState, FormEvent } from 'react';
import { ReviewFormProps } from '../types';

export function ReviewForm({ onSubmit }: ReviewFormProps) {
  const [reviewData, setReviewData] = useState({
    rating: 0,
    review: ''
  });

  const handleRatingChange = (value: number) => {
    setReviewData((prev) => ({ ...prev, rating: value }));
  };

  const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReviewData((prev) => ({ ...prev, review: e.target.value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (reviewData.review.length < 50 || reviewData.review.length > 300) {
      return;
    }
    onSubmit({
      rating: reviewData.rating,
      comment: reviewData.review
    });
    setReviewData({ rating: 0, review: '' });
  };

  const isSubmitDisabled =
    reviewData.rating === 0 ||
    reviewData.review.length < 50 ||
    reviewData.review.length > 300;

  return (
    <form className="reviews__form form" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>

      <div className="reviews__rating-form form__rating">
        {[5, 4, 3, 2, 1].map((value) => (
          <React.Fragment key={value}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={value}
              id={`${value}-stars`}
              type="radio"
              checked={reviewData.rating === value}
              onChange={() => handleRatingChange(value)}
            />
            <label
              htmlFor={`${value}-stars`}
              className="reviews__rating-label form__rating-label"
              title={[
                'perfect',
                'good',
                'not bad',
                'badly',
                'terribly'
              ][5 - value]}
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </React.Fragment>
        ))}
      </div>

      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={reviewData.review}
        onChange={handleReviewChange}
      />

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay with at least{' '}
          <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isSubmitDisabled}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
