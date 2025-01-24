'use client';

import '../../src/app/styles/globals.css';
import prisma from '../../src/app/components/prismaClient/prisma';
import Link from 'next/link';
import Image from 'next/image';
import LoginButton from '@/app/components/auth/LoginButton';

interface Coords {
  id: number;
  lat: string;
  lng: string;
  address: string;
  description: string;
  imageUrl: string;
  addedByUserId: number;
  mapId: string;
}

export async function getServerSideProps(context: { params: any }) {
  const { id } = context.params;

  if (id.startsWith('dummy-')) {
    const index = parseInt(id.replace('dummy-', ''), 10);
    if (isNaN(index)) {
      return { notFound: true };
    }
    try {
      const response = await fetch('http://localhost:3000/dummy.geojson');
      const dummyLocations = await response.json();

      const location = dummyLocations[index];
      if (!location) {
        return { notFound: true };
      }

      return {
        props: { location },
      };
    } catch (error) {
      console.error('Failed to load dummy locations:', error);
      return { notFound: true };
    }
  }

  const numericId = parseInt(id, 10);
  if (isNaN(numericId)) {
    return { notFound: true };
  }

  let location = await prisma.coords.findUnique({
    where: { id: numericId },
  });

  await prisma.$disconnect();

  if (!location) {
    return { notFound: true };
  }

  return {
    props: {
      location: {
        ...location,
        createdAt: location.createdAt.toISOString(),
        updatedAt: location.updatedAt.toISOString(),
      },
    },
  };
}

export default function LocationPage({ location }: { location: Coords }) {
  if (!location) {
    return (
      <div className="bg-red-100 text-red-700 border-4 rounded-xl border-red-700 w-screen md:w-1/2 p-5 m-4 text-xl">
        Location not found
      </div>
    );
  }
  const apiKey = process.env.NEXT_PUBLIC_MAPS_API_KEY;

  const dummyLocation = {
    ownership: 'Council-owned',
    accessibility:
      'Accessible by public transport, on-street parking available.',
    facilities: 'Nearby shops, water access, and public restrooms.',
    history:
      'Previously a vacant lot, recently proposed for community garden use.',
  };

  return (
    <>
      <div className="flex flex-row items-center justify-between p-2 pl-8 pr-5 bg-white shadow-md">
        <Link href="/">
          <button className="bg-green-600 hover:bg-green-500 text-white text-xl font-semibold py-2 px-4 rounded-lg shadow-lg transition-all">
            🌱 <span className="pr-5"></span>Map
          </button>
        </Link>
        <LoginButton />
      </div>
      <div className="bg-white p-20">
        <div className="max-w-3xl lg:max-w-5xl mx-auto px-6 py-10 bg-gray-50 rounded-lg  border-green-600 shadow-lg">
          <h1 className="text-4xl font-bold text-center mb-3">
            {location.address}
          </h1>

          <p className="text-center text-gray-600">
            Added By:{' '}
            <span className="font-semibold">{location.addedByUserId}</span>
          </p>

          <div className="border-4 border-green-600 mt-5"></div>

          <div className="borde-bottom-2 border-green-600 pt-10"></div>

          <p className="text-lg text-gray-700 text-center md:text-left mt-4 p-10">
            {location.description}
          </p>

          <div className="flex flex-col md:flex-row justify-center items-center gap-6 mt-8">
            <div className="w-full md:w-1/2 rounded-lg overflow-hidden shadow-lg h-80">
              <Image
                src={location.imageUrl}
                alt="Location Image"
                width={700}
                height={500}
                className="rounded-lg object-cover w-full h-full"
              />
            </div>

            <div className="w-full md:w-1/2 h-80 rounded-lg overflow-hidden shadow-lg">
              <iframe
                width="100%"
                height="100%"
                className="rounded-lg"
                loading="lazy"
                allowFullScreen
                src={`https://www.google.com/maps/embed/v1/view?key=${apiKey}&center=${location.lat},${location.lng}&zoom=18&maptype=satellite`}
              ></iframe>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-center mt-6 text-lg text-gray-700">
            <span className="mx-4">
              Latitude: <strong>{location.lat}</strong>
            </span>
            <span className="mx-4">
              Longitude: <strong>{location.lng}</strong>
            </span>
          </div>

          <div className="mt-10 p-6 ">
            <h2 className="text-2xl font-semibold text-center mb-4">
              More Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
              {dummyLocation.ownership && (
                <div className="p-4 bg-white rounded-lg shadow">
                  <h3 className="font-semibold text-lg">Ownership</h3>
                  <p className="mt-2">{dummyLocation.ownership}</p>
                </div>
              )}

              {dummyLocation.accessibility && (
                <div className="p-4 bg-white rounded-lg shadow">
                  <h3 className="font-semibold text-lg">Accessibility</h3>
                  <p className="mt-2">{dummyLocation.accessibility}</p>
                </div>
              )}

              {dummyLocation.facilities && (
                <div className="p-4 bg-white rounded-lg shadow">
                  <h3 className="font-semibold text-lg">Nearby Facilities</h3>
                  <p className="mt-2">{dummyLocation.facilities}</p>
                </div>
              )}

              {dummyLocation.history && (
                <div className="p-4 bg-white rounded-lg shadow">
                  <h3 className="font-semibold text-lg">History</h3>
                  <p className="mt-2">{dummyLocation.history}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
