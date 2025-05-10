import { NearPlacesProps } from '../types';

export default function NearPlacesComponent({ offers, onMouseEnter, onMouseLeave }: NearPlacesProps): JSX.Element {
  const handleMouseEnter = (id: string) => {
    if (onMouseEnter) {
      onMouseEnter(id);
    }
  };

  const handleMouseLeave = () => {
    if (onMouseLeave) {
      onMouseLeave();
    }
  };

  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <div className="near-places__list places__list">
        {offers.map((offer) => (
          <article
            key={offer.id}
            className="near-places__card place-card"
            onMouseEnter={() => handleMouseEnter(offer.id)}
            onMouseLeave={handleMouseLeave}
          >
            {offer.isPremium && (
              <div className="place-card__mark">
                <span>Premium</span>
              </div>
            )}
            <div className="near-places__image-wrapper place-card__image-wrapper">
              <a href="#">
                <img
                  className="place-card__image"
                  src={offer.previewImage}
                  width={260}
                  height={200}
                  alt="Place image"
                />
              </a>
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
                <a href="#">{offer.title}</a>
              </h2>
              <p className="place-card__type">{offer.type}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
