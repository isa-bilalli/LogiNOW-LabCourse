import http from 'http';
import { handleRequest } from './routes/router.js';

//Krijimi i HTTP Serverit
export function createServer() {
  return http.createServer(handleRequest);
}