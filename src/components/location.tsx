import { LocationComponentProps } from '../types';
import CardComponent from './card';

export function LocationComponent({ location }: LocationComponentProps): JSX.Element {
  const { name, cards } = location;

  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>{name}</span>
          </a>
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
