import React, { useState, FormEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ReviewFormProps } from '../types';
import { setReviewError, clearReviewError, setReviewSendingStatus } from '../redux/review-slice';
import { RootState } from '../redux/store';

export function ReviewForm({ onSubmit }: ReviewFormProps) {
  const [reviewData, setReviewData] = useState({
    rating: 0,
    review: ''
  });

  const dispatch = useDispatch();
  const { error: submitError, isSending } = useSelector((state: RootState) => state.review);

  const handleRatingChange = (value: number) => {
    if (!isSending) {
      setReviewData((prev) => ({ ...prev, rating: value }));
      dispatch(clearReviewError());
    }
  };

  const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isSending) {
      setReviewData((prev) => ({ ...prev, review: e.target.value }));
      dispatch(clearReviewError());
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (isSending) {
      return;
    }

    if (reviewData.review.length < 50 || reviewData.review.length > 300) {
      dispatch(setReviewError('Review must be between 50 and 300 characters'));
      return;
    }

    dispatch(setReviewSendingStatus(true));

    try {
      const result = onSubmit({
        rating: reviewData.rating,
        comment: reviewData.review
      });

      if (result instanceof Promise) {
        await result;
      }

      setReviewData({ rating: 0, review: '' });
    } catch (error) {
      dispatch(setReviewError('Failed to submit review. Please try again.'));
    } finally {
      dispatch(setReviewSendingStatus(false));
    }
  };

  const isSubmitDisabled =
    reviewData.rating === 0 ||
    reviewData.review.length < 50 ||
    reviewData.review.length > 300 ||
    isSending;

  return (
    <form className="reviews__form form" onSubmit={(evt) => void handleSubmit(evt)}>
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
              disabled={isSending}
            />
            <label
              htmlFor={`${value}-stars`}
              className={`reviews__rating-label form__rating-label ${isSending ? 'reviews__rating-label--disabled' : ''}`}
              title={['perfect', 'good', 'not bad', 'badly', 'terribly'][5 - value]}
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
        disabled={isSending}
      />

      {submitError && (
        <div className="reviews__error-message">
          {submitError}
        </div>
      )}

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
          {isSending ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
  );
}

