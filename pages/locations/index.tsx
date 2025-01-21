import { useRouter } from 'next/router';
import prisma from '../../src/app/components/prismaClient/prisma';
import '../../src/app/styles/globals.css';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import LoginButton from '@/app/components/auth/LoginButton';

interface Location {
  id: number;
  lat: string;
  lng: string;
  address: string;
  description: string;
  addedByUserId: string;
  imageUrl: string;
}

export async function getServerSideProps() {
  let dummyLocations = [];

  try {
    const response = await fetch('http://localhost:3000/dummy.geojson');
    dummyLocations = await response.json();
    dummyLocations = dummyLocations.map((location: any, index: any) => ({
      ...location,
      id: `dummy-${index}`,
    }));
  } catch (error) {
    console.error('Failed to load dummy locations:', error);
  }

  const realLocations = await prisma.coords.findMany();
  await prisma.$disconnect();

  const formattedRealLocations = realLocations.map((location) => ({
    ...location,
    createdAt: location.createdAt.toISOString(),
    updatedAt: location.updatedAt.toISOString(),
  }));

  return {
    props: {
      coordinates: [...formattedRealLocations, ...dummyLocations],
    },
  };
}

export default function LocationsPage({
  coordinates,
}: {
  coordinates: Location[];
}) {
  const router = useRouter();
  const { data: session } = useSession();

  const handleDelete = async (id: number) => {
    const confirmation = confirm(
      'Are you sure you want to delete this location?'
    );
    if (confirmation) {
      try {
        const response = await fetch('/api/deleteLocation', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
        });
        if (response.ok) {
          alert('Location deleted successfully');
          router.reload();
        } else {
          throw new Error('Failed to delete the location');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error deleting location');
      }
    }
  };

  const handleEdit = async (id: number) => {
    const newAddress = prompt('Enter a new address:');
    const newDescription = prompt('Enter a new description:');
    if (newAddress && newDescription) {
      try {
        const response = await fetch('/api/editLocation', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id,
            address: newAddress,
            description: newDescription,
          }),
        });
        if (response.ok) {
          alert('Location updated successfully');
          router.reload();
        } else {
          throw new Error('Failed to update the location');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error updating location');
      }
    }
  };

  const apiKey = process.env.NEXT_PUBLIC_MAPS_API_KEY;

  return (
    <>
      <div className="flex flex-row items-center justify-between pl-8 pr-5 p-2 bg-white shadow-md">
        <Link href="/">
          <button className="bg-green-600 hover:bg-green-500 text-white text-xl font-semibold py-2 px-4 rounded-lg shadow-lg transition-all">
            🌱 <span className="pr-5"></span>Home
          </button>
        </Link>
        <LoginButton />
      </div>
      <div className="bg-gray-50 min-h-screen flex flex-col items-center md:p-10 p-2">
        {coordinates.map((location) => (
          <div
            key={location.id}
            className="flex flex-col md:flex-row items-center justify-around bg-white shadow-md rounded-lg p-6 mb-6 md:w-2/3 p-10 md:min-h-96 w-full"
          >
            <div className="text-left md:w-1/2 md:ml-10">
              <Link href={`/locations/${location.id}`}>
                <h1 className="text-2xl font-bold">{location.address}</h1>
              </Link>
              <div className="m-1">
                Added by user id: {location.addedByUserId}
              </div>
              <div className="text-md mt-2 mb-4"></div>
            </div>
            <div className="w-1/2 flex flex-row ">
              <Image
                src={location.imageUrl}
                alt={'imageurl'}
                width={300}
                height={200}
                style={{ borderRadius: '0.5rem' }}
              />
            </div>

            {session && session.user?.name === location.addedByUserId && (
              <span className="flex flex-row align-center m-2 md:m-5">
                <button
                  className="bg-red-300 text-white px-4 py-2 rounded m-1"
                  onClick={() => handleDelete(location.id)}
                >
                  Delete
                </button>
                <button
                  className="bg-blue-300 text-white px-4 py-2 rounded m-1"
                  onClick={() => handleEdit(location.id)}
                >
                  Edit
                </button>
              </span>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
