import { createFreight, deleteFreight, getAllFreights, getUserFreights, updateFreight } from '../controllers/freightController.js';
import { createTruck, deleteTruck, getAllTrucks, getUserTrucks, updateTruck } from '../controllers/truckController.js';
import { loginUser, registerUser } from '../controllers/userController.js';
import { logoutUser, refreshAccessToken } from '../controllers/authController.js';
import { createProfile, getUserProfiles, getProfile, updateProfile, deleteProfile } from '../controllers/profileController.js';


import { authMiddleware } from '../middlewares/authMiddleware.js';
import { parseBody } from '../utils/parseBody.js';

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
    // ========== PROFILE ROUTES ==========

    // Create profile (protected)
    if (req.method === 'POST' && req.url === '/api/profiles') {
        try {
            const body = await parseBody(req);
            req.body = body;
            await authMiddleware(req, res, async () => {
                await createProfile(req, res);
            });
            return;
        } catch (error) {
            console.error('Error in create profile route:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal server error' }));
            return;
        }
    }

    // Get user's profiles (protected)
    if (req.method === 'GET' && req.url === '/api/profiles') {
        try {
            await authMiddleware(req, res, async () => {
                await getUserProfiles(req, res);
            });
            return;
        } catch (error) {
            console.error('Error in get profiles route:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal server error' }));
            return;
        }
    }

    // Get single profile (protected)
    if (req.method === 'GET' && req.url.startsWith('/api/profiles/')) {
        try {
            const profileID = req.url.split('/')[3];
            req.params = { profileID };
            await authMiddleware(req, res, async () => {
                await getProfile(req, res);
            });
            return;
        } catch (error) {
            console.error('Error in get profile route:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal server error' }));
            return;
        }
    }

    // Update profile (protected)
    if (req.method === 'PUT' && req.url.startsWith('/api/profiles/')) {
        try {
            const profileID = req.url.split('/')[3];
            req.params = { profileID };
            const body = await parseBody(req);
            req.body = body;
            await authMiddleware(req, res, async () => {
                await updateProfile(req, res);
            });
            return;
        } catch (error) {
            console.error('Error in update profile route:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal server error' }));
            return;
        }
    }

    // Delete profile (protected)
    if (req.method === 'DELETE' && req.url.startsWith('/api/profiles/')) {
        try {
            const profileID = req.url.split('/')[3];
            req.params = { profileID };
            await authMiddleware(req, res, async () => {
                await deleteProfile(req, res);
            });
            return;
        } catch (error) {
            console.error('Error in delete profile route:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal server error' }));
            return;
        }
    }

    // ========== TRUCK ROUTES ==========

    // Create truck route (protected)
    if (req.method === 'POST' && req.url === '/api/trucks') {
        try {
            const body = await parseBody(req);
            req.body = body;
            await authMiddleware(req, res, async () => {
                await createTruck(req, res);
            });
            return;
        } catch (error) {
            console.error('Error in create truck route:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal server error' }));
            return;
        }
    }

    // Get user's trucks (protected)
    if (req.method === 'GET' && req.url === '/api/trucks/my') {
        try {
            await authMiddleware(req, res, async () => {
                await getUserTrucks(req, res);
            });
            return;
        } catch (error) {
            console.error('Error in get user trucks route:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal server error' }));
            return;
        }
    }

    // Get all trucks
    if (req.method === 'GET' && req.url === '/api/trucks') {
        try {
            await getAllTrucks(req, res);
            return;
        } catch (error) {
            console.error('Error in get all trucks route:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal server error' }));
            return;
        }
    }

    // Update truck (protected)
    if (req.method === 'PUT' && req.url.startsWith('/api/trucks/')) {
        try {
            const truckID = req.url.split('/')[3];
            req.params = { truckID };
            const body = await parseBody(req);
            req.body = body;
            await authMiddleware(req, res, async () => {
                await updateTruck(req, res);
            });
            return;
        } catch (error) {
            console.error('Error in update truck route:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal server error' }));
            return;
        }
    }

    // Delete truck (protected)
    if (req.method === 'DELETE' && req.url.startsWith('/api/trucks/')) {
        try {
            const truckID = req.url.split('/')[3];
            req.params = { truckID };
            await authMiddleware(req, res, async () => {
                await deleteTruck(req, res);
            });
            return;
        } catch (error) {
            console.error('Error in delete truck route:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal server error' }));
            return;
        }
    }

    // ========== FREIGHT ROUTES ==========

    // Create freight route (protected)
    if (req.method === 'POST' && req.url === '/api/freights') {
        try {
            const body = await parseBody(req);
            req.body = body;
            await authMiddleware(req, res, async () => {
                await createFreight(req, res);
            });
            return;
        } catch (error) {
            console.error('Error in create freight route:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal server error' }));
            return;
        }
    }

    // Get user's freights (protected)
    if (req.method === 'GET' && req.url === '/api/freights/my') {
        try {
            await authMiddleware(req, res, async () => {
                await getUserFreights(req, res);
            });
            return;
        } catch (error) {
            console.error('Error in get user freights route:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal server error' }));
            return;
        }
    }

    // Get all freights
    if (req.method === 'GET' && req.url === '/api/freights') {
        try {
            await getAllFreights(req, res);
            return;
        } catch (error) {
            console.error('Error in get all freights route:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal server error' }));
            return;
        }
    }

    // Update freight (protected)
    if (req.method === 'PUT' && req.url.startsWith('/api/freights/')) {
        try {
            const freightID = req.url.split('/')[3];
            req.params = { freightID };
            const body = await parseBody(req);
            req.body = body;
            await authMiddleware(req, res, async () => {
                await updateFreight(req, res);
            });
            return;
        } catch (error) {
            console.error('Error in update freight route:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal server error' }));
            return;
        }
    }

    // Delete freight (protected)
    if (req.method === 'DELETE' && req.url.startsWith('/api/freights/')) {
        try {
            const freightID = req.url.split('/')[3];
            req.params = { freightID };
            await authMiddleware(req, res, async () => {
                await deleteFreight(req, res);
            });
            return;
        } catch (error) {
            console.error('Error in delete freight route:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal server error' }));
            return;
        }
    }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not Found' }));
}