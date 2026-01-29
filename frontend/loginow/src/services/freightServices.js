const API_URL = 'http://localhost:3000/api';

const getAuthToken = () => {
  return localStorage.getItem('accessToken');
};

// Create freight
export const createFreight = async (freightData) => {
  try {
    const response = await fetch(`${API_URL}/freights`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(freightData),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || data.error || 'Failed to create freight');
    }

    return data.freight;
  } catch (error) {
    console.error('Create freight error:', error);
    throw error;
  }
};

// Get all user's freight
export const getUserFreight = async () => {
  try {
    const response = await fetch(`${API_URL}/freights/my`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to get freight');
    }

    return data.freights;
  } catch (error) {
    console.error('Get freight error:', error);
    throw error;
  }
};

// Update freight
export const updateFreight = async (freightID, freightData) => {
  try {
    const response = await fetch(`${API_URL}/freights/${freightID}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(freightData),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to update freight');
    }

    return data.freight;
  } catch (error) {
    console.error('Update freight error:', error);
    throw error;
  }
};

// Delete freight
export const deleteFreight = async (freightID) => {
  try {
    const response = await fetch(`${API_URL}/freights/${freightID}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to delete freight');
    }

    return data;
  } catch (error) {
    console.error('Delete freight error:', error);
    throw error;
  }
};