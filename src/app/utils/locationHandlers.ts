import { NextRouter } from 'next/router';

export const handleDelete = async (id: number, router: NextRouter) => {
  const confirmation = confirm(
    'Are you sure you want to delete this location?'
  );
  if (confirmation) {
    try {
      const response = await fetch('/api/deleteLocation', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      if (response.ok) {
        alert('Location deleted successfully');
        router.reload();
      } else {
        throw new Error('Failed to delete the location');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error deleting location');
    }
  }
};

export const handleEdit = async (id: number, router: NextRouter) => {
  const newAddress = prompt('Enter a new address:');
  const newDescription = prompt('Enter a new description:');
  if (newAddress && newDescription) {
    try {
      const response = await fetch('/api/editLocation', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          address: newAddress,
          description: newDescription,
        }),
      });
      if (response.ok) {
        alert('Location updated successfully');
        router.reload();
      } else {
        throw new Error('Failed to update the location');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error updating location');
    }
  }
};
