'use client'
import { useEffect, useState } from 'react'
import '../../src/app/styles/globals.css'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

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
    <>
      <div className="h-screen">
        <div>
          {message && (
            <div className="absolute top-0 right-0 p-10 bg-green-300">
              {message}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="flex flex-col h-screen bg-white p-10 justify-center border-2 border-red-300"
          >
            <label className="m-2 text-2xl tracking-wide">
              Site Address:
              <input
                type="text"
                name="siteAddress"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="bg-gray-100 h-10 shadow-xl m-2 ml-10 border-2 border-gray-400 rounded-lg p-3 md:w-1/2 w-full text-lg min-h-10"
              />
            </label>
            <label className="m-2 text-2xl tracking-wide">
              Latitude:
              <input
                type="text"
                name="siteName"
                value={lat || ''}
                readOnly
                className="bg-gray-100 h-10 shadow-xl ml-10 m-2 border-2 border-gray-400 rounded-lg md:w-1/2 w-full p-3 text-lg min-h-10"
              />
            </label>
            <label className="m-2 text-2xl tracking-wide">
              Longitude:
              <input
                type="text"
                name="siteName"
                value={lng || ''}
                readOnly
                className="bg-gray-100 h-10 shadow-xl ml-10 p-3 m-2 border-2 border-gray-400 rounded-lg md:w-1/2 w-full text-lg min-h-10"
              />
            </label>
            <label className="m-2 text-2xl tracking-wide">
              Added By User:
              <input
                type="text"
                name="addedByUserId"
                value={session?.user?.name || ''}
                readOnly
                className="bg-gray-100 h-10 shadow-xl ml-10 p-3 m-2 border-2 border-gray-400 rounded-lg md:w-1/2 w-full text-lg min-h-10"
              />
            </label>
            <label className="m-2 text-2xl tracking-wide">
              Site Description:
              <input
                type="textbox"
                name="siteDescription"
                placeholder="Add a description of the site here..."
                className="bg-gray-100 h-40 shadow-xl ml-10 p-3 m-2 border-2 border-gray-400 rounded-lg md:w-1/2 w-full"
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
            <label className="m-2 text-lg w-full min-h-10">
              Upload Image:
              <input
                type="file"
                name="file"
                onChange={handleFileChange}
                className="bg-gray-100 h-10 shadow-xl m-10 p-3 border-2 border-gray-400 rounded-lg md:w-1/2 w-full min-h-10"
              />
            </label>
            <input
              type="submit"
              value="Submit"
              className="bg-gray-100 w-64 shadow-xl m-2 border-2 border-gray-400 rounded-lg text-xl h-fit min-h-10 mt-10 hover:bg-gray-200 hover:border-blue-500"
            />
          </form>
        </div>
      </div>
    </>
  )
}

export default AddSiteForm
