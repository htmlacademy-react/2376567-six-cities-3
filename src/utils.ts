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

export { groupByCity };
