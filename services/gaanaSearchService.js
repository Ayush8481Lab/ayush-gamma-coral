// services/gaanaSearchService.js
import axios from 'axios';

export async function searchSongs(keyword) {
  try {
    // encodeURIComponent ensures spaces and special characters are handled safely in the URL
    const encodedKeyword = encodeURIComponent(keyword);
    const url = `https://gaana.com/apiv2?country=IN&startIndex=0&secType=track&type=search&keyword=${encodedKeyword}`;

    const response = await axios.get(url, {
      headers: {
        // Pretending to be a standard Android device to prevent Gaana from blocking the request
        'User-Agent': 'Mozilla/5.0 (Linux; Android 13; SM-S908B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36',
        'Accept': 'application/json'
      }
    });

    if (response.status !== 200) {
      console.error(`Gaana search failed: ${response.status}`);
      return null;
    }

    return response.data;
  } catch (error) {
    console.error(`Gaana search request error:`, error.message);
    return null;
  }
}
