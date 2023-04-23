import leaflet, { FeatureGroup, Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef, useState } from 'react';
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../../const';
import { useAppSelector } from '../../hooks/use-redux';
import { citySelector } from '../../store/selectors';
import { Offers } from '../../types/offers';

type MapProp = {
  activeOffer: number | null;
  cn: string;
  offers: Offers | null;
}

const defaultCustomIcon = leaflet.icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const currentCustomIcon = leaflet.icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const Map = ({activeOffer, offers, cn}: MapProp):JSX.Element => {
  const mapRef = useRef(null);
  const [map, setMap] = useState<leaflet.Map | null>(null);
  const isRenderedRef = useRef(false);
  const city = useAppSelector(citySelector);
  const [markersGroup] = useState<FeatureGroup>(new FeatureGroup());

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = leaflet.map(mapRef.current, {
        center: {
          lat: city.location.latitude,
          lng: city.location.longitude,
        },
        zoom: city.location.zoom,
      });

      leaflet
        .tileLayer(
          'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
          {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          },
        )
        .addTo(instance);

      setMap(instance);
      isRenderedRef.current = true;
    } else if (map) {
      map.panTo([city.location.latitude, city.location.longitude]);
    }
  }, [mapRef, offers, city, map]);

  useEffect(() => {
    if (map && offers) {
      markersGroup.clearLayers();
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude
        });

        marker.setIcon(activeOffer && offer.id === activeOffer ? currentCustomIcon : defaultCustomIcon);
        markersGroup.addLayer(marker);
      });
      markersGroup.addTo(map);
    }
  }, [map, offers, activeOffer, markersGroup]);

  return (
    <section className={`${cn} map`}
      ref={mapRef}
    >
    </section>
  );
};

export default Map;
