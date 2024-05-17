import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../src/app/components/prismaClient/prisma'
import multer from 'multer'
import path from 'path'
import fs from 'fs'

interface NextApiRequestWithFile extends NextApiRequest {
  file: Express.Multer.File
}

const upload = multer({ dest: 'uploads/' })

export const config = {
  api: {
    bodyParser: false,
  },
}

const runMiddleware = (req: any, res: any, fn: any) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }
      return resolve(result)
    })
  })
}

const uploadMiddleware = upload.single('file')

export default async function addLocation(
  req: NextApiRequestWithFile,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      await runMiddleware(req, res, uploadMiddleware)

      const { lat, lng, address, description, addedByUserId } = req.body
      const file = req.file

      if (!file) {
        return res.status(400).json({ error: 'File is required' })
      }

      const targetPath = path.join(
        process.cwd(),
        'public/uploads',
        file.originalname
      )

      fs.renameSync(file.path, targetPath)

      const imageUrl = `/uploads/${file.originalname}`

      const result = await prisma.coords.create({
        data: {
          lat,
          lng,
          address,
          description,
          addedByUserId,
          imageUrl,
        },
      })
      res.status(200).json(result)
    } catch (error) {
      console.error('Error adding location:', error)
      res.status(500).json({ error: 'Error adding location' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
