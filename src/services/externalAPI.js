import axios from 'axios';

export const getNewsAPI = async param =>
  await axios.get(
    `https://newsdata.io/api/1/news?apikey=${process.env.REACT_APP_NEWS_API_KEY}${param}`
  );
