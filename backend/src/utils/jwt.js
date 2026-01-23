import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


//JWT Key
const JWT_SECRET = process.env.JWT_SECRET || 'loginow123!';

export function generateToken(user) {
  const payload = {
    userID: user.userID,
    username: user.username,
    roleID: user.roleID
  };

  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '3d' //Skadimi i tokenit per 3dit
  });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

