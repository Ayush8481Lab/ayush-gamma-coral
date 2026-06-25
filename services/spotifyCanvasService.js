import axios from 'axios';

// Replace 'YOUR_ACCESS_TOKEN_HERE' with your actual Spotify access token string
const ACCESS_TOKEN = 'BQDwqh-vBNitf4_R_VnTeUUV0vfSx4fD3ZFgvernfj-Dj1hWVEviOasZG-gW1g7UGyEcxjRL3_pImFYlIj-oxm_DPLDMGSvMbyqEUMDEXDV_S9EQABKnqk3ttR51l4MiXLnnPiPqZ2Wf';

export async function getCanvases(trackUri) {
  const { CanvasRequest, CanvasResponse } = (await import('../proto/_canvas_pb.cjs')).default;
  
  try {
    const accessToken = ACCESS_TOKEN;

    const canvasRequest = new CanvasRequest();
    const track = new CanvasRequest.Track();
    track.setTrackUri(trackUri);
    canvasRequest.addTracks(track);

    const requestBytes = canvasRequest.serializeBinary();

    const response = await axios.post(
      'https://spclient.wg.spotify.com/canvaz-cache/v0/canvases',
      requestBytes,
      {
        responseType: 'arraybuffer',
        headers: {
          'Accept': 'application/protobuf',
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept-Language': 'en',
          'User-Agent': 'Spotify/9.0.34.593 iOS/18.4 (iPhone15,3)',
          'Accept-Encoding': 'gzip, deflate, br',
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    );

    if (response.status !== 200) {
      console.error(`Canvas fetch failed: ${response.status} ${response.statusText}`);
      return null;
    }

    const parsed = CanvasResponse.deserializeBinary(response.data).toObject();
    return parsed;
  } catch (error) {
    console.error(`Canvas request error:`, error);
    return null;
  }
}
