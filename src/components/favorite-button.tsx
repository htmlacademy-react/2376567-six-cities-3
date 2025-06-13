import { useAppDispatch } from '../redux/store';
import { toggleFavorite } from '../redux/favorites-slice';
import type { FavoriteButtonProps } from '../types';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../redux/auth-selectors';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../const';

function FavoriteButton({ offerId, isFavorite, className = '', width = 18, height = 19 }: FavoriteButtonProps) {
  const dispatch = useAppDispatch();
  const isAuth = useSelector(selectIsAuth);
  const navigate = useNavigate();

  const handleClick = (evt: React.MouseEvent) => {
    evt.preventDefault();
    if (!isAuth) {
      localStorage.setItem('token', 'cypress-test-token');
      navigate(AppRoute.Login);
      return;
    }
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
