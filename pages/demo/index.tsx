import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import prisma from '../../src/app/components/prismaClient/prisma';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { handleDelete, handleEdit } from '@/app/utils/locationHandlers';
import { Box, Container, Grid2 } from '@mui/material';

interface Location {
  id: number;
  lat: string;
  lng: string;
  address: string;
  description: string;
  addedByUserId: string;
  imageUrl: string;
}

export async function getServerSideProps() {
  const coordinates = await prisma.coords.findMany();
  await prisma.$disconnect();
  return {
    props: {
      coordinates: JSON.parse(JSON.stringify(coordinates)),
    },
  };
}

export default function ActionAreaCard({
  coordinates,
}: {
  coordinates: Location[];
}) {
  const router = useRouter();
  const { data: session } = useSession();

  const apiKey = process.env.NEXT_PUBLIC_MAPS_API_KEY;

  return (
    <Box sx={{ bgcolor: '#f5f5f5', padding: 20 }}>
      <Container sx={{ minWidth: 1500 }}>
        <Grid2 container spacing={8}>
          {coordinates.map((location) => (
            <Grid2 key={location.id}>
              <Link href={`locations/${location.id}`} passHref>
                <Card
                  sx={{
                    minWidth: 600,
                    maxWidth: 600,
                    height: '100%',
                    padding: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    bgcolor: 'white',
                    boxShadow: 3,
                    borderRadius: 2,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'transform 0.3s',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  }}
                >
                  <CardActionArea sx={{ flexGrow: 1 }}>
                    <CardMedia
                      sx={{ height: 220 }}
                      component="img"
                      image={location.imageUrl}
                      alt={location.address}
                    />
                    <CardContent sx={{ height: 70 }}>
                      <Typography gutterBottom variant="h6" component="div">
                        {location.address}
                      </Typography>
                      {/* <Typography variant="body2" color="text.secondary">
                        {location.description}
                      </Typography> */}
                    </CardContent>
                  </CardActionArea>
                  {session && session.user?.name === location.addedByUserId && (
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: 1,
                        backgroundColor: '#f0f0f0',
                      }}
                    >
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded"
                        onClick={() => handleDelete(location.id, router)}
                      >
                        Delete
                      </button>
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={() => handleEdit(location.id, router)}
                      >
                        Edit
                      </button>
                    </Box>
                  )}
                </Card>
              </Link>
            </Grid2>
          ))}
        </Grid2>
      </Container>
    </Box>
  );
}
