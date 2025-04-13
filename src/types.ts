type PlaceCard = {
  id: number;
  isPremium: boolean;
  image: string;
  price: number;
  isFavorite: boolean;
  rating: number;
  title: string;
  type: string;
}

type AppScreenProps = {
  cardsData: PlaceCard[];
}

type CardProps = {
  card: PlaceCard;
};

type MainPageProps = {
  cardsData: PlaceCard[];
}

export type {PlaceCard, MainPageProps, CardProps, AppScreenProps};
