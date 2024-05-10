'use client'
import { useEffect, useState } from 'react'
import '/src/app/globals.css'
import { useRouter } from 'next/router'

function AddSiteForm() {
  const router = useRouter()
  const { lat, lng } = router.query
  const [address, setAddress] = useState('')

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

  return (
    <div className="">
      <form className=" flex flex-col h-screen bg-white p-10  justify-center border-2 border-red-300">
        <label className="m-2 text-2xl tracking-wide">
          Site Address:
          <input
            type="text"
            name="siteAddress"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="bg-gray-100 h-10 shadow-xl m-2 ml-10 border-2 border-gray-400 rounded-lg p-3 w-1/2 text-lg"
          />
        </label>
        <label className="m-2 text-2xl tracking-wide">
          Latitude:
          <input
            type="text"
            name="siteName"
            value={lat || ''}
            readOnly
            className="bg-gray-100 h-10 shadow-xl ml-10 m-2 border-2 border-gray-400 rounded-lg w-1/4 p-3 text-lg"
          />
        </label>
        <label className="m-2 text-2xl tracking-wide">
          Longtitude:
          <input
            type="text"
            name="siteName"
            value={lng || ''}
            readOnly
            className="bg-gray-100 h-10 shadow-xl ml-10 p-3 m-2 border-2 border-gray-400 rounded-lg w-1/4 text-lg"
          />
        </label>
        <label className="m-2 text-2xl tracking-wide">
          Site Description:
          <input
            type="textbox"
            name="siteDescription"
            className="bg-gray-100 h-40 shadow-xl ml-10 p-3 m-2 border-2 border-gray-400 rounded-lg w-1/2"
          />
        </label>

        <input
          type="submit"
          value="Submit"
          className="bg-gray-100 h-14 w-32 shadow-xl m-2 border-2 border-gray-400 rounded-lg"
        />
      </form>
    </div>
  )
}

export default AddSiteForm
