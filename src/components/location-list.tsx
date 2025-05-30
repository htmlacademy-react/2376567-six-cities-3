import { cities } from '../mock/mocks';
import { useDispatch, useSelector } from 'react-redux';
import { changeCity } from '../redux/citySlice';
import { selectCurrentCityName } from '../redux/citySelectors';

type LocationItem = {
  name: string;
  isActive: boolean;
};

type LocationItemArray = LocationItem[];

const locationItems: LocationItemArray = [
  {
    name: 'Paris',
    isActive: true
  },
  {
    name: 'Cologne',
    isActive: false
  },
  {
    name: 'Brussels',
    isActive: false
  },
  {
    name: 'Amsterdam',
    isActive: false
  },
  {
    name: 'Hamburg',
    isActive: false
  },
  {
    name: 'Dusseldorf',
    isActive: false
  },
];

function LocationItem(locationItem: LocationItem): JSX.Element {
  const { name, isActive } = locationItem;
  const dispatch = useDispatch();

  return (
    <li key={name} className="locations__item">
      <a
        className={`locations__item-link tabs__item ${isActive ? 'tabs__item--active' : ''}`}
        onClick={(evt) => {
          evt.preventDefault();
          const newCity = cities.find((city) => city.name === name);
          if (newCity) {
            dispatch(changeCity({
              name: newCity.name,
              location: newCity.location
            }));
          }
        }}
      >
        <span>{name}</span>
      </a>
    </li>
  );
}

export default function LocationListComponent(): JSX.Element {
  const currentCity = useSelector(selectCurrentCityName);
  const updatedLocationItems = locationItems.map((item) => ({
    ...item,
    isActive: item.name === currentCity
  }));

  return (
    <div>
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {updatedLocationItems.map((item) => LocationItem(item))}
        </ul>
      </section>
    </div>
  );
}
