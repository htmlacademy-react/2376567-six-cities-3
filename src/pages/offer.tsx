import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { OfferDetails, OfferPageProps, ImageWithUUID, GoodWithUUID } from '../types';
import { ReviewsSection } from '../components/review';
import { generateUUIDKey, generateTextKey } from '../utils';
import MapComponent from '../components/map';
import NearPlacesComponent from '../components/near-places';
import { useSelector } from 'react-redux';
import { fetchNearbyOffers, fetchOfferById } from '../redux/offersSlice';
import Spinner from '../components/spinner/spinner';
import { useAppDispatch } from '../redux/store';
import NotFoundPage from './not-found-page';
import { selectLoading, selectError, selectCurrentOffer, selectNearbyOffers } from '../redux/offersSelectors';

export function OfferPage({ activeCard, setActiveCard }: OfferPageProps): JSX.Element {
  const { id } = useParams<{ id: string | undefined }>();
  const dispatch = useAppDispatch();

  const currentOffer = useSelector(selectCurrentOffer);
  const nearbyOffers = useSelector(selectNearbyOffers);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    if (id && (!currentOffer || currentOffer.id !== id)) {
      dispatch(fetchOfferById(id));
    }
  }, [id, dispatch, currentOffer]);

  useEffect(() => {
    if (id && currentOffer?.id === id) {
      dispatch(fetchNearbyOffers(id));
    }
  }, [id, dispatch, currentOffer?.id]);


  const selectedOffer = activeCard
    ? [...nearbyOffers, currentOffer].find((offer) => offer?.id === activeCard)
    : null;


  if (loading) {
    return <Spinner />;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!currentOffer) {
    return <NotFoundPage/>;
  }

  const offer: OfferDetails = {
    ...currentOffer,
    description: currentOffer.description,
    bedrooms: currentOffer.bedrooms,
    goods: currentOffer.goods,
    host: currentOffer.host,
    images: currentOffer.images,
    maxAdults: currentOffer.maxAdults,
  };

  const city = offer.city;

  const imagesWithId: ImageWithUUID[] = offer.images.map((url): ImageWithUUID => ({
    url,
    id: generateUUIDKey(),
  }));

  const goodsWithId: GoodWithUUID[] = offer.goods.map((goodItem): GoodWithUUID => ({
    goodItem,
    id: generateUUIDKey(),
  }));

  return (
    <main className="page__main page__main--offer">
      <section className="offer">
        <div className="offer__gallery-container container">
          <div className="offer__gallery">
            {imagesWithId.slice(0, 6).map((image) => (
              <div key={image.id} className="offer__image-wrapper">
                <img className="offer__image" src={image.url} alt={`Photo ${image.id}`} />
              </div>
            ))}
          </div>
        </div>

        <div className="offer__container container">
          <div className="offer__wrapper">
            {offer.isPremium && (
              <div className="offer__mark">
                <span>Premium</span>
              </div>
            )}

            <div className="offer__name-wrapper">
              <h1 className="offer__name">
                {offer.title}
              </h1>
              <button
                className={`offer__bookmark-button button ${offer.isFavorite ? 'offer__bookmark-button--active' : ''}`}
                type="button"
              >
                <svg className="offer__bookmark-icon" width="31" height="33">
                  <use xlinkHref="#icon-bookmark"></use>
                </svg>
                <span className="visually-hidden">
                  {offer.isFavorite ? 'In bookmarks' : 'To bookmarks'}
                </span>
              </button>
            </div>

            <div className="offer__rating rating">
              <div className="offer__stars rating__stars">
                <span style={{ width: `${Math.round(offer.rating) * 20}%` }}></span>
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="offer__rating-value rating__value">{offer.rating}</span>
            </div>

            <ul className="offer__features">
              <li className="offer__feature offer__feature--entire">
                {offer.type}
              </li>
              <li className="offer__feature offer__feature--bedrooms">
                {offer.bedrooms} Bedroom{offer.bedrooms !== 1 ? 's' : ''}
              </li>
              <li className="offer__feature offer__feature--adults">
                Max {offer.maxAdults} adult{offer.maxAdults !== 1 ? 's' : ''}
              </li>
            </ul>

            <div className="offer__price">
              <b className="offer__price-value">€{offer.price}</b>
              <span className="offer__price-text">&nbsp;night</span>
            </div>

            <div className="offer__inside">
              <h2 className="offer__inside-title">What&apos;s inside</h2>
              <ul className="offer__inside-list">
                {goodsWithId.map((good) => (
                  <li key={good.id} className="offer__inside-item">
                    {good.goodItem}
                  </li>
                ))}
              </ul>
            </div>

            <div className="offer__host">
              <h2 className="offer__host-title">Meet the host</h2>
              <div className="offer__host-user user">
                <div className={`offer__avatar-wrapper user__avatar-wrapper ${offer.host.isPro ? 'offer__avatar-wrapper--pro' : ''}`}>
                  <img
                    className="offer__avatar user__avatar"
                    src={offer.host.avatarUrl}
                    width="74"
                    height="74"
                    alt="Host avatar"
                  />
                </div>
                <span className="offer__user-name">
                  {offer.host.name}
                </span>
                {offer.host.isPro && (
                  <span className="offer__user-status">
                    Pro
                  </span>
                )}
              </div>

              <div className="offer__description">
                {offer.description.split('\n').map((paragraph, index) => (
                  <p key={generateTextKey(paragraph, index)} className="offer__text">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            <ReviewsSection offerId={id} />
          </div>
        </div>
        <section className="offer__map map">
          <MapComponent
            city={{city}}
            offers={nearbyOffers}
            selectedOffer={selectedOffer}
          />
        </section>
        <div className="container">
          <NearPlacesComponent
            offers={nearbyOffers.filter((nearbyoffer) => nearbyoffer.id !== id)}
            setActiveCard = {setActiveCard}
          />
        </div>
      </section>
    </main>
  );
}
