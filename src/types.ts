import { Dispatch, SetStateAction } from 'react';

type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
};

// type City = {
//   name: string;
//   location: Location;
// };

type City = {
  name: string;
  location: Location;
}

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

// type CardProps = {
//   card: OfferCard;
//   onMouseEnter?: (id: string) => void;
//   onMouseLeave?: () => void;
// };

type PlacesComponentProps = {
  placeCardsData: OfferCard[];
  onMouseEnter?: (id: string) => void;
  onMouseLeave?: () => void;
};

// type AppScreenProps = {
//   placeCardsData: OfferCard[];
// };

type MainPageProps = {
  placeCardsData: OfferCard[];
  activeCard?: string | null;
  setActiveCard?: Dispatch<SetStateAction<string | null>>;
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
  activeCard?: string | null;
  setActiveCard?: Dispatch<SetStateAction<string | null>>;
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
    city: CityState;
    offers: OfferCard[];
    selectedOffer?: OfferCard | null;
    className?: string;
  };

  type NearPlacesProps = {
    offers: OfferCard[];
    setActiveCard?: Dispatch<SetStateAction<string | null>>;
    onMouseEnter?: (id: string) => void;
    onMouseLeave?: () => void;
  };

  type CityState = {
    city: City;
}

type OffersState = OfferCard[];

type CardProps = {
  card: OfferCard;
  onMouseEnter?: (id: string) => void;
  onMouseLeave?: () => void;
  cardType?: 'cities' | 'favorites' | 'near-places';
};

export type {
  MainPageProps,
  CardProps,
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
  NearPlacesProps,
  CityState,
  OffersState,
};
