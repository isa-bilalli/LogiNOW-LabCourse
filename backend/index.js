import { createServer } from './server.js';

const PORT = 3000;

const server = createServer();

server.listen(PORT, () => {
  console.log(`Backend started on port http://localhost:${PORT}`);
});