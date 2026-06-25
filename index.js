import express from 'express';
import axios from 'axios';
import cors from 'cors'; // 1. Import CORS
import canvasRoutes from './routes/canvasRoutes.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = 3000;

// 2. Add CORS middleware BEFORE your routes
// Using cors() without any options automatically allows ALL apps ('*') to use your API.
app.use(cors());

app.use('/api/canvas', canvasRoutes);
app.use('/api/lyrics', lyricsRoutes);

app.listen(PORT, function () {
    console.log("Listening on PORT: ", PORT);
    if (PORT == 3000) { 
      console.log('Running on local: http://localhost:3000');
    }
});
