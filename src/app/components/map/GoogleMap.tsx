'use client';

import React, { useEffect, useRef, useState } from 'react';
import MapMarker from '../overlays/MapMarker';
// import { useMapTextOverlay } from '../overlays/MapTextOverlay';

interface MapOptions {
  center: google.maps.LatLngLiteral;
  zoom: number;
  minZoom: number;
  maxZoom: number;
  mapId: string;
}

const DEFAULT_CENTER = { lat: -41.289830130702704, lng: 174.76954279578203 };

const DEFAULT_ZOOM = 12;
const mapId = process.env.NEXT_PUBLIC_MAPS_ID;

const WELLINGTON_BOUNDS = {
  north: -40.6,
  south: -41.8,
  west: 173.5,
  east: 176.0,
};

export const GoogleMaps = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow | null>(
    null
  );

  useEffect(() => {
    if (ref.current && !map) {
      const newMap = new window.google.maps.Map(ref.current, {
        center: DEFAULT_CENTER,
        zoom: DEFAULT_ZOOM,
        minZoom: 1,
        maxZoom: 20,
        mapId: mapId,
        restriction: {
          latLngBounds: WELLINGTON_BOUNDS,
          strictBounds: false,
        },
      } as MapOptions);

      const newInfoWindow = new google.maps.InfoWindow();
      setMap(newMap);
      setInfoWindow(newInfoWindow);
    }
  }, [ref, map]);

  useEffect(() => {
    if (map && infoWindow) {
      map.addListener('click', (e: google.maps.MapMouseEvent) => {
        const latLng = e.latLng ? e.latLng.toJSON() : DEFAULT_CENTER;
        infoWindow.setContent(`
          <div class="rounded-lg px-0 py-0
                      text-lg relative max-w-[250px]">
            <button
              class="font-bold px-4 py-2 mt-2 rounded-lg border border-green-700
                    bg-green-600 text-white w-full hover:bg-green-500"
              onclick="window.location.href='./form?lat=${latLng.lat}&lng=${latLng.lng}'">
              🌱 Add New 🌱 
            </button>
          </div>
        `);

        infoWindow.setPosition(latLng || DEFAULT_CENTER);
        infoWindow.open(map);
      });
    }
  }, [map, infoWindow]);

  // useMapTextOverlay(map);

  return (
    <div className="w-full h-full ">
      <div
        ref={ref}
        className="w-full h-full border-4 border-gray-200 shadow-md bg-red-500"
      >
        {map && <MapMarker map={map} />}
      </div>
    </div>
  );
};

export default GoogleMaps;
