import { cities } from '../const';
import { useDispatch, useSelector } from 'react-redux';
import { changeCity } from '../redux/city-slice';
import { selectCurrentCityName } from '../redux/city-selectors';
import type { LocationItem } from '../types';
import { locationItems } from '../const';
import { memo } from 'react';

const LocationItemComponent = memo(({ locationItem }: { locationItem: LocationItem }): JSX.Element => {
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
});

LocationItemComponent.displayName = 'LocationItem';

export default function LocationListComponent(): JSX.Element {
  const currentCity = useSelector(selectCurrentCityName);
  const updatedLocationItems = locationItems.map((item) => ({
    ...item,
    isActive: item.name === currentCity
  }));

  return (
    <ul className="locations__list tabs__list">
      {updatedLocationItems.map((item) => <LocationItemComponent key={item.name} locationItem={item} />)}
    </ul>
  );
}
