type LocationItem = {
  name: string;
  isActive: boolean;
}

type LocationItemArray = LocationItem[];

const locationItems: LocationItemArray = [
  {
    name: 'Paris',
    isActive: false
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
    isActive: true
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

function renderLocationItem(locationItem: LocationItem): JSX.Element {

  const {
    name,
    isActive
  } = locationItem;

  return (
    <li key={name} className="locations__item">
      <a className={`locations__item-link tabs__item ${isActive && ('tabs__item--active')}`} href="#">
        <span>{name}</span>
      </a>
    </li>
  );
}

export default function LocationListComponent(): JSX.Element {

  return (
    <div>
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {locationItems.map((item) => renderLocationItem(item))}
        </ul>
      </section>
    </div>
  );
}
