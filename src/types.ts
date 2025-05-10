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
  previewImage?: string;
};

type OfferDetails = OfferCard & {
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
  onMouseEnter?: (id: string) => void;
  onMouseLeave?: () => void;
};

type PlacesComponentProps = {
  placeCardsData: OfferCard[];
  onMouseEnter?: (id: string) => void;
  onMouseLeave?: () => void;
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
  isAuth: boolean;
  element: JSX.Element;
};

type ActiveCardType = string | null;

type Review = {
  id: string;
  date: string;
  user: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
  comment: string;
  rating: number;
};

type OfferPageProps = {
  offers: OfferCard[];
}

type ReviewFormProps = {
  onSubmit: (data: { rating: number; review: string }) => void;
};

type ReviewsSectionProps = {
  reviews: Review[];
  onReviewSubmit: (data: { rating: number; review: string }) => void;
};

type ImageURL = string;
  type GoodItem = string;

  type ImageWithUUID = {
    url: ImageURL;
    id: string;
  };

  type GoodWithUUID = {
    goodItem: GoodItem;
    id: string;
  };

  type MapProps = {
    city: City;
    offers: OfferCard[];
    selectedOffer?: OfferCard | null;
    className?: string;
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
  OfferDetails,
  PlacesComponentProps,
  LocationComponentProps,
  PrivateRouteProps,
  ActiveCardType,
  OfferPageProps,
  Review,
  MapProps,
  Host,
  City,
  ReviewFormProps,
  ReviewsSectionProps,
  ImageWithUUID,
  GoodWithUUID,
};
