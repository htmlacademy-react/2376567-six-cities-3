import { AxiosInstance } from 'axios';
import { Dispatch, SetStateAction } from 'react';

type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
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

type PlacesComponentProps = {
  placeCardsData: OfferCard[];
  onMouseEnter?: (id: string) => void;
  onMouseLeave?: () => void;
};

type MainPageProps = {
  placeCardsData: OfferCard[];
  activeCard?: string | null;
  setActiveCard?: Dispatch<SetStateAction<string | null>>;
};

type LocationComponentProps = {
  location: CardGroup;
};

type PrivateRouteProps = {
  element: JSX.Element;
};

type Review = {
  id: string;
  date: string;
  comment: string;
  rating: number;
  user: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
};

type OfferPageProps = {
  offers: OfferCard[];
  activeCard?: string | null;
  setActiveCard?: Dispatch<SetStateAction<string | null>>;
}

type ReviewFormProps = {
  onSubmit: (data: { rating: number; comment: string }) => Promise<void> | void;
  loading?: boolean;
  error?: string | null;
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

type OffersState = {
  data: OfferCard[];
  currentOffer: OfferCard | null;
  nearbyOffers: OfferCard[];
  reviews: Review[];
  loading: boolean;
  nearbyLoading: boolean;
  reviewsLoading: boolean;
  reviewSubmitLoading: boolean;
  reviewSubmitError: string | null;
  error: string | null;
  nearbyError: string | null;
};

type CardProps = {
  card: OfferCard;
  onMouseEnter?: (id: string) => void;
  onMouseLeave?: () => void;
  cardType?: 'cities' | 'favorites' | 'near-places';
};

type AuthData = {
  email?: string;
  password: string;
};

type AuthInfo = {
  token: string;
};

type AuthState = {
  authorizationStatus: AuthorizationStatus;
  error: string | null;
  userEmail: string | null;
  isLoading: boolean;
}

type AuthResponse = AuthInfo & { email: string };

type ThunkConfig = {
  extra: { api: AxiosInstance };
};

type City = {
  name: string;
  location: Location;
}

type LocationItem = {
  name: string;
  isActive: boolean;
};

type LocationItemArray = LocationItem[];

type FavoriteButtonProps = {
  offerId: string;
  isFavorite: boolean | undefined;
  className?: string;
  width?: number;
  height?: number;
  onClick?: (e: React.MouseEvent) => void;
};

export enum AuthorizationStatus {
  AUTH = 'AUTH',
  NO_AUTH = 'NO_AUTH',
  UNKNOWN = 'UNKNOWN',
}

export type {
  MainPageProps,
  CardProps,
  Location,
  FavoritesData,
  CardGroup,
  OfferCard,
  OfferDetails,
  PlacesComponentProps,
  LocationComponentProps,
  PrivateRouteProps,
  OfferPageProps,
  Review,
  MapProps,
  Host,
  City,
  ReviewFormProps,
  ImageWithUUID,
  GoodWithUUID,
  NearPlacesProps,
  CityState,
  OffersState,
  AuthData,
  AuthInfo,
  AuthState,
  AuthResponse,
  ThunkConfig,
  LocationItem,
  LocationItemArray,
  FavoriteButtonProps
};
