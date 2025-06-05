import { FavoritesPageProps } from '../types';
import { LocationComponent } from '../components/location';
import HeaderComponent from '../components/header';

export function FavoritesPage({ data }:FavoritesPageProps): JSX.Element {
  const { locations } = data;

  return (
    <>
      <HeaderComponent />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {locations.map((location) => (
                <LocationComponent key={location.name} location={location} />
              ))}
            </ul>
          </section>
        </div>
      </main>
    </>
  );
}
