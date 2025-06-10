import { Link } from 'react-router-dom';
import { AppRoute } from '../const';
import { CardProps} from '../types';
import FavoriteButton from './favorite-button';
import { useAppDispatch } from '../redux/store';
import { selectOffers } from '../redux/offers-selectors';
import { useSelector } from 'react-redux';
import { toggleFavorite } from '../redux/favorites-slice';
import { selectFavorites } from '../redux/favorites-selectors';

export default function CardComponent({
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

  const currentCard = offers.find((o) => o.id === card.id) || card;
  const isFavorite = favorites.some((fav) => fav.id === card.id) || currentCard.isFavorite;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(toggleFavorite({
      offerId: currentCard.id,
      status: currentCard.isFavorite ? 0 : 1
    }));
  };

  const handleMouseEnter = () => onMouseEnter?.(id);
  const handleMouseLeave = () => onMouseLeave?.();

  const ratingWidth = `${Math.round(rating) * 20}%`;

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
            width={cardType === 'favorites' ? 150 : 260}
            height={cardType === 'favorites' ? 110 : 200}
            alt={title}
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/260x200';
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
            className={'place-card'}
            width={cardType === 'favorites' ? 18 : 18}
            height={cardType === 'favorites' ? 19 : 19}
            onClick={handleFavoriteClick}
          />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: ratingWidth }}></span>
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
