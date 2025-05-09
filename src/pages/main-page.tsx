import { MainPageProps } from '../types';
import HeaderComponent from '../components/header';
import LocationListComponent from '../components/location-list';
import PlacesComponent from '../components/places';
import MapComponent from '../components/map';
import { cities } from '../mock/mocks';
import { useState } from 'react';

function MainPage({ placeCardsData }: MainPageProps): JSX.Element {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const amsterdam = cities.find((city) => city.name === 'Amsterdam')!;

  const amsterdamOffers = placeCardsData.filter(
    (offer) => offer.city.name === 'Amsterdam'
  );

  const selectedOffer = activeCard
    ? amsterdamOffers.find((offer) => offer.id === activeCard)
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
            <PlacesComponent
              placeCardsData={amsterdamOffers}
              onMouseEnter={(id) => setActiveCard(id)}
              onMouseLeave={() => setActiveCard(null)}
            />

            <div className="cities__right-section">
              <section className="cities__map map">
                <MapComponent
                  city={amsterdam}
                  offers={amsterdamOffers}
                  selectedOffer={selectedOffer}
                />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
