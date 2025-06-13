import { MainPageProps } from '../types';
import HeaderComponent from '../components/header';
import LocationListComponent from '../components/location-list';
import PlacesComponent from '../components/places';
import MapComponent from '../components/map';
import { useSelector } from 'react-redux';
import { selectCity } from '../redux/city-selectors';
import { selectOffers } from '../redux/offers-selectors';


function MainPage({ setActiveCard, activeCard }: MainPageProps): JSX.Element {

  const city = useSelector(selectCity);

  const allOffers = useSelector(selectOffers);

  const cityOffers = allOffers.filter((offer) => offer.city.name === city.city.name);

  const selectedOffer = activeCard
    ? cityOffers.find((offer) => offer.id === activeCard)
    : null;

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
            {cityOffers.length > 0 ? (
              <PlacesComponent
                placeCardsData={cityOffers}
                onMouseEnter={(id) => setActiveCard?.(id)}
                onMouseLeave={() => setActiveCard?.(null)}
              />
            ) : (
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">No places to stay available</b>
              </section>
            )}
            <div className="cities__right-section">
              <section className="cities__map map">
                {cityOffers.length > 0 && (
                  <MapComponent
                    city={city}
                    offers={cityOffers}
                    selectedOffer={selectedOffer}
                  />
                )}
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
