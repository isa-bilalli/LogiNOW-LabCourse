import { verifyAccessToken } from "../utils/jwt.js";

export async function authMiddleware(req, res, next) {
    try {
    // Extract token from Authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'No token provided' }));
      return;
    }
    
    const token = authHeader.substring(7).trim(); // Remove 'Bearer ' prefix and trim whitespace
    const decoded = verifyAccessToken(token);
    
    if (!decoded) {
      if (process.env.NODE_ENV === 'development') {
        console.log('Token verification failed. Token:', token.substring(0, 20) + '...');
      }
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Invalid or expired token' }));
      return;
    }
    
    // Attach user info to request object
    req.user = decoded;
    await next();
    
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Authentication error' }));
  }
}