import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../src/app/components/prismaClient/prisma'

export default async function addLocation(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { lat, lng, address, description, addedByUserId } = req.body

    console.log(req.body)
    try {
      const result = await prisma.coords.create({
        data: {
          lat,
          lng,
          address,
          description,
          addedByUserId,
        },
      })
      res.status(200).json(result)
    } catch (error) {
      console.error('Error adding location:', error)
      res.status(500).json({ error: error })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
