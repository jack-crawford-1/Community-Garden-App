import { useEffect, useState } from 'react';

interface Location {
  id: number;
  lat: string;
  lng: string;
  address: string;
  description: string;
  addedByUserId: string;
  imageUrl: string;
}

interface MapMarkerProps {
  map: google.maps.Map;
}

const MapMarker = ({ map }: MapMarkerProps) => {
  const [locations, setLocations] = useState<Location[]>([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const infoWindow = new google.maps.InfoWindow();

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
    const icon = {
      url: '/garden.png',
      scaledSize: new google.maps.Size(100, 100),
    };
    if (map && locations.length > 0) {
      locations.forEach((location) => {
        const marker = new google.maps.Marker({
          position: new google.maps.LatLng(
            Number(location.lat),
            Number(location.lng)
          ),
          map: map,
          icon: icon,
        });

        marker.addListener('click', () => {
          const contentString = `<div class="p-3 m-0 max-w-sm text-2xl text-gray-700 shadow-md">
            <h2 class="text-xl font-bold">${location.address}</h2>
            <p class="mb-2 text-sm">${location.description}</p>
            <p class="mb-2 text-sm"> Added by: ${location.addedByUserId}</p>
            <img src="${location.imageUrl}" class="w-full h-48 object-cover rounded-lg mb-4" />
            <button class="text-white bg-green-500 hover:bg-green-700 rounded-lg text-sm m-0 px-4 py-2 text-center" onclick="window.location.href='/locations/${location.id}'">More Info</button>
          </div>`;
          infoWindow.setContent(contentString);
          infoWindow.open(map, marker);
        });
      });
    }
  }, [map, locations, infoWindow]);

  return null;
};

export default MapMarker;
