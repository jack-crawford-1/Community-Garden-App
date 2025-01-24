import type { NextApiRequest, NextApiResponse } from 'next';

const cities = [
  'Wellington',
  'Petone',
  'Wainuiomata',
  'Eastbourne',
  'Lower Hutt',
  'Upper Hutt',
  'Makara Beach',
  'Porirua',
  'Paraparaumu',
  'Waikanae',
  'Otaki',
  'Levin',
  'Masterton',
  'Martinborough',
  'South Featherston',
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
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=community+vegetable+garden+in+${encodeURIComponent(
          city
        )}&type=park&key=${apiKey}`
      );
      const data = await response.json();
      if (data.results) {
        allResults = [...allResults, ...data.results];
        console.log(`Fetched ${data.results.length} places for ${city}`);
        console.log(data.results);
      }
    } catch (error) {
      console.error(`Error fetching places for ${city}:`, error);
    }
  }

  res.status(200).json({ results: allResults });
}
