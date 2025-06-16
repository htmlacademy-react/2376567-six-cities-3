import { OfferCard, FavoritesData } from './types';

function groupByCity(cards: OfferCard[]): FavoritesData {
  const groups: Record<string, OfferCard[]> = {};

  cards.forEach((card) => {
    if (!groups[card.city.name]) {
      groups[card.city.name] = [];
    }
    groups[card.city.name].push(card);
  });

  return {
    locations: Object.entries(groups).map(([cityName, cityCards]) => ({
      name: cityName,
      cards: cityCards,
    })),
  };
}

const calculateRatingWidth = (rating:number) => rating * 20;

const generateUUIDKey = (): `${string}-${string}-${string}-${string}-${string}` => crypto.randomUUID();

const generateTextKey = (text: string, index: number):string => `${text.substring(0, 10)}-${index}`;

const getRandomInt = (min:number, max:number) => Math.floor(Math.random() * (max - min + 1)) + min;

export { groupByCity, generateUUIDKey, generateTextKey, getRandomInt, calculateRatingWidth};
