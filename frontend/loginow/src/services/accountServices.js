const API_URL = 'http://localhost:3000/api';

const getAuthToken = () => {
  return localStorage.getItem('accessToken');
};

// Get user profile
export const getUserProfile = async () => {
  try {
    const response = await fetch(`${API_URL}/account/profile`, {
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

    return data.user;
  } catch (error) {
    console.error('Get profile error:', error);
    throw error;
  }
};

// Update user profile
export const updateUserProfile = async (profileData) => {
  try {
    const response = await fetch(`${API_URL}/account/profile`, {
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

    return data.user;
  } catch (error) {
    console.error('Update profile error:', error);
    throw error;
  }
};

// Change password
export const changePassword = async (currentPassword, newPassword) => {
  try {
    const response = await fetch(`${API_URL}/account/password`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ currentPassword, newPassword }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || data.error || 'Failed to change password');
    }

    return data;
  } catch (error) {
    console.error('Change password error:', error);
    throw error;
  }
};

// Delete account
export const deleteAccount = async (password) => {
  try {
    const response = await fetch(`${API_URL}/account`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ password }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || data.error || 'Failed to delete account');
    }

    return data;
  } catch (error) {
    console.error('Delete account error:', error);
    throw error;
  }
};