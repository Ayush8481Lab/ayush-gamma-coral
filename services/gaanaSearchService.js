import axios from 'axios';

export async function searchSongs(keyword) {
  try {
    const encodedKeyword = encodeURIComponent(keyword);
    const url = `https://gaana.com/apiv2?country=IN&startIndex=0&secType=track&type=search&keyword=${encodedKeyword}`;

    const response = await axios.get(url, {
      headers: {
        // Imitate a standard Chrome Desktop browser
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'en-US,en;q=0.9',
        // Crucial headers to tell Gaana the request is "coming" from their own site
        'Referer': 'https://gaana.com/',
        'Origin': 'https://gaana.com'
      }
    });

    if (response.status !== 200) {
      console.error(`Gaana search failed: ${response.status}`);
      return null;
    }

    return response.data;
  } catch (error) {
    // Better Error Logging: This will tell you EXACTLY why Gaana rejected the request
    if (error.response) {
      console.error(`Gaana API Error [${error.response.status}]:`, error.response.data);
    } else if (error.request) {
      console.error(`Gaana Network Error: No response received from Gaana.`, error.message);
    } else {
      console.error(`Gaana Axios Error:`, error.message);
    }
    
    return null; // Return null so your Express route knows it failed
  }
}
