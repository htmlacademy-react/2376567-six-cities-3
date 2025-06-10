import { useAppDispatch } from '../redux/store';
import { toggleFavorite } from '../redux/favorites-slice';
import type { FavoriteButtonProps } from '../types';

function FavoriteButton({ offerId, isFavorite, className = '', width = 18, height = 19 }: FavoriteButtonProps) {
  const dispatch = useAppDispatch();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(toggleFavorite({ offerId, status: isFavorite ? 0 : 1 }));
  };

  return (
    <button
      className={`${className}__bookmark-button button ${isFavorite ? `${className}__bookmark-button--active` : ''}`}
      type="button"
      onClick={handleClick}
    >
      <svg className={`${className}__bookmark-icon`} width={width} height={height}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
    </button>
  );
}

export default FavoriteButton;
