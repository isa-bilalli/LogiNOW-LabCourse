const API_URL = 'http://localhost:3000/api';

const getAuthToken = () => {
  return localStorage.getItem('accessToken');
};

// Create truck
export const createTruck = async (truckData) => {
  try {
    const response = await fetch(`${API_URL}/trucks`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(truckData),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || data.error || 'Failed to create truck');
    }

    return data.truck;
  } catch (error) {
    console.error('Create truck error:', error);
    throw error;
  }
};

// Get all user's trucks
export const getUserTrucks = async () => {
  try {
    const response = await fetch(`${API_URL}/trucks/my`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to get trucks');
    }

    return data.trucks;
  } catch (error) {
    console.error('Get trucks error:', error);
    throw error;
  }
};

// Update truck
export const updateTruck = async (truckID, truckData) => {
  try {
    const response = await fetch(`${API_URL}/trucks/${truckID}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(truckData),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to update truck');
    }

    return data.truck;
  } catch (error) {
    console.error('Update truck error:', error);
    throw error;
  }
};

// Delete truck
export const deleteTruck = async (truckID) => {
  try {
    const response = await fetch(`${API_URL}/trucks/${truckID}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to delete truck');
    }

    return data;
  } catch (error) {
    console.error('Delete truck error:', error);
    throw error;
  }
};