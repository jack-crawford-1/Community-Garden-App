import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import { Result, Welcome } from '../../types/GooglePlaces';

const apiKey = process.env.NEXT_PUBLIC_MAPS_API_KEY;

const GooglePlaces: React.FC = () => {
  const [places, setPlaces] = useState<Result[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchPlaces();
  }, []);

  const fetchPlaces = async () => {
    setLoading(true);

    try {
      const response = await fetch('/api/places');
      const data: Welcome = await response.json();
      setPlaces(data.results);
    } catch (error) {
      console.error('Error fetching places:', error);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h1 className="text-2xl font-bold my-5">
        Community Gardens in New Zealand
      </h1>

      {loading ? (
        <p>Loading community gardens...</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-4 w-full px-5">
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {places.map((place) => (
              <li
                key={place.place_id}
                className="flex flex-col items-center justify-between bg-green-500 text-white p-6 rounded-xl shadow-md max-w-md"
              >
                <h2 className="text-lg font-semibold">{place.name}</h2>

                <p className="text-sm text-gray-200">
                  {place.formatted_address}
                </p>

                <p className="text-sm font-medium mt-2">
                  Rating: {place.rating || 'N/A'}
                </p>
                <p className="text-sm font-medium">
                  Total ratings:{' '}
                  {place.user_ratings_total
                    ? place.user_ratings_total.toLocaleString()
                    : 'N/A'}
                </p>

                <p className="text-sm font-medium mt-2">
                  Business Status: {place.business_status}
                </p>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${place.geometry.location.lat},${place.geometry.location.lng}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-medium underline mt-2"
                >
                  View on Google Maps
                </a>

                <p className="text-sm font-medium mt-2">
                  Lat: {place.geometry.location.lat}, Lng:{' '}
                  {place.geometry.location.lng}
                </p>

                <p className="text-sm font-medium">
                  Viewport: NE ({place.geometry.viewport.northeast.lat},{' '}
                  {place.geometry.viewport.northeast.lng}) - SW (
                  {place.geometry.viewport.southwest.lat},{' '}
                  {place.geometry.viewport.southwest.lng})
                </p>

                <p className="text-sm font-medium mt-2">
                  Types: {place.types.join(', ')}
                </p>

                {place.plus_code && (
                  <p className="text-sm font-medium mt-2">
                    Plus Code: {place.plus_code.compound_code} (
                    {place.plus_code.global_code})
                  </p>
                )}

                {place.icon && (
                  <Image
                    src={place.icon}
                    alt="Place Icon"
                    width={40}
                    height={40}
                    className="mt-2 w-10 h-10"
                    unoptimized
                  />
                )}

                {place.photos && place.photos.length > 0 && (
                  <Image
                    src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${apiKey}`}
                    alt={`Photo of ${place.name}`}
                    width={400}
                    height={200}
                    className="mt-2 rounded-lg w-full h-32 object-cover"
                    unoptimized
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GooglePlaces;
