import { calculateRatingWidth, groupByCity } from '../utils';
import Header from '../components/header';
import { Link } from 'react-router-dom';
import { AppRoute, CARD_IMAGE_SIZES, FAVORITE_BUTTON_SIZES } from '../const';
import FavoriteButton from '../components/favorite-button';
import { useSelector } from 'react-redux';
import { selectFavorites, selectFavoritesLoading } from '../redux/favorites-selectors';
import Spinner from '../components/spinner/spinner';

function FavoritesPage() {
  const favorites = useSelector(selectFavorites);
  const loading = useSelector(selectFavoritesLoading);

  if (loading) {
    <Spinner/>;
  }

  const groupedFavorites = groupByCity(favorites);

return (
  <div className={`page ${!loading && favorites.length === 0 ? 'page--favorites-empty' : ''}`}>
    <Header />
    <main className={`page__main page__main--favorites ${!loading && favorites.length === 0 ? 'page__main--favorites-empty' : ''}`}>
      <div className="page__favorites-container container">
        {loading ? (
          <Spinner />
        ) : favorites.length > 0 ? (
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
                              width={CARD_IMAGE_SIZES.favorites.width}
                              height={CARD_IMAGE_SIZES.favorites.height}
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
                              width={FAVORITE_BUTTON_SIZES.DEFAULT.width}
                              height={FAVORITE_BUTTON_SIZES.DEFAULT.height}
                            />
                          </div>
                          <div className="place-card__rating rating">
                            <div className="place-card__stars rating__stars">
                              <span style={{ width: `${calculateRatingWidth(card.rating)}%` }}></span>
                              <span className="visually-hidden">Rating</span>
                            </div>
                          </div>
                          <h2 className="place-card__name">
                            <Link to={`${AppRoute.Offer}/${card.id}`}>{card.title}</Link>
                          </h2>
                          <p className="place-card__type">{card.type.charAt(0).toUpperCase() + card.type.slice(1)}</p>
                        </div>
                      </article>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ) : (
          <section className="favorites favorites--empty">
            <h1 className="visually-hidden">Favorites (empty)</h1>
            <div className="favorites__status-wrapper">
              <b className="favorites__status">Nothing yet saved.</b>
              <p className="favorites__status-description">
                Save properties to narrow down search or plan your future trips.
              </p>
            </div>
          </section>
        )}
      </div>
    </main>
    <footer className="footer">
      <Link className="footer__logo-link" to="/">
        <img
          className="footer__logo"
          src="img/logo.svg"
          alt="6 cities logo"
          width={64}
          height={33}
        />
      </Link>
    </footer>
  </div>
);
}

export default FavoritesPage;
