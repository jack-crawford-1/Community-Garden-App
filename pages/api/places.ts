import type { NextApiRequest, NextApiResponse } from 'next';

const cities = [
  'Auckland',
  'Wellington',
  'Christchurch',
  'Hamilton',
  'Dunedin',
  'Tauranga',
  'Napier',
  'Palmerston North',
  'Nelson',
  'Rotorua',
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const apiKey = process.env.NEXT_PUBLIC_MAPS_API_KEY;

  if (!apiKey) {
    return res.status(400).json({ error: 'Missing API key' });
  }

  let allResults: any[] = [];

  for (const city of cities) {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=community+garden+in+${encodeURIComponent(
          city
        )}&key=${apiKey}`
      );
      const data = await response.json();
      if (data.results) {
        allResults = [...allResults, ...data.results];
      }
    } catch (error) {
      console.error(`Error fetching places for ${city}:`, error);
    }
  }

  res.status(200).json({ results: allResults });
}
