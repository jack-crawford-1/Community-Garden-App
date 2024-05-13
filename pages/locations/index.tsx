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

  return (
    <div className="flex flex-row flex-wrap w-90vw h-90vh m-10 justify-center">
      {coordinates.map((coord) => (
        <div
          key={coord.id}
          className="bg-gray-300 opacity-90 text-blue-600 border-4 rounded-xl border-blue-700 w-screen md:w-1/3 p-5 m-4 text-xl"
        >
          <Link href={`/locations/${coord.id}`}>
            <div className="font-bold text-2xl mb-4 hover:text-blue-900">
              {coord.address}
            </div>
          </Link>
          <div className="italic text-lg">
            Lat: {coord.lat} / Lng: {coord.lng}
          </div>
          <div className="text-lg">Added by: {coord.addedByUserId}</div>
          <div className="text-2xl m-3">{coord.description}</div>
          <div>
            <button
              className="bg-red-300  p-3 border-2 border-red-700 rounded-2xl w-1/3 m-2 text-xl hover:bg-red-500"
              onClick={() => handleDelete(coord.id)}
            >
              Delete
            </button>
          </div>
          <div>
            <button
              className="bg-green-300 p-3 border-2 border-green-700 rounded-2xl w-1/3 m-2 text-xl hover:bg-green-500"
              onClick={() => handleEdit(coord.id)}
            >
              Edit
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
