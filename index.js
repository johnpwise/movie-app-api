// index.js
require('dotenv').config();
const express = require('express');
const app = express();

// CORS
const cors = require('cors');
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
}));

const moviesRoutes = require('./routes/movies');

app.use(express.json());

// Route registration
app.use('/api/movies', moviesRoutes);

// Future: app.use('/api/actors', actorsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
