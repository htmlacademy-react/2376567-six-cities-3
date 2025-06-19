import { useSelector, useDispatch } from 'react-redux';
import { selectIsAuth, selectUserEmail } from '../redux/auth-selectors';
import { selectFavoritesCount } from '../redux/favorites-selectors';
import { setAuthorizationStatus } from '../redux/auth-slice';
import { dropToken } from '../token';
import { AuthorizationStatus } from '../types';
import { Link } from 'react-router-dom';
import { AppRoute } from '../const';
import { fetchFavorites } from '../redux/favorites-slice';
import { useEffect } from 'react';
import { AppDispatch } from '../redux/store';

export default function Navigation(): JSX.Element {
  const isAuth = useSelector(selectIsAuth);
  const userEmail = useSelector(selectUserEmail);
  const favoritesCount = useSelector(selectFavoritesCount);
  const dispatch: AppDispatch = useDispatch();


  useEffect(() => {
    if (isAuth) {
      dispatch(fetchFavorites());
    }
  }, [dispatch, isAuth]);

  const handleSignOut = () => {
    dropToken();
    dispatch(setAuthorizationStatus(AuthorizationStatus.NO_AUTH));
  };

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        {isAuth ? (
          <>
            <li className="header__nav-item user">
              <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                <span className="header__user-name user__name">{userEmail}</span>
                <span className="header__favorite-count">{favoritesCount}</span>
              </Link>
            </li>
            <li className="header__nav-item">
              <a className="header__nav-link" onClick={handleSignOut}>
                <span className="header__signout">Sign out</span>
              </a>
            </li>
          </>
        ) : (
          <li className="header__nav-item user">
            <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
              <div className="header__avatar-wrapper user__avatar-wrapper"></div>
              <span className="header__login">Sign in</span>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
