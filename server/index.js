const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, dir: '../client/src' });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    server.get('/api/hello', (req, res) => {
        res.json({ message: 'Hello from Express!' });
    });

    server.all('*', (req, res) => {
        return handle(req, res);
    });

    server.listen(3001, (err) => {
        if (err) throw err;
        console.log('> Ready on http://localhost:3001');
    });
});