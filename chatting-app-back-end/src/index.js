const express = require('express');
const cors = require('cors');
const { createServer } = require('http');
const { Server } = require('socket.io');
const apiRoutes = require('./api/v1');
require('dotenv').config();
require("./db/db.conn");

const app = express();
const server = createServer(app); // Create HTTP server

app.use(express.json());
app.use(cors())

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

// Handle socket connection
// io.on('connection', (socket) => {
//     console.log('A user connected');

//     socket.on('message', (msg) => {
//         io.emit('message', msg); // Broadcast message to all clients
//     });

//     socket.on('disconnect', () => {
//         console.log('User disconnected');
//     });
// });

app.use('/', apiRoutes(io));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});