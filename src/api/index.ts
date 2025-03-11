import { CarDTO, UserDTO } from '../types';

const API_URL = 'http://localhost:3001';

export const fetchCars = async (): Promise<CarDTO[]> => {
  const response = await fetch(`${API_URL}/cars`);
  if (!response.ok) {
    throw new Error('Failed to fetch cars');
  }
  return response.json();
};

export const fetchUser = async (): Promise<UserDTO> => {
  const response = await fetch(`${API_URL}/user`);
  if (!response.ok) {
    throw new Error('Failed to fetch user info');
  }
  return response.json();
};

export const updateUser = async (user: UserDTO): Promise<UserDTO> => {
  const response = await fetch(`${API_URL}/user`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  if (!response.ok) {
    throw new Error('Failed to update user info');
  }
  return response.json();
};

export const fetchWishlist = async (): Promise<number[]> => {
  const response = await fetch(`${API_URL}/wishlist`);
  if (!response.ok) {
    throw new Error('Failed to fetch wishlist');
  }
  return response.json();
};

export const addToWishlist = async (carId: number): Promise<void> => {
  const currentWishlist = await fetchWishlist();
  const response = await fetch(`${API_URL}/wishlist`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify([...currentWishlist, carId]),
  });
  if (!response.ok) {
    throw new Error('Failed to add to wishlist');
  }
};

export const removeFromWishlist = async (carId: number): Promise<void> => {
  const currentWishlist = await fetchWishlist();
  const response = await fetch(`${API_URL}/wishlist`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(currentWishlist.filter(id => id !== carId)),
  });
  if (!response.ok) {
    throw new Error('Failed to remove from wishlist');
  }
};