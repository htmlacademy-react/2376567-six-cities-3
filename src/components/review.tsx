import { useSelector } from 'react-redux';
import { ReviewForm } from './review-form';
import { fetchReviews, submitReview } from '../redux/offers-slice';
import Spinner from '../components/spinner/spinner';
import { useEffect } from 'react';
import { AuthorizationStatus } from '../types';
import { useAppDispatch } from '../redux/store';
import {
  selectAuthorizationStatus,
  selectReviews,
  selectReviewsLoading,
  selectReviewSubmitLoading,
  selectReviewSubmitError
} from '../redux/review-selectors';

export function ReviewsSection({ offerId }: { offerId: string | undefined }) {
  const dispatch = useAppDispatch();

  const reviews = useSelector(selectReviews);
  const reviewsLoading = useSelector(selectReviewsLoading);
  const reviewSubmitLoading = useSelector(selectReviewSubmitLoading);
  const reviewSubmitError = useSelector(selectReviewSubmitError);

  const { authorizationStatus } = useSelector(selectAuthorizationStatus);

  const handleReviewSubmit = async (data: { rating: number; comment: string }) => {
    if (authorizationStatus !== AuthorizationStatus.AUTH) {
      throw new Error('Not authorized');
    }
    await dispatch(submitReview({ offerId, ...data })).unwrap();
  };

  useEffect(() => {
    if (offerId) {
      dispatch(fetchReviews(offerId));
    }
  }, [offerId, dispatch]);

  if (reviewsLoading) {
    return (
      <section className="offer__reviews reviews">
        <Spinner />
      </section>
    );
  }

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{reviews.length}</span>
      </h2>

      {reviews.length > 0 && (
        <ul className="reviews__list">
          {[...reviews]
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .map((review) => (
              <li key={review.id} className="reviews__item">
                <div className="reviews__user user">
                  <div className="reviews__avatar-wrapper user__avatar-wrapper">
                    <img
                      className="reviews__avatar user__avatar"
                      src={review.user.avatarUrl}
                      width="54"
                      height="54"
                      alt={`${review.user.name}'s avatar`}
                    />
                  </div>
                  <span className="reviews__user-name">
                    {review.user.name}
                  </span>
                </div>
                <div className="reviews__info">
                  <div className="reviews__rating rating">
                    <div className="reviews__stars rating__stars">
                      <span style={{ width: `${review.rating * 20}%` }}></span>
                      <span className="visually-hidden">Rating</span>
                    </div>
                  </div>
                  <p className="reviews__text">{review.comment}</p>
                  <time className="reviews__time" dateTime={review.date}>
                    {new Date(review.date).toLocaleDateString('en-US', {
                      month: 'long',
                      year: 'numeric',
                    })}
                  </time>
                </div>
              </li>
            ))}
        </ul>
      )}

      {authorizationStatus === AuthorizationStatus.AUTH && (
        <ReviewForm
          onSubmit={handleReviewSubmit}
          loading={reviewSubmitLoading}
          error={reviewSubmitError}
        />
      )}
    </section>
  );
}
