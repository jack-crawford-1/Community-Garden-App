'use client'
import { useEffect, useState } from 'react'
import '../../src/app/styles/globals.css'
import { useRouter } from 'next/router'
import IfAuthenticated from '../../src/app/components/auth/IfAuthenticated'
import IfNotAuthenticated from '../../src/app/components/auth/IfNotAuthenticated'
import { signIn, useSession } from 'next-auth/react'

function AddSiteForm() {
  const router = useRouter()
  const { lat, lng } = router.query
  const [address, setAddress] = useState('')
  const [description, setDescription] = useState('')
  const [addedByUserId, setAddedByUserId] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [message, setMessage] = useState('')
  const { data: session } = useSession()

  useEffect(() => {
    if (lat && lng) {
      fetch(`/api/reverseGeocode?lat=${lat}&lng=${lng}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.results && data.results[0]) {
            setAddress(data.results[0].formatted_address)
          }
        })
        .catch((error) => {
          console.error('Error fetching address:', error)
        })
    }
  }, [lat, lng])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
    } else {
      setFile(null)
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const formData = new FormData()
    formData.append('lat', lat as string)
    formData.append('lng', lng as string)
    formData.append('address', address)
    formData.append('description', description)
    formData.append('addedByUserId', session?.user?.name || '')

    if (file) {
      formData.append('file', file)
    }

    fetch('/api/addLocation', {
      method: 'POST',
      body: formData,
    })
      .then(() => {
        setAddress('')
        setDescription('')
        setAddedByUserId('')
        setFile(null)
        setMessage('Location added successfully')
        setTimeout(() => setMessage(''), 3000)
        router.push('/locations')
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <IfNotAuthenticated>
        <div className="flex items-center justify-center h-full">
          <p className="text-2xl m-3">Sign in to add a new site.</p>
          <div className="space-x-4">
            <button
              className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
              onClick={() => signIn('github')}
            >
              Sign in with GitHub
            </button>
            <button
              className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
              onClick={() => signIn('google')}
            >
              Sign in with Google
            </button>
          </div>
        </div>
      </IfNotAuthenticated>
      <IfAuthenticated>
        <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-lg border-2 border-gray-300">
          {message && (
            <div className="absolute top-0 right-0 p-4 bg-green-300">
              {message}
            </div>
          )}
          <form onSubmit={handleSubmit} className="flex flex-col">
            <label className="mb-4 text-lg font-medium">
              Site Address:
              <input
                type="text"
                name="siteAddress"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-2 mt-2 bg-gray-100 border-2 border-gray-300 rounded-lg shadow-sm"
              />
            </label>
            <label className="mb-4 text-lg font-medium">
              Latitude:
              <input
                type="text"
                name="latitude"
                value={lat || ''}
                readOnly
                className="w-full p-2 mt-2 bg-gray-100 border-2 border-gray-300 rounded-lg shadow-sm"
              />
            </label>
            <label className="mb-4 text-lg font-medium">
              Longitude:
              <input
                type="text"
                name="longitude"
                value={lng || ''}
                readOnly
                className="w-full p-2 mt-2 bg-gray-100 border-2 border-gray-300 rounded-lg shadow-sm"
              />
            </label>
            <label className="mb-4 text-lg font-medium">
              Added By User:
              <input
                type="text"
                name="addedByUserId"
                value={session?.user?.name || ''}
                readOnly
                className="w-full p-2 mt-2 bg-gray-100 border-2 border-gray-300 rounded-lg shadow-sm"
              />
            </label>
            <label className="mb-4 text-lg font-medium">
              Site Description:
              <textarea
                name="siteDescription"
                placeholder="Add a description of the site here..."
                className="w-full p-2 mt-2 bg-gray-100 border-2 border-gray-300 rounded-lg shadow-sm"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </label>
            <label className="mb-4 text-lg font-medium">
              Upload Image:
              <input
                type="file"
                name="file"
                onChange={handleFileChange}
                className="w-full p-2 mt-2 bg-gray-100 border-2 border-gray-300 rounded-lg shadow-sm"
              />
            </label>
            <button
              type="submit"
              className="w-full py-2 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </div>
      </IfAuthenticated>
    </div>
  )
}

export default AddSiteForm
