const YOUTUBE_BASE_URL = `https://youtube.googleapis.com/youtube/v3`;
const YOUTUBE_API_KEY = `AIzaSyBi2VvodI7MPiqiw6493mgQ5sDYMcD_KBY`;

const fetchVideos = async () => {
  const response = await fetch(`${YOUTUBE_BASE_URL}/v3/videos?part=id,player&chart=mostPopular&prettyPrint=true&key=${YOUTUBE_API_KEY}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log("response", response);
  return response;
};

export { fetchVideos };
