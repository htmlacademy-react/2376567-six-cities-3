import { MainPageProps } from '../types';
import Header from '../components/header';
import LocationList from '../components/location-list';
import Places from '../components/places';
import Map from '../components/map';
import { useSelector } from 'react-redux';
import { selectCity } from '../redux/city-selectors';
import { selectOffers } from '../redux/offers-selectors';
import EmptyMain from '../components/empty-main';


function MainPage({ setActiveCard, activeCard }: MainPageProps): JSX.Element {

  const city = useSelector(selectCity);

  const allOffers = useSelector(selectOffers);

  const cityOffers = allOffers.filter((offer) => offer.city.name === city.city.name);

  const selectedOffer = activeCard
    ? cityOffers.find((offer) => offer.id === activeCard)
    : null;

  return (
    <div className="page page--gray page--main">
      <Header />
      <main className={`page__main page__main--index ${cityOffers.length === 0 ? 'page__main--index-empty' : ''}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <LocationList />
          </section>
        </div>
        <div className="cities">
          <div className={`cities__places-container ${cityOffers.length === 0 ? 'cities__places-container--empty' : ''} container`}>
            {cityOffers.length > 0 ? (
              <Places
                placeCardsData={cityOffers}
                onMouseEnter={(id) => setActiveCard?.(id)}
                onMouseLeave={() => setActiveCard?.(null)}
              />
            ) : (
              <EmptyMain/>
            )}
            <div className="cities__right-section">
              {cityOffers.length > 0 && (
                <section className="cities__map map">
                  <Map
                    city={city}
                    offers={cityOffers}
                    selectedOffer={selectedOffer}
                  />
                </section>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
