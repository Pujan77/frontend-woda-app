import axios from 'axios';

export const subscribeToContent = async (param, body) =>
  await axios.post(
    `${process.env.REACT_APP_BASE_URL}/api/user-messages/${param}`,
    body
  );
export const editSubscribeToContent = async (param, body) =>
  await axios.put(
    `${process.env.REACT_APP_BASE_URL}/api/user-messages/${param}`,
    body
  );

export const donatePostAPI = async (param, body) =>
  await axios.post(
    `${process.env.REACT_APP_BASE_URL}/api/donate/?email=${param}`,
    body
  );
