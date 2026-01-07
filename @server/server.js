import 'dotenv/config';
import express from 'express';

import registerRoutes from './lib/register-routes.js';

(async () => {
    const app = express();

    await registerRoutes(app);

    app.get('/', (req, res) => {
        res.send('Hello World!');
    });

    app.listen(process.env.SERVER_PORT, () => {
        console.log(`Backend Server Started: http://localhost:${process.env.SERVER_PORT}`);
    });
})();