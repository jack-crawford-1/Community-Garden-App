import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const apiKey = process.env.NEXT_PUBLIC_MAPS_API_KEY;
  const { place_id } = req.query;

  if (!apiKey || !place_id) {
    return res.status(400).json({ error: 'Missing API key or place_id' });
  }

  const googlePlacesUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=${apiKey}`;

  try {
    const response = await fetch(googlePlacesUrl);
    const data = await response.json();

    if (data.error_message) {
      return res.status(500).json({ error: data.error_message });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}
