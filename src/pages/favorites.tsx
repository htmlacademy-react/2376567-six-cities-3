import { useEffect } from 'react';
import { useAppDispatch } from '../redux/store';
import { fetchFavorites } from '../redux/favorites-slice';
import { calculateRatingWidth, groupByCity } from '../utils';
import HeaderComponent from '../components/header';
import { Link } from 'react-router-dom';
import { AppRoute } from '../const';
import FavoriteButton from '../components/favorite-button';
import { useSelector } from 'react-redux';
import { selectFavorites, selectFavoritesError, selectFavoritesLoading } from '../redux/favorites-selectors';
import Spinner from '../components/spinner/spinner';

function FavoritesPage() {
  const dispatch = useAppDispatch();
  const favorites = useSelector(selectFavorites);
  const loading = useSelector(selectFavoritesLoading);
  const error = useSelector(selectFavoritesError);

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  if (loading) {
    <Spinner/>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const groupedFavorites = groupByCity(favorites);

  return (
    <div className="page">
      <HeaderComponent />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          {favorites.length === 0 ? (
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
              </div>
            </section>
          ) : (
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {groupedFavorites.locations.map((location) => (
                  <li className="favorites__locations-items" key={location.name}>
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <Link className="locations__item-link" to={`${AppRoute.Main}?city=${location.name}`}>
                          <span>{location.name}</span>
                        </Link>
                      </div>
                    </div>
                    <div className="favorites__places">
                      {location.cards.map((card) => (
                        <article className="favorites__card place-card" key={card.id}>
                          {card.isPremium && (
                            <div className="place-card__mark">
                              <span>Premium</span>
                            </div>
                          )}
                          <div className="favorites__image-wrapper place-card__image-wrapper">
                            <Link to={`${AppRoute.Offer}/${card.id}`}>
                              <img
                                className="place-card__image"
                                src={card.previewImage}
                                width={150}
                                height={110}
                                alt="Place image"
                              />
                            </Link>
                          </div>
                          <div className="favorites__card-info place-card__info">
                            <div className="place-card__price-wrapper">
                              <div className="place-card__price">
                                <b className="place-card__price-value">&euro;{card.price}</b>
                                <span className="place-card__price-text">&#47;&nbsp;night</span>
                              </div>
                              <FavoriteButton
                                offerId={card.id}
                                isFavorite={card.isFavorite}
                                className="place-card"
                                width={18}
                                height={19}
                              />
                            </div>
                            <div className="place-card__rating rating">
                              <div className="place-card__stars rating__stars">
                                <span style={{ width: `${(calculateRatingWidth(card.rating))}%` }}></span>
                                <span className="visually-hidden">Rating</span>
                              </div>
                            </div>
                            <h2 className="place-card__name">
                              <Link to={`${AppRoute.Offer}/${card.id}`}>{card.title}</Link>
                            </h2>
                            <p className="place-card__type">{card.type}</p>
                          </div>
                        </article>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}

export default FavoritesPage;
