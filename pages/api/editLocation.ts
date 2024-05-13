import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../src/app/components/prismaClient/prisma'

export default async function editLocation(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'PUT') {
    const { id, lat, lng, address, description } = req.body

    try {
      await prisma.coords.update({
        where: { id },
        data: {
          lat,
          lng,
          address,
          description,
        },
      })
      res.status(200).json({ message: 'Location updated successfully' })
    } catch (error) {
      console.error('Error updating location:', error)
      res.status(500).json({ error: 'Error updating location' })
    }
  } else {
    res.setHeader('Allow', ['PUT'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
