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
    <div className="flex flex-col items-center justify-center h-fit bg-gray-100 p-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-5 w-full max-w-6xl">
        {coordinates.map((coord) => (
          <div key={coord.id} className="bg-white shadow-lg rounded-lg">
            <iframe
              width="100%"
              height="200"
              loading="lazy"
              allowFullScreen={false}
              src={`https://www.google.com/maps/embed/v1/view?key=${apiKey}&center=${coord.lat},${coord.lng}&zoom=18&maptype=satellite`}
            ></iframe>
            <div className="p-10">
              <Link href={`/locations/${coord.id}`}>
                <div className="font-bold text-3xl mb-2 block hover:text-blue-800">
                  {coord.address}
                </div>
              </Link>
              <p className="text-xl mt-5 mb-7">{coord.description}</p>
              <div className="text-lg">
                <span>
                  Lat: {coord.lat} / Lng: {coord.lng}
                </span>
                <br />
                <span>Added by: {coord.addedByUserId}</span>
              </div>

              <div className="flex justify-center m-5">
                <button
                  className=" text-sm bg-red-300 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleDelete(coord.id)}
                >
                  Delete
                </button>
                <button
                  className="text-sm bg-blue-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleEdit(coord.id)}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
