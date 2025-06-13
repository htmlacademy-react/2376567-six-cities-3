import { useEffect, useRef } from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../hooks/useMap';
import { URL_MARKER } from '../const';
import { MapProps } from '../types';

export default function MapComponent({ city, offers, selectedOffer }: MapProps) {

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (!map || !offers || !Array.isArray(offers)) {
      return;
    }

    const defaultCustomIcon = leaflet.icon({
      iconUrl: URL_MARKER.default,
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });

    const currentCustomIcon = leaflet.icon({
      iconUrl: URL_MARKER.current,
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });

    if (map) {
      map.eachLayer((layer) => {
        if (layer instanceof leaflet.Marker) {
          map.removeLayer(layer);
        }
      });

      offers.forEach((offer) => {
        leaflet
          .marker(
            {
              lat: offer.location.latitude,
              lng: offer.location.longitude,
            },
            {
              icon:
                offer.id === selectedOffer?.id
                  ? currentCustomIcon
                  : defaultCustomIcon,
            }
          )
          .addTo(map);
      });
    }
  }, [map, offers, selectedOffer]);

  return <div ref={mapRef} style={{ height: '100%' }}></div>;
}
