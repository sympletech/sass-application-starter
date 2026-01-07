import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import registerRoutes from './lib/register-routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
    const app = express();

    // Enable CORS for localhost:3001
    app.use(cors({
        origin: 'http://localhost:3001',
        credentials: true
    }));

    await registerRoutes(app);

    const clientDistPath = path.join(__dirname, '..', '@client', 'dist');
    app.use(express.static(clientDistPath));

    app.use((req, res) => {
        res.sendFile(path.join(clientDistPath, 'index.html'));
    });

    app.listen(process.env.VITE_SERVER_PORT, () => {
        console.log(`Backend Server Started: http://localhost:${process.env.VITE_SERVER_PORT}`);
    });
})();