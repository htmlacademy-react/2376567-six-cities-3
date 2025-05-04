import { AppRoute } from '../const';
import { FavoritesPage } from '../pages/favorites';
import { LoginPage } from '../pages/login-page';
import MainPage from '../pages/main-page';
import NotFoundPage from '../pages/not-found-page';
import { AppScreenProps } from '../types';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { groupByCity } from '../utils';
import PrivateRoute from './private-route';
import { OfferPage } from '../pages/offer';

function App({ placeCardsData }: AppScreenProps): JSX.Element {
  const isAuth = false;
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<MainPage placeCardsData={placeCardsData}/>}/>
        <Route path={AppRoute.Login} element={<LoginPage/>}/>
        <Route
          path={`${AppRoute.Offer}:id`}
          element={<OfferPage offers={placeCardsData} />}
        />
        <Route path={AppRoute.Favorites} element={
          <PrivateRoute isAuth={isAuth} element={<FavoritesPage data={groupByCity(placeCardsData)}/>}/>
        }
        />
        <Route path={AppRoute.Wildcard} element={<NotFoundPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
