'use client'
import '/src/app/globals.css'

import { useRouter } from 'next/router'

function AddSiteForm() {
  const router = useRouter()
  const { lat, lng } = router.query

  return (
    <div className="">
      <form className=" flex flex-col h-screen bg-white p-10  justify-center border-2 border-red-300">
        <label className="m-2 text-2xl tracking-wide">
          Site Address:
          <input
            type="text"
            name="siteAddress"
            className="bg-gray-100 h-10 shadow-xl m-2 ml-10 border-2 border-gray-400 rounded-lg w-1/2"
          />
        </label>
        <label className="m-2 text-2xl tracking-wide">
          Latitude:
          <input
            type="text"
            name="siteName"
            value={lat || ''}
            readOnly
            className="bg-gray-100 h-10 shadow-xl ml-10 m-2 border-2 border-gray-400 rounded-lg w-64"
          />
        </label>
        <label className="m-2 text-2xl tracking-wide">
          Longtitude:
          <input
            type="text"
            name="siteName"
            value={lng || ''}
            readOnly
            className="bg-gray-100 h-10 shadow-xl ml-10 m-2 border-2 border-gray-400 rounded-lg w-64"
          />
        </label>
        <label className="m-2 text-2xl tracking-wide">
          Site Description:
          <input
            type="textbox"
            name="siteDescription"
            className="bg-gray-100 h-40 shadow-xl ml-10 m-2 border-2 border-gray-400 rounded-lg w-1/2"
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
