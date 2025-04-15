import { MainPageProps } from '../types';
import HeaderComponent from '../components/header';
import LocationListComponent from '../components/location-list';
import PlacesComponent from '../components/places';

function MainPage({ placeCardsData }: MainPageProps): JSX.Element {
  return (
    <div className="page page--gray page--main">

      <HeaderComponent />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">

            <LocationListComponent />

          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">

            <PlacesComponent placeCardsData = {placeCardsData}/>

            <div className="cities__right-section">
              <section className="cities__map map"></section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
