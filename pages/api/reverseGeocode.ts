import type { NextApiRequest, NextApiResponse } from 'next'

export default async function reverseGeocode(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { lat, lng } = req.query

  if (!lat || !lng) {
    res.status(400).json({ error: 'Latitude and longitude are required' })
    return
  }

  const apiKey = process.env.NEXT_PUBLIC_MAPS_API_KEY
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`

  try {
    const fetchResponse = await fetch(url)
    const data = await fetchResponse.json()

    if (data.error_message) {
      res.status(500).json({ error: data.error_message })
    } else {
      res.status(200).json(data)
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' })
  }
}
