import { Link } from 'react-router-dom';
import { AppRoute, CARD_IMAGE_SIZES, FAVORITE_BUTTON_SIZES } from '../const';
import { CardProps } from '../types';
import FavoriteButton from './favorite-button';
import { useAppDispatch } from '../redux/store';
import { selectOffers } from '../redux/offers-selectors';
import { useSelector } from 'react-redux';
import { toggleFavorite } from '../redux/favorites-slice';
import { selectFavorites } from '../redux/favorites-selectors';
import { memo, useCallback } from 'react';
import { selectIsAuth } from '../redux/auth-selectors';
import { calculateRatingWidth } from '../utils';

function Card({
  card,
  onMouseEnter,
  onMouseLeave,
  cardType = 'cities'
}: CardProps): JSX.Element {
  const {
    id,
    isPremium,
    previewImage,
    price,
    rating,
    title,
    type
  } = card;

  const dispatch = useAppDispatch();
  const offers = useSelector(selectOffers);
  const favorites = useSelector(selectFavorites);
  const isAuth = useSelector(selectIsAuth);

  const currentCard = offers.find((o) => o.id === card.id) || card;
  const isFavorite = isAuth && (favorites.some((fav) => fav.id === card.id) || currentCard.isFavorite);

  const handleFavoriteClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleFavorite({
      offerId: currentCard.id,
      status: isFavorite ? 0 : 1
    }));
  }, [currentCard.id, isFavorite, dispatch]);

  const handleMouseEnter = useCallback(() => onMouseEnter?.(id), [onMouseEnter, id]);
  const handleMouseLeave = useCallback(() => onMouseLeave?.(), [onMouseLeave]);

  return (
    <article
      className={`${cardType}__card place-card`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`${cardType}__image-wrapper place-card__image-wrapper`}>
        <Link to={`${AppRoute.Offer}${id}`}>
          <img
            className="place-card__image"
            src={previewImage}
            width={cardType === 'favorites' ? CARD_IMAGE_SIZES.favorites.width : CARD_IMAGE_SIZES.default.width}
            height={cardType === 'favorites' ? CARD_IMAGE_SIZES.favorites.height : CARD_IMAGE_SIZES.default.height}
            alt={title}
            onError={(evt) => {
              (evt.target as HTMLImageElement).src = 'https://via.placeholder.com/260x200';
            }}
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <FavoriteButton
            offerId={id}
            isFavorite={isFavorite}
            className="place-card"
            width={FAVORITE_BUTTON_SIZES[cardType === 'favorites' ? 'FAVORITES' : 'DEFAULT'].width}
            height={FAVORITE_BUTTON_SIZES[cardType === 'favorites' ? 'FAVORITES' : 'DEFAULT'].height}
            onClick={handleFavoriteClick}
          />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${calculateRatingWidth(rating)}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type.charAt(0).toUpperCase() + type.slice(1)}</p>
      </div>
    </article>
  );
}

export default memo(Card);
