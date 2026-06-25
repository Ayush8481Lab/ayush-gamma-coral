import express from 'express';
import axios from 'axios';
import cors from 'cors'; 
import canvasRoutes from './routes/canvasRoutes.js';
import lyricsRoutes from './routes/lyricsRoutes.js';
import dotenv from 'dotenv';

// Import your services
import { getCanvases } from './services/spotifyCanvasService.js';
import { searchSongs } from './services/gaanaSearchService.js'; // 1. Import new service

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use('/api/canvas', canvasRoutes);
app.use('/api/lyrics', lyricsRoutes);

// Your combined data endpoint
app.get('/api/data', async (req, res) => {
    // ... (Your existing combined data code here) ...
});

// 2. New Search Endpoint
app.get('/api/search', async (req, res) => {
    const { keyword } = req.query;

    if (!keyword) {
        return res.status(400).json({ error: 'keyword query parameter is required' });
    }

    try {
        const searchResults = await searchSongs(keyword);

        if (!searchResults) {
            return res.status(500).json({ error: 'Failed to fetch search results from Gaana' });
        }

        res.json({
            success: true,
            data: searchResults
        });

    } catch (error) {
        console.error("Search API error:", error);
        res.status(500).json({ error: 'Internal server error during search' });
    }
});

app.listen(PORT, function () {
    console.log("Listening on PORT: ", PORT);
    if (PORT == 3000) { 
      console.log('Running on local: http://localhost:3000');
    }
});
