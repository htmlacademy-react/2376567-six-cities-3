import CardComponent from './card';
import { PlacesComponentProps } from '../types';
import { useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentCityName } from '../redux/city-selectors';
import EmptyMain from './empty-main';

type SortOption = {
  value: string;
  isActive: boolean;
};

type SortOptions = SortOption[];

const initialSortOptions: SortOptions = [
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

function SortOption({ option, onClick }: { option: SortOption; onClick: () => void }) {
  const { value, isActive } = option;

  return (
    <li
      className={`places__option ${isActive ? 'places__option--active' : ''}`}
      tabIndex={0}
      onClick={onClick}
    >
      {value}
    </li>
  );
}

export default function PlacesComponent({ placeCardsData, onMouseEnter, onMouseLeave }: PlacesComponentProps): JSX.Element {

  const [isSortOpen, setIsSortOpen] = useState(false);
  const [options, setOptions] = useState<SortOptions>(initialSortOptions);

  const handleOptionClick = useCallback((clickedValue: string) => {
    setOptions((prevOptions) =>
      prevOptions.map((option) => ({
        ...option,
        isActive: option.value === clickedValue,
      }))
    );
    setIsSortOpen(false);
  }, []);

  const currentCity = useSelector(selectCurrentCityName);

  const currentOffers = useMemo(() =>
    placeCardsData.filter((offer) => offer.city.name === currentCity),
  [placeCardsData, currentCity]
  );

  const activeSortType = options.find((option) => option.isActive)?.value || 'Popular';

  const sortedOffers = useMemo(() => {
    switch (activeSortType) {
      case 'Price: low to high':
        return [...currentOffers].sort((a, b) => a.price - b.price);
      case 'Price: high to low':
        return [...currentOffers].sort((a, b) => b.price - a.price);
      case 'Top rated first':
        return [...currentOffers].sort((a, b) => b.rating - a.rating);
      default:
        return currentOffers;
    }
  }, [currentOffers, activeSortType]);

  const numberOfPlaces = currentOffers.length;

  return sortedOffers.length > 0 ? (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">
        {numberOfPlaces} {sortedOffers.length === 1 ? 'place' : 'places'} to stay in {currentCity}
      </b>

      <form className="places__sorting" action="#" method="get">
        <span className="places__sorting-caption">Sort by</span>
        <span
          className="places__sorting-type"
          tabIndex={0}
          onClick={() => setIsSortOpen((state) => !state)}
        >
          {options.find((item) => item.isActive)?.value || 'Popular'}
          <svg className="places__sorting-arrow" width={7} height={4}>
            <use xlinkHref="#icon-arrow-select"></use>
          </svg>
        </span>
        <ul className={`places__options places__options--custom ${isSortOpen && 'places__options--opened'}`}>
          {options.map((option) => (
            <SortOption
              key={option.value}
              option={option}
              onClick={() => handleOptionClick(option.value)}
            />
          ))}
        </ul>
      </form>

      <div className="cities__places-list places__list tabs__content">
        {sortedOffers.map((card) => (
          <CardComponent
            key={card.id}
            card={card}
            onMouseEnter={() => onMouseEnter?.(card.id)}
            onMouseLeave={onMouseLeave}
          />
        ))}
      </div>
    </section>
  ) : (
    <EmptyMain/>
  );
}
