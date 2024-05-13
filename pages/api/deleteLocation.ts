import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../src/app/components/prismaClient/prisma'

export default async function deleteLocation(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'DELETE') {
    const { id } = req.body

    try {
      await prisma.coords.delete({
        where: { id },
      })
      res.status(200).json({ message: 'Location deleted successfully' })
    } catch (error) {
      console.error('Error deleting location:', error)
      res.status(500).json({ error: 'Error deleting location' })
    }
  } else {
    res.setHeader('Allow', ['DELETE'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
