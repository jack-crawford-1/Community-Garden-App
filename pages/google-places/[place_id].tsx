import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface PlaceDetails {
  name: string;
  formatted_address: string;
  rating?: number;
  user_ratings_total?: number;
  website?: string;
  photos?: { photo_reference: string }[];
  geometry: { location: { lat: number; lng: number } };
}

const apiKey = process.env.NEXT_PUBLIC_MAPS_API_KEY;

const GooglePlaceDetails = () => {
  const router = useRouter();
  const { place_id } = router.query;
  const [place, setPlace] = useState<PlaceDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!place_id) return;

    const fetchPlaceDetails = async () => {
      try {
        const response = await fetch(`/api/place-details?place_id=${place_id}`);
        const data = await response.json();
        setPlace(data.result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching place details:', error);
        setLoading(false);
      }
    };

    fetchPlaceDetails();
  }, [place_id]);

  if (loading) return <p>Loading...</p>;
  if (!place) return <p>Place not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold">{place.name}</h1>
      <p className="text-gray-700">{place.formatted_address}</p>
      {place.rating && (
        <p className="text-sm mt-2">
          ⭐ Rating: {place.rating} ({place.user_ratings_total} reviews)
        </p>
      )}
      {place.website && (
        <a
          href={place.website}
          target="_blank"
          rel="noreferrer"
          className="text-blue-500 underline"
        >
          Visit Website
        </a>
      )}

      {place.photos && place.photos.length > 0 && (
        <Image
          src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${apiKey}`}
          alt={`Photo of ${place.name}`}
          width={1100}
          height={800}
          className="mt-2 rounded-lg w-full h-64 object-cover"
          unoptimized
        />
      )}

      <div className="mt-6">
        <iframe
          width="100%"
          height="300"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=place_id:${place_id}`}
        ></iframe>
      </div>
    </div>
  );
};

export default GooglePlaceDetails;
