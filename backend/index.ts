import dotenv from 'dotenv';
import { WebServer } from './src/server';
dotenv.config();

const server = new WebServer();
server.start();