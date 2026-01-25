import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();


//JWT Key
const JWT_SECRET = process.env.JWT_SECRET || 'loginow123!';

export function generateAccessToken(user) {
  const payload = {
    userID: user.userID,  // Ndryshuar nga 'id' në 'userID'
    username: user.username,
    role: user.roleID
  };

  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '30m' //Skadimi i tokenit per 30min
  });
}
//verifikimi se a eshte i sakte access token
export function verifyAccessToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

//gjenerimi i refresh token
export function generateRefreshToken() {
  return crypto.randomBytes(64).toString('hex');
}

// Hash refresh token using SHA-256 (fast and secure for tokens)
export function hashRefreshToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

// Verify a token against a stored hash (direct comparison since SHA-256 is deterministic)
export function verifyRefreshToken(token, hashedToken) {
  const tokenHash = hashRefreshToken(token);
  return tokenHash === hashedToken;
}

export function getRefreshTokenExpiry(days = 30){
  const now = new Date();
  now.setDate(now.getDate() + days); // Shton 30 dit afat per skadimin e tokenit  
  return now;
}