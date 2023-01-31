import { config } from 'dotenv';

config();

const DEFAULT_API_PORT = 4000;

const API_PORT = process.env['PORT'] ?? DEFAULT_API_PORT;

export { API_PORT };
