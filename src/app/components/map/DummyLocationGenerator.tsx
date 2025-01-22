export function DummyLocationGenerator() {
  const lat = -41.33917041413981;
  const lng = 174.91911751026056;
  const locations = [];

  for (let i = 0; i < 20; i++) {
    const newLat = lat + Math.random() * 0.9;
    const newLng = lng + Math.random() * 0.3;
    const newAddress = `Randomly Generated Location ${i}`;
    const newDescription = `Generated location in New Zealand`;
    const newAddedByUserId = `user-${Math.floor(Math.random() * 50)}`;
    const newImageUrl = `https://example.com/generated_image_${i}.jpg`;

    locations.push({
      id: 100 + i,
      lat: newLat,
      lng: newLng,
      address: newAddress,
      description: newDescription,
      addedByUserId: newAddedByUserId,
      imageUrl: newImageUrl,
    });
  }

  return locations;
}
