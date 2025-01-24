'use client';

import { useEffect, useMemo, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { generateRandomName } from '@/app/utils/RandomName';
// import { DummyLocationGenerator } from '../map/DummyLocationGenerator';

const apiKey = process.env.NEXT_PUBLIC_MAPS_API_KEY;

interface Location {
  id?: number;
  lat: number;
  lng: number;
  address: string;
  description: string;
  addedByUserId: string;
  imageUrl: string;
}

interface GooglePlace {
  place_id: string;
  name: string;
  formatted_address: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  rating?: number;
  user_ratings_total?: number;
  photos?: { photo_reference: string }[];
  addedByUserId?: string;
}

interface MapMarkerProps {
  map: google.maps.Map;
}

const MapMarker = ({ map }: MapMarkerProps) => {
  const router = useRouter();
  const [locations, setLocations] = useState<Location[]>([]);
  const [places, setPlaces] = useState<GooglePlace[]>([]);
  const infoWindowRef = useRef(new google.maps.InfoWindow());
  const markersRef = useRef<google.maps.Marker[]>([]);

  const markerIcons = useMemo(
    () => ['/leaf1.png', '/leaf2.png', '/leaf3.png'],
    []
  );

  useEffect(() => {
    async function fetchCoordinates() {
      try {
        const response = await fetch('/api/coordinates');
        const data = await response.json();
        setLocations(data);
      } catch (error) {
        console.error('Failed to fetch coordinates', error);
      }
    }
    fetchCoordinates();
  }, []);

  useEffect(() => {
    async function fetchGooglePlaces() {
      try {
        const response = await fetch('/api/places');
        const data = await response.json();
        if (data.results) {
          setPlaces(data.results);
        }
      } catch (error) {
        console.error('Failed to fetch Google Places data', error);
      }
    }
    fetchGooglePlaces();
  }, []);

  const clearMarkers = () => {
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];
  };

  const createMarkers = useCallback(
    (
      map: google.maps.Map,
      newLocations: Location[] | GooglePlace[],
      iconUrl: string,
      isGooglePlace = false
    ) => {
      if (!map || !newLocations.length) return;

      newLocations.forEach((location) => {
        const lat = isGooglePlace
          ? (location as GooglePlace).geometry.location.lat
          : (location as Location).lat;

        const lng = isGooglePlace
          ? (location as GooglePlace).geometry.location.lng
          : (location as Location).lng;

        const userName = generateRandomName();

        const marker = new google.maps.Marker({
          position: new google.maps.LatLng(lat, lng),
          map,
          icon: {
            url: iconUrl,
            scaledSize: new google.maps.Size(30, 30),
          },
        });

        marker.addListener('click', () => {
          const content = document.createElement('div');
          content.className =
            'p-3 m-0 max-w-sm text-2xl text-gray-700 shadow-md';

          const googleImageUrl =
            isGooglePlace && (location as GooglePlace).photos?.length
              ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${
                  (location as GooglePlace).photos?.[0]?.photo_reference
                }&key=${apiKey}`
              : null;

          const imageSrc = isGooglePlace
            ? googleImageUrl
            : (location as Location).imageUrl;

          content.innerHTML = `
            <h2 class="text-xl font-bold">${
              isGooglePlace
                ? (location as GooglePlace).name
                : (location as Location).address
            }</h2>
            <p class="mb-2 text-sm">${
              isGooglePlace
                ? (location as GooglePlace).formatted_address
                : (location as Location).description
            }</p>
            ${
              isGooglePlace
                ? `<p class="mb-2 text-sm">Rating: ${
                    (location as GooglePlace).rating || 'N/A'
                  } (${
                    (location as GooglePlace).user_ratings_total || 0
                  } reviews)</p>` +
                  `<p class="mb-2 text-sm"> Added by: ${userName}</p>`
                : `<p class="mb-2 text-sm"> Added by: ${
                    (location as Location).addedByUserId
                  }</p>`
            }
            ${
              imageSrc
                ? `<img src="${imageSrc}" class="w-full h-48 object-cover rounded-lg mb-4" />`
                : ''
            }
          `;

          const button = document.createElement('button');
          button.className =
            'text-white bg-green-500 hover:bg-green-700 rounded-lg text-sm px-4 py-2 text-center mt-2';
          button.textContent = 'View More Details';

          button.addEventListener('click', () => {
            if (isGooglePlace) {
              router.push(
                `/google-places/${(location as GooglePlace).place_id}`
              );
            } else {
              router.push(`/locations/${(location as Location).id}`);
            }
          });

          content.appendChild(button);
          infoWindowRef.current.setContent(content);
          infoWindowRef.current.open(map, marker);
        });

        markersRef.current.push(marker);
      });
    },
    [router]
  );

  useEffect(() => {
    if (map) {
      clearMarkers();
      if (locations.length > 0) {
        createMarkers(map, locations, `${markerIcons[0]}`);
      }
      if (places.length > 0) {
        createMarkers(map, places, `${markerIcons[1]}`, true);
      }
    }
  }, [map, locations, places, createMarkers, markerIcons]);

  //   // useEffect(() => {
  //   //   if (map && dummyLocations.length > 0) {
  //   //     createMarkers(map, dummyLocations, `${markerIcons[1]}`, false);
  //   //   }
  //   // }, [map, dummyLocations, createMarkers, markerIcons]);

  return null;
};

export default MapMarker;
