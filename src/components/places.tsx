import CardComponent from './card';
import { PlacesComponentProps } from '../types';

type SortOption = {
  value: string;
  isActive: boolean;
};

type SortOptions = SortOption[];

const sortOptions: SortOptions = [
  {
    value: 'Popular',
    isActive: true
  },
  {
    value: 'Price: low to high',
    isActive: false
  },
  {
    value: 'Price: high to low',
    isActive: false
  },
  {
    value: 'Top rated first',
    isActive: false
  }
];

function renderSortOption(sortItem: SortOption): JSX.Element {
  const { value, isActive } = sortItem;
  return (
    <li key={value} className={`places__option ${isActive && 'places__option--active'}`} tabIndex={0}>
      {value}
    </li>
  );
}

export default function PlacesComponent({ placeCardsData, onMouseEnter, onMouseLeave }: PlacesComponentProps): JSX.Element {
  const numberOfPlaces = placeCardsData.length;

  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{numberOfPlaces} places to stay in Amsterdam</b>
      <form className="places__sorting" action="#" method="get">
        <span className="places__sorting-caption">Sort by</span>
        <span className="places__sorting-type" tabIndex={0}>
          Popular
          <svg className="places__sorting-arrow" width={7} height={4}>
            <use xlinkHref="#icon-arrow-select"></use>
          </svg>
        </span>
        <ul className="places__options places__options--custom places__options--opened">
          {sortOptions.map((item) => renderSortOption(item))}
        </ul>
      </form>
      <div className="cities__places-list places__list tabs__content">
        {placeCardsData.map((card) => (
          <CardComponent
            key={card.id}
            card={card}
            onMouseEnter={() => onMouseEnter?.(card.id)}
            onMouseLeave={onMouseLeave}
          />
        ))}
      </div>
    </section>
  );
}
