import { generateAccessToken } from '../utils/jwt.js';
import RefreshToken from '../models/refreshTokens.js';
import User from '../models/User.js';

// Helper function to parse cookies from request
function parseCookies(cookieHeader) {
  const cookies = {};
  if (cookieHeader) {
    // Split by semicolon, but handle cookies that might have values with special characters
    cookieHeader.split(';').forEach(cookie => {
      const trimmed = cookie.trim();
      const equalIndex = trimmed.indexOf('=');
      if (equalIndex > 0) {
        const key = trimmed.substring(0, equalIndex).trim();
        const value = trimmed.substring(equalIndex + 1).trim();
        cookies[key] = value;
      }
    });
  }
  return cookies;
}

export async function refreshAccessToken(req, res) {
  try {
    // Get refresh token from cookie
    const cookieHeader = req.headers.cookie;
    const cookies = parseCookies(cookieHeader);
    const refreshToken = cookies.refreshToken;

    if (!refreshToken) {
      // No refresh token - this is normal on first load or when not logged in
      // Only log in development mode for debugging
      if (process.env.NODE_ENV === 'development') {
        console.log('Refresh token not found (expected if not logged in)');
      }
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        error: 'Refresh token required'
      }));
      return;
    }

    // Find token in database
    const tokenRecord = await RefreshToken.findByToken(refreshToken);

    if (!tokenRecord) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        error: 'Invalid refresh token'
      }));
      return;
    }

    // Check if token is expired
    const now = new Date();
    const expiresAt = new Date(tokenRecord.expires_at);
    if (expiresAt <= now) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        error: 'Refresh token expired'
      }));
      return;
    }

    // Get user data
    const user = await User.findById(tokenRecord.user_id);
    if (!user) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        error: 'User not found'
      }));
      return;
    }

    // Generate new access token
    const accessToken = generateAccessToken(user);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      accessToken
    }));

  } catch (error) {
    console.error('Refresh token error:', error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      error: 'Internal server error',
      message: 'Failed to refresh token'
    }));
  }
}

export async function logoutUser(req, res) {
  try {
    // Get refresh token from cookie
    const cookieHeader = req.headers.cookie;
    const cookies = parseCookies(cookieHeader);
    const refreshToken = cookies.refreshToken;

    if (!refreshToken) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        error: 'Refresh token required'
      }));
      return;
    }

    // Find and revoke token
    const tokenRecord = await RefreshToken.findByToken(refreshToken);
    if (tokenRecord) {
      await RefreshToken.revokeToken(tokenRecord.id);
    }

    // Clear the refresh token cookie
    const clearCookieOptions = [
      'refreshToken=',
      'HttpOnly',
      'SameSite=Lax', // Changed from Strict to Lax for consistency
      'Path=/',
      'Max-Age=0' // Expire immediately
    ].join('; ');

    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Set-Cookie': clearCookieOptions
    });
    res.end(JSON.stringify({
      message: 'Logged out successfully'
    }));

  } catch (error) {
    console.error('Logout error:', error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      error: 'Internal server error',
      message: 'Failed to logout'
    }));
  }
}

