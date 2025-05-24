import { AppRoute } from '../const';
import { FavoritesPage } from '../pages/favorites';
import { LoginPage } from '../pages/login-page';
import MainPage from '../pages/main-page';
import NotFoundPage from '../pages/not-found-page';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { groupByCity } from '../utils';
import PrivateRoute from './private-route';
import { OfferPage } from '../pages/offer';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loadOffers } from '../redux/offersSlice';
import { generateMockData } from '../mock/mocks';
import { selectOffers } from '../redux/offersSelectors';

function App(): JSX.Element {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadOffers(generateMockData(10)));
  },[dispatch]);

  const cityOffers = useSelector(selectOffers);
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const isAuth = true;

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<MainPage placeCardsData={cityOffers} activeCard={activeCard} setActiveCard={setActiveCard}/>}/>
        <Route path={AppRoute.Login} element={<LoginPage/>}/>
        <Route
          path={`${AppRoute.Offer}:id`}
          element={<OfferPage offers={cityOffers} activeCard={activeCard} setActiveCard = {setActiveCard}/>}
        />
        <Route path={AppRoute.Favorites} element={
          <PrivateRoute isAuth={isAuth} element={<FavoritesPage data={groupByCity(cityOffers)}/>}/>
        }
        />
        <Route path={AppRoute.Wildcard} element={<NotFoundPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
