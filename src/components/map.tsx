import { useEffect, useRef } from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../hooks/use-map';
import { URL_MARKER } from '../const';
import { MapProps } from '../types';

const MAP_HEIGHT = '100%';

const MARKER_CONFIG = {
  SIZE: [27, 39] as [number, number],
  ANCHOR: [13.5, 40] as [number, number],
} as const;

export default function Map({ city, offers, selectedOffer }: MapProps) {

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (!map || !offers || !Array.isArray(offers)) {
      return;
    }

    const defaultCustomIcon = leaflet.icon({
      iconUrl: URL_MARKER.default,
      iconSize: MARKER_CONFIG.SIZE,
      iconAnchor: MARKER_CONFIG.ANCHOR,
    });

    const currentCustomIcon = leaflet.icon({
      iconUrl: URL_MARKER.current,
      iconSize: MARKER_CONFIG.SIZE,
      iconAnchor: MARKER_CONFIG.ANCHOR,
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

  return <div ref={mapRef} style={{ height: MAP_HEIGHT }}></div>;
}
