import Profile from '../models/Profile.js';

// Create profile
export async function createProfile(req, res) {
  try {
    const { fullName, email, phoneNumber, companyName, location } = req.body;

    // Validation
    if (!fullName || !email || !phoneNumber) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        error: 'Missing required fields',
        message: 'Full name, email, and phone number are required'
      }));
      return;
    }

    const profileData = {
      fullName,
      email,
      phoneNumber,
      companyName: companyName || null,
      location: location || null,
      userID: req.user.userID
    };

    const profile = await Profile.create(profileData);

    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      message: 'Profile created successfully',
      profile
    }));

  } catch (error) {
    console.error('Create profile error:', error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      error: 'Internal server error',
      message: 'Failed to create profile'
    }));
  }
}

// Get all user's profiles
export async function getUserProfiles(req, res) {
  try {
    const profiles = await Profile.findByUserId(req.user.userID);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      profiles
    }));

  } catch (error) {
    console.error('Get user profiles error:', error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      error: 'Internal server error',
      message: 'Failed to get profiles'
    }));
  }
}

// Get single profile
export async function getProfile(req, res) {
  try {
    const { profileID } = req.params;

    const profile = await Profile.findById(profileID);
    if (!profile) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        error: 'Profile not found'
      }));
      return;
    }

    // Check ownership
    if (profile.userID !== req.user.userID) {
      res.writeHead(403, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        error: 'Unauthorized',
        message: 'You can only view your own profiles'
      }));
      return;
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      profile
    }));

  } catch (error) {
    console.error('Get profile error:', error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      error: 'Internal server error',
      message: 'Failed to get profile'
    }));
  }
}

// Update profile
export async function updateProfile(req, res) {
  try {
    const { profileID } = req.params;
    const { fullName, email, phoneNumber, companyName, location } = req.body;

    // Find profile
    const profile = await Profile.findById(profileID);
    if (!profile) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        error: 'Profile not found'
      }));
      return;
    }

    // Check ownership
    if (profile.userID !== req.user.userID) {
      res.writeHead(403, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        error: 'Unauthorized',
        message: 'You can only update your own profiles'
      }));
      return;
    }

    const profileData = {
      fullName: fullName || profile.fullName,
      email: email || profile.email,
      phoneNumber: phoneNumber || profile.phoneNumber,
      companyName: companyName !== undefined ? companyName : profile.companyName,
      location: location !== undefined ? location : profile.location
    };

    const updatedProfile = await Profile.update(profileID, profileData);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      message: 'Profile updated successfully',
      profile: updatedProfile
    }));

  } catch (error) {
    console.error('Update profile error:', error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      error: 'Internal server error',
      message: 'Failed to update profile'
    }));
  }
}

// Delete profile
export async function deleteProfile(req, res) {
  try {
    const { profileID } = req.params;

    // Find profile
    const profile = await Profile.findById(profileID);
    if (!profile) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        error: 'Profile not found'
      }));
      return;
    }

    // Check ownership
    if (profile.userID !== req.user.userID) {
      res.writeHead(403, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        error: 'Unauthorized',
        message: 'You can only delete your own profiles'
      }));
      return;
    }

    await Profile.delete(profileID);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      message: 'Profile deleted successfully'
    }));

  } catch (error) {
    console.error('Delete profile error:', error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      error: 'Internal server error',
      message: 'Failed to delete profile'
    }));
  }
}