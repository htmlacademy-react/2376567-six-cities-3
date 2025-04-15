import { FavoritesComponentProps } from '../types';
import { LocationComponent } from '../components/location';

export function FavoritesComponent({ data }:FavoritesComponentProps): JSX.Element {
  const { locations } = data;

  return (
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
  );
}
