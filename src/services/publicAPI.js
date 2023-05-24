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

export const getAllPublicNotices = async () =>
  await axios.get(`${process.env.REACT_APP_BASE_URL}/api/public-notices/`);

export const publicSignupForNotice = async (id, body) =>
  await axios.post(
    `${process.env.REACT_APP_BASE_URL}/api/notice/${id}/signup/`,
    body
  );
export const publicComplain = async (param, body) =>
  await axios.post(
    `${process.env.REACT_APP_BASE_URL}/api/complain/${param}`,
    body
  );
