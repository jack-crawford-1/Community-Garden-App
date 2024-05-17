import { useRouter } from 'next/router'
import prisma from '../../src/app/components/prismaClient/prisma'
import '../../src/app/styles/globals.css'
import Link from 'next/link'
import Image from 'next/image'
interface Coords {
  id: number
  lat: string
  lng: string
  address: string
  description: string
  addedByUserId: number
  imageUrl: string
}
export async function getServerSideProps() {
  const coordinates = await prisma.coords.findMany()
  await prisma.$disconnect()
  return {
    props: {
      coordinates: JSON.parse(JSON.stringify(coordinates)),
    },
  }
}
export default function LocationsPage({
  coordinates,
}: {
  coordinates: Coords[]
}) {
  const router = useRouter()
  const handleDelete = async (id: number) => {
    const confirmation = confirm(
      'Are you sure you want to delete this location?'
    )
    if (confirmation) {
      try {
        const response = await fetch('/api/deleteLocation', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
        })
        if (response.ok) {
          alert('Location deleted successfully')
          router.reload()
        } else {
          throw new Error('Failed to delete the location')
        }
      } catch (error) {
        console.error('Error:', error)
        alert('Error deleting location')
      }
    }
  }
  const handleEdit = async (id: number) => {
    const newAddress = prompt('Enter a new address:')
    const newDescription = prompt('Enter a new description:')
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
        })
        if (response.ok) {
          alert('Location updated successfully')
          router.reload()
        } else {
          throw new Error('Failed to update the location')
        }
      } catch (error) {
        console.error('Error:', error)
        alert('Error updating location')
      }
    }
  }
  const apiKey = process.env.NEXT_PUBLIC_MAPS_API_KEY

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center md:p-10 p-2">
      {coordinates.map((location) => (
        <div
          key={location.id}
          className="flex flex-col md:flex-row items-center justify-around bg-white shadow-md rounded-lg p-6 mb-6 md:w-3/4 p-10 md:min-h-96 w-full"
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
          <div className="w-full flex flex-row ">
            <Image
              src={location.imageUrl}
              alt={'imageurl'}
              width={350}
              height={200}
              style={{ borderRadius: '0.5rem' }}
            />
          </div>

          <span className=" flex  flex-row align-center m-2 md:m-5">
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
        </div>
      ))}
    </div>
  )
}
