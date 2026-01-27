import bcrypt from 'bcrypt';
import User from '../models/User.js';

export async function getUserProfile(req, res) {
    try {
        const user = await User.findById(req.user.userID);

        if(!user) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                error: 'User not found'
            }));
            return;
        }
        res.writeHead(200, { 'Content-Type': 'applcation/json' });
        res.end(JSON.stringify({
            user
        }));
    } catch (error) {
        console.error('Get user profile error:' , error);
        res.writeHead(500, {'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            error: 'Internal server error',
            message: 'Failed to get user profile'
        }));
    }
}

export async function updateUserProfile(req, res) {
    try {
        const { username, email, phoneNumber, companyName, locatedIn } = req.body;

        if(!username || !email || !phoneNumber) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                error: 'Missing required fields',
                message: 'Username , email , and phone number are required'
            }));
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        error: 'Invalid email format'
      }));
      return;
    }
      const existingUserByUsername = await User.findByUsername(username);
    if (existingUserByUsername && existingUserByUsername.userID !== req.user.userID) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        error: 'Username already in use',
        message: 'This username is already registered to another account'
      }));
      return;
    }
    const existingUserByEmail = await User.findByEmail(email);
    if (existingUserByEmail && existingUserByEmail.userID !== req.user.userID) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        error: 'Email already in use',
        message: 'This email is already registered to another account'
      }));
      return;
    }
    const userData = {
      username,
      email,
      phoneNumber,
      companyName: companyName || null,
      locatedIn: locatedIn || null
    };

    const updatedUser = await User.updateProfile(req.user.userID, userData);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      message: 'Profile updated successfully',
      user: updatedUser
    }));

  } catch (error) {
    console.error('Update user profile error:', error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      error: 'Internal server error',
      message: 'Failed to update profile'
    }));
  }
}
// Change password
export async function changePassword(req, res) {
  try {
    const { currentPassword, newPassword } = req.body;

    // Validation
    if (!currentPassword || !newPassword) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        error: 'Missing required fields',
        message: 'Current password and new password are required'
      }));
      return;
    }

    // Validate new password length
    if (newPassword.length < 8) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        error: 'Password must be at least 8 characters long'
      }));
      return;
    }

    // Get full user data with password
    const user = await User.findByIdWithPassword(req.user.userID);

    if (!user) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        error: 'User not found'
      }));
      return;
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(currentPassword, user.pass);
    if (!isPasswordValid) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        error: 'Invalid current password'
      }));
      return;
    }

    // Hash new password (using same salt rounds as registration)
    const saltRounds = 3;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update password
    await User.updatePassword(req.user.userID, hashedPassword);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      message: 'Password changed successfully'
    }));

  } catch (error) {
    console.error('Change password error:', error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      error: 'Internal server error',
      message: 'Failed to change password'
    }));
  }
}

// Delete account
export async function deleteAccount(req, res) {
  try {
    const { password } = req.body;

    // Validation
    if (!password) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        error: 'Password required',
        message: 'Please provide your password to delete your account'
      }));
      return;
    }

    // Get full user data with password
    const user = await User.findByIdWithPassword(req.user.userID);

    if (!user) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        error: 'User not found'
      }));
      return;
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.pass);
    if (!isPasswordValid) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        error: 'Invalid password'
      }));
      return;
    }

    // Delete account
    await User.deleteAccount(req.user.userID);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      message: 'Account deleted successfully'
    }));

  } catch (error) {
    console.error('Delete account error:', error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      error: 'Internal server error',
      message: 'Failed to delete account'
    }));
  }
}