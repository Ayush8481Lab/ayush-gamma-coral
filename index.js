import express from 'express';
import axios from 'axios';
import cors from 'cors'; 
import canvasRoutes from './routes/canvasRoutes.js';
import lyricsRoutes from './routes/lyricsRoutes.js';
import dotenv from 'dotenv';

// 1. Import your service functions directly!
import { getCanvases } from './services/spotifyCanvasService.js';
// Replace this with the actual path to your lyrics logic:
 import { getLyrics } from './services/spotifyLyricsService.js'; 

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Your existing individual routes
app.use('/api/canvas', canvasRoutes);
app.use('/api/lyrics', lyricsRoutes);

// 2. New Combined Endpoint
app.get('/api/data', async (req, res) => {
    const { trackId } = req.query;

    if (!trackId) {
        return res.status(400).json({ error: 'trackId query parameter is required' });
    }

    try {
        // Use Promise.all to fetch both at the exact same time (much faster!)
        // Note: Check if getCanvases expects 'trackId' or 'spotify:track:trackId'
        const [canvasData, lyricsData] = await Promise.all([
            getCanvases(`spotify:track:${trackId}`), 
            getLyrics(trackId) 
        ]);

        // Return the combined response
        res.json({
            success: true,
            data: {
                canvas: canvasData,
                lyrics: lyricsData || null // change this once you import your lyrics function
            }
        });

    } catch (error) {
        console.error("Combined data fetch error:", error);
        res.status(500).json({ error: 'Failed to fetch combined data' });
    }
});

app.listen(PORT, function () {
    console.log("Listening on PORT: ", PORT);
    if (PORT == 3000) { 
      console.log('Running on local: http://localhost:3000');
    }
});
