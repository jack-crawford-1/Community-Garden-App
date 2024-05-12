import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function addLocation(req, res) {
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
      res.status(500).json({ error: error.message })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
