import { createServer } from './server.js';
import initSchema from '../src/config/initDB.js';

const PORT = 3000;

async function startApp() {
// Inicializon skematiken e DB nese nuk egziston
  await initSchema();

// fillon serverin
  const server = createServer();
  server.listen(PORT, () => {
    console.log(`Backend started on port http://localhost:${PORT}`);
  });
}

startApp();