import Twitter from 'twitter-lite';

const client = new Twitter({
  subdomain: "api", // "api" is the default
  consumer_key: "YOUR_CONSUMER_KEY",
  consumer_secret: "YOUR_CONSUMER_SECRET",
  access_token_key: "YOUR_ACCESS_TOKEN",
  access_token_secret: "YOUR_ACCESS_TOKEN_SECRET"
});

const tweet = async (status) => {
  try {
    const response = await client.post("statuses/update", { status });
    console.log(response);
  } catch (error) {
    console.error('Error tweeting:', error);
  }
};

export default tweet;
