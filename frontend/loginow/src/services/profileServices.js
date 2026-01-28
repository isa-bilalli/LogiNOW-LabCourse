const API_URL = 'http://localhost:3000/api';

const getAuthToken = () => {
  return localStorage.getItem('accessToken');
};

// Create profile
export const createProfile = async (profileData) => {
  try {
    const response = await fetch(`${API_URL}/profiles`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(profileData),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || data.error || 'Failed to create profile');
    }

    return data.profile;
  } catch (error) {
    console.error('Create profile error:', error);
    throw error;
  }
};

// Get all profiles
export const getAllProfiles = async () => {
  try {
    const response = await fetch(`${API_URL}/profiles`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to get profiles');
    }

    return data.profiles;
  } catch (error) {
    console.error('Get profiles error:', error);
    throw error;
  }
};

// Get single profile
export const getProfile = async (profileID) => {
  try {
    const response = await fetch(`${API_URL}/profiles/${profileID}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to get profile');
    }

    return data.profile;
  } catch (error) {
    console.error('Get profile error:', error);
    throw error;
  }
};

// Update profile
export const updateProfile = async (profileID, profileData) => {
  try {
    const response = await fetch(`${API_URL}/profiles/${profileID}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(profileData),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to update profile');
    }

    return data.profile;
  } catch (error) {
    console.error('Update profile error:', error);
    throw error;
  }
};

// Delete profile
export const deleteProfile = async (profileID) => {
  try {
    const response = await fetch(`${API_URL}/profiles/${profileID}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to delete profile');
    }

    return data;
  } catch (error) {
    console.error('Delete profile error:', error);
    throw error;
  }
};