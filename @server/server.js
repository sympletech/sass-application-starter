import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import { client } from '@server/lib/mongo-client.js';
import registerOAuth from '@server/lib/regrister-oauth.js';
import registerRoutes from '@server/lib/register-routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
    const app = express();
    app.use(express.json());
    
    // Enable CORS for localhost:3001 for local development only
    app.use(cors({
        origin: 'http://localhost:3001',
        credentials: true
    }));

    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            clientPromise: new Promise((resolve) => resolve(client)),
            dbName: process.env.MONGO_DB_NAME,
            collectionName: 'sessions',
            touchAfter: 24 * 3600
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7
        }
    }));

    registerOAuth(app);
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