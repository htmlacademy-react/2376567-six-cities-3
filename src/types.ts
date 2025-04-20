type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
};

type City = {
  name: string;
  location: Location;
};

type Host = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
};

type OfferCard = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  description: string;
  bedrooms: number;
  goods: string[];
  host: Host;
  images: string[];
  maxAdults: number;
};

type CardGroup = {
  name: string;
  cards: OfferCard[];
};

type FavoritesData = {
  locations: CardGroup[];
};

type CardProps = {
  card: OfferCard;
};

type PlacesComponentProps = {
  placeCardsData: OfferCard[];
};

type AppScreenProps = {
  placeCardsData: OfferCard[];
};

type MainPageProps = {
  placeCardsData: OfferCard[];
};

type LocationComponentProps = {
  location: CardGroup;
};

type FavoritesPageProps = {
  data: FavoritesData;
};

type PrivateRouteProps = {
  isAuth:boolean;
  element:JSX.Element;
};

export type {
  MainPageProps,
  CardProps,
  AppScreenProps,
  Location,
  FavoritesData,
  FavoritesPageProps,
  CardGroup,
  OfferCard,
  PlacesComponentProps,
  LocationComponentProps,
  PrivateRouteProps
};
