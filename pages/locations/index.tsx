import { useRouter } from 'next/router'
import prisma from '../../src/app/components/prismaClient/prisma'
import '../../src/app/styles/globals.css'
import Link from 'next/link'
interface Coords {
  id: number
  lat: string
  lng: string
  address: string
  description: string
  addedByUserId: number
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
    <div className="bg-gray-100 min-h-screen flex flex-col items-center p-10">
      {coordinates.map((location) => (
        <div
          key={location.id}
          className="flex flex-col md:flex-row items-center justify-center bg-white shadow-md rounded-lg p-6 mb-6 w-3/4 p-10 md:min-h-96"
        >
          <div className="text-left md:w-1/2 md:ml-10">
            <Link href={`/locations/${location.id}`}>
              <h1 className="text-2xl font-bold">{location.address}</h1>
            </Link>
            <p className="text-lg mt-2">{location.description}</p>
            <div className="text-md mt-2 mb-4">
              <span>
                Lat: {location.lat}, Lng: {location.lng}
              </span>
              <br />
              <span>Added by: {location.addedByUserId}</span>
            </div>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded mr-2"
              onClick={() => handleDelete(location.id)}
            >
              Delete
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => handleEdit(location.id)}
            >
              Edit
            </button>
          </div>
          <div className="w-full md:w-1/2 h-72">
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: '0.5rem' }}
              loading="lazy"
              allowFullScreen={false}
              src={`https://www.google.com/maps/embed/v1/view?key=${apiKey}&center=${location.lat},${location.lng}&zoom=18&maptype=roadmap`}
            ></iframe>
          </div>
        </div>
      ))}
    </div>
  )
}
