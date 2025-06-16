import { City, LocationItemArray } from './types';

const AppRoute = {
  Main:'/',
  Login:'/login',
  Favorites:'/favorites',
  Offer:'/offer/',
  Wildcard:'*'
};

const URL_MARKER = {
  default: 'img/pin.svg',
  current: 'img/pin-active.svg',
};

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

const cities: City[] = [
  {
    name: 'Amsterdam',
    location: {
      latitude: 52.37454,
      longitude: 4.897976,
      zoom: 13
    }
  },
  {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13
    }
  },
  {
    name: 'Cologne',
    location: {
      latitude: 50.938361,
      longitude: 6.959974,
      zoom: 13
    }
  },
  {
    name: 'Brussels',
    location: {
      latitude: 50.846557,
      longitude: 4.351697,
      zoom: 13
    }
  },
  {
    name: 'Hamburg',
    location: {
      latitude: 53.550341,
      longitude: 10.000654,
      zoom: 13
    }
  },
  {
    name: 'Dusseldorf',
    location: {
      latitude: 51.225402,
      longitude: 6.776314,
      zoom: 13
    }
  }
];

const REVIEW_LENGTH = {
  MIN: 50,
  MAX: 300
} as const;

const FAVORITE_BUTTON_SIZES = {
  DEFAULT: { width: 18, height: 19 },
  FAVORITES: { width: 31, height: 33 },
} as const;

const CARD_IMAGE_SIZES = {
  favorites: {
    width: 150,
    height: 110,
  },
  default: {
    width: 260,
    height: 200,
  },
} as const;

export { AppRoute, URL_MARKER, locationItems, cities, REVIEW_LENGTH, FAVORITE_BUTTON_SIZES, CARD_IMAGE_SIZES };
