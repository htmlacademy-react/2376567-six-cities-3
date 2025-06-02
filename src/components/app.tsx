import { AppRoute } from '../const';
import { FavoritesPage } from '../pages/favorites';
import { LoginPage } from '../pages/login-page';
import MainPage from '../pages/main-page';
import NotFoundPage from '../pages/not-found-page';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { groupByCity } from '../utils';
import PrivateRoute from './private-route';
import { OfferPage } from '../pages/offer';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchOffers } from '../redux/offersSlice';
import { selectOffers, selectError, selectLoading } from '../redux/offersSelectors';
import Spinner from './spinner/spinner';
import { AppDispatch } from '../redux/store';
import { AuthorizationStatus } from '../types';
import { setAuthorizationStatus } from '../redux/authSlice';
import { selectIsAuth } from '../redux/authSelectors';
import { getToken } from '../token';

function App(): JSX.Element {

  const dispatch : AppDispatch = useDispatch();

  const cityOffers = useSelector(selectOffers);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [activeCard, setActiveCard] = useState<string | null>(null);
  const isAuth = useSelector(selectIsAuth);

  useEffect(() => {
    dispatch(fetchOffers());

    const token = getToken();
    dispatch(setAuthorizationStatus(token ? AuthorizationStatus.AUTH : AuthorizationStatus.NO_AUTH));
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
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
          <PrivateRoute element={<FavoritesPage data={groupByCity(cityOffers)}/>}/>
        }
        />
        <Route path={AppRoute.Wildcard} element={<NotFoundPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
