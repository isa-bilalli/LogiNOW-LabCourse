import http from 'http';
import { handleRequest } from './router.js';

//Krijimi i HTTP Serverit
export function createServer() {
  return http.createServer(handleRequest);
}