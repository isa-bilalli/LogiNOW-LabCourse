import { parseBody } from '../utils/parseBody.js';
import { registerUser } from '../controllers/userController.js';

export async function handleRequest(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Lejon per kerkesa nga gjithkush.
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

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

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not Found' }));
}
