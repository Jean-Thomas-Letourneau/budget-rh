const express = require('express');
const http = require('http');
const cors = require('cors');
const socketIo = require('socket.io');

const employeRoutes = require('./routes/employeRoutes');
const composantRoutes = require('./routes/composantRoutes'); // Corrected
const fondsDebitRoutes = require('./routes/fondsDebitRoutes'); // Corrected
const deductionRoutes = require('./routes/deductionRoutes'); // Corrected
const fondsCreditRoutes = require('./routes/fondsCreditRoutes'); // Corrected

const associateModels = require('./associateModels');
associateModels();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
    req.io = io;
    next();
});

// Routes
app.use(employeRoutes);
app.use(composantRoutes);
app.use(fondsDebitRoutes);
app.use(deductionRoutes);
app.use(fondsCreditRoutes);

// Socket.IO
io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;

