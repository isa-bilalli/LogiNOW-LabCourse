import { parseBody } from '../utils/parseBody.js';
import { registerUser, loginUser } from '../controllers/userController.js';
import { refreshAccessToken, logoutUser } from '../controllers/authController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

export async function handleRequest(req, res) {
  // For cookies to work, we need to specify the origin (can't use '*')
  // In production, replace with your actual frontend URL
  const allowedOrigin = process.env.FRONTEND_URL || 'http://localhost:5173';
  res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true'); // Required for cookies

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
        }
// Nese route eshte /api/health ne console do te bej log nje status te backendit, bazuar ne gjendje
    if (req.method === 'GET' && req.url === '/api/health') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'UP' }));
        return;
    }

// Registration route
    if (req.method === 'POST' && req.url === '/api/register') {
        try {
            const body = await parseBody(req);
            req.body = body;
            await registerUser(req, res);
            return;
        } catch (error) {
            console.error('Error parsing request body:', error);
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Invalid request body' }));
            return;
        }
    }

    // Login route
    if (req.method === 'POST' && req.url === '/api/login') {
        try {
            const body = await parseBody(req);
            req.body = body;
            await loginUser(req, res);
            return;
        } catch (error) {
            console.error('Router: Error in login route:', error);
            console.error('Router: Error stack:', error.stack);
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Invalid request body' }));
            return;
        }
    }

    // Refresh token route
    if (req.method === 'POST' && req.url === '/api/refresh') {
        try {
            await refreshAccessToken(req, res);
            return;
        } catch (error) {
            console.error('Error in refresh route:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal server error' }));
            return;
        }
    }

    // Logout route
    if (req.method === 'POST' && req.url === '/api/logout') {
        try {
            await logoutUser(req, res);
            return;
        } catch (error) {
            console.error('Error in logout route:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal server error' }));
            return;
        }
    }

    // Protected route example - Get current user info
    if (req.method === 'GET' && req.url === '/api/me') {
        try {
            await authMiddleware(req, res, async () => {
                // req.user is available here (set by authMiddleware)
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    user: req.user
                }));
            });
            return;
        } catch (error) {
            console.error('Error in protected route:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal server error' }));
            return;
        }
    }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not Found' }));
}
