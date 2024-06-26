const express = require('express');
const next = require('next');
const connectDB = require('./db');
const cors = require('cors');
require('dotenv').config();

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, dir: '../client' });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();
    server.use(cors());
    // Connect to MongoDB
    connectDB();

    server.use(express.json());
    server.use('/_next', express.static('.next'));
    // Define Routes
    server.use('/api/users', require('./routes/users'));
    server.use('/api/points', require('./routes/points'));
    // Handle Next.js pages
    server.all('*', (req, res) => {
        return handle(req, res);
    });

    server.listen(3001, (err) => {
        if (err) throw err;
        console.log('> Ready on http://localhost:3001');
    });
});
