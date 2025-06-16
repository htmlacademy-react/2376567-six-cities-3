import { Link } from 'react-router-dom';
import { AppRoute } from '../const';
import { NearPlacesProps } from '../types';
import { useAppDispatch } from '../redux/store';
import { toggleFavorite } from '../redux/favorites-slice';
import { selectFavorites } from '../redux/favorites-selectors';
import { useSelector } from 'react-redux';
import FavoriteButton from '../components/favorite-button';
import { selectIsAuth } from '../redux/auth-selectors';

export default function NearPlacesComponent({ offers, setActiveCard }: NearPlacesProps): JSX.Element {
  const dispatch = useAppDispatch();
  const favorites = useSelector(selectFavorites);
  const isAuth = useSelector(selectIsAuth);
  const nearestOffers = offers.slice(0, 3);

  const handleFavoriteClick = (offerId: string, isFavorite: boolean, evt: React.MouseEvent) => {
    evt.preventDefault();
    evt.stopPropagation();
    dispatch(toggleFavorite({
      offerId,
      status: isFavorite ? 0 : 1
    }));
  };

  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <div className="near-places__list places__list">
        {nearestOffers.map((offer) => {
          const isFavorite = isAuth && (favorites.some((favorite) => favorite.id === offer.id) || offer.isFavorite);

          return (
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
                  <FavoriteButton
                    offerId={offer.id}
                    isFavorite={isFavorite}
                    className="place-card"
                    width={18}
                    height={19}
                    onClick={(evt) => handleFavoriteClick(offer.id, isFavorite, evt)}
                  />
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
                <p className="place-card__type">{offer.type && offer.type[0].toUpperCase() + offer.type.slice(1)}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
