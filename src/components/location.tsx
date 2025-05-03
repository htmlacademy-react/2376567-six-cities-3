import { Link } from 'react-router-dom';
import { LocationComponentProps } from '../types';
import CardComponent from './card';
import { AppRoute } from '../const';

export function LocationComponent({ location }: LocationComponentProps): JSX.Element {
  const { name, cards } = location;

  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link className="locations__item-link" to={`${AppRoute.Main}?city=${name}`}>
            <span>{name}</span>
          </Link>
        </div>
      </div>
      <div className="favorites__places">
        {cards.map((card) => (
          <CardComponent key={card.id} card={card} />
        ))}
      </div>
    </li>
  );
}
