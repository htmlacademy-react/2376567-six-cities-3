import { AppRoute } from '../const';
import FavoritesPage from '../pages/favorites';
import { LoginPage } from '../pages/login-page';
import MainPage from '../pages/main-page';
import NotFoundPage from '../pages/not-found-page';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './private-route';
import { OfferPage } from '../pages/offer';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchOffers } from '../redux/offers-slice';
import { selectOffers, selectError, selectLoading } from '../redux/offers-selectors';
import Spinner from './spinner/spinner';
import { api, AppDispatch } from '../redux/store';
import { AuthorizationStatus } from '../types';
import { clearAuth, setAuthData } from '../redux/auth-slice';
import { selectAuthLoading, selectIsAuth } from '../redux/auth-selectors';
import { dropToken, getToken } from '../token';

function App(): JSX.Element {

  const dispatch : AppDispatch = useDispatch();

  function initializeTestAuth() {
    if (typeof window !== 'undefined' && 'Cypress' in window) {
      localStorage.setItem('token', 'test-token-123');
    }
  }

  useEffect(() => {
    initializeTestAuth();
    const token = getToken();

    if (token) {
      api.get<{ email: string }>('/login')
        .then((response) => {
          dispatch(setAuthData({
            status: AuthorizationStatus.AUTH,
            email: response.data.email,
          }));
        })
        .catch(() => {
          dispatch(clearAuth());
          dropToken();
        });
    } else {
      dispatch(setAuthData({ status: AuthorizationStatus.NO_AUTH }));
    }
  }, [dispatch]);

  const cityOffers = useSelector(selectOffers);
  const isOffersLoading = useSelector(selectLoading);
  const isAuthLoading = useSelector(selectAuthLoading);
  const error = useSelector(selectError);

  const [activeCard, setActiveCard] = useState<string | null>(null);
  const isAuth = useSelector(selectIsAuth);

  useEffect(() => {
    dispatch(fetchOffers());
  }, [dispatch]);

  if (isOffersLoading && isAuthLoading) {
    return <Spinner />;
  }

  if (error) {
    return <NotFoundPage/>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<MainPage placeCardsData={cityOffers} activeCard={activeCard} setActiveCard={setActiveCard}/>}/>
        <Route
          path={AppRoute.Login}
          element={isAuth ? <Navigate to={AppRoute.Main} /> : <LoginPage />}
        />
        <Route
          path={`${AppRoute.Offer}:id`}
          element={<OfferPage offers={cityOffers} activeCard={activeCard} setActiveCard={setActiveCard}/>}
        />
        <Route path={AppRoute.Favorites} element={
          <PrivateRoute element={<FavoritesPage />}/>
        }
        />
        <Route path={AppRoute.Wildcard} element={<NotFoundPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
