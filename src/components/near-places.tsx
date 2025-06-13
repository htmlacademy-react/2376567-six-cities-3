import { Link } from 'react-router-dom';
import { AppRoute } from '../const';
import { NearPlacesProps } from '../types';

export default function NearPlacesComponent({ offers, setActiveCard }: NearPlacesProps): JSX.Element {
  const nearestOffers = offers.slice(0, 3);
  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <div className="near-places__list places__list">
        {nearestOffers.map((offer) => (
          <article
            key={offer.id}
            className="near-places__card place-card"
          >
            {offer.isPremium && (
              <div className="place-card__mark">
                <span>Premium</span>
              </div>
            )}
            <div className="near-places__image-wrapper place-card__image-wrapper">
              <Link to={`${AppRoute.Offer}${offer.id}`} onClick={() => {
                setActiveCard?.(offer.id);
                window.scrollTo(0, 0);
              }}
              >
                <img
                  className="place-card__image"
                  src={offer.previewImage}
                  width={260}
                  height={200}
                  alt="Place image"
                />
              </Link>
            </div>
            <div className="place-card__info">
              <div className="place-card__price-wrapper">
                <div className="place-card__price">
                  <b className="place-card__price-value">€{offer.price}</b>
                  <span className="place-card__price-text">/&nbsp;night</span>
                </div>
                <button
                  className={`place-card__bookmark-button ${offer.isFavorite ? 'place-card__bookmark-button--active' : ''} button`}
                  type="button"
                >
                  <svg className="place-card__bookmark-icon" width={18} height={19}>
                    <use xlinkHref="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">
                    {offer.isFavorite ? 'In bookmarks' : 'To bookmarks'}
                  </span>
                </button>
              </div>
              <div className="place-card__rating rating">
                <div className="place-card__stars rating__stars">
                  <span style={{ width: `${Math.round(offer.rating) * 20}%` }} />
                  <span className="visually-hidden">Rating</span>
                </div>
              </div>
              <h2 className="place-card__name">
                <Link to={`${AppRoute.Offer}${offer.id}`} onClick={(evt) => {
                  evt.stopPropagation();
                  setActiveCard?.(offer.id);
                  window.scrollTo(0, 0);
                }}
                >{offer.title}
                </Link>
              </h2>
              <p className="place-card__type">{offer.type}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
