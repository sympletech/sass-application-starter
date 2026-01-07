import 'dotenv/config';

import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Backend Server Started: http://localhost:${process.env.SERVER_PORT}`);
});