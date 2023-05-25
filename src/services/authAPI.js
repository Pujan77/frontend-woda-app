import axios from 'axios';

export const loginAPI = async body =>
  await axios.post(`${process.env.REACT_APP_BASE_URL}/api-admin/login`, body);

export const getAllNoticeAdmin = async () =>
  await axios.get(`${process.env.REACT_APP_BASE_URL}/api/notices`, {
    headers: {
      Authorization: JSON.parse(localStorage.getItem('authTokens')).access,
    },
  });

export const submitNoticeAdmin = async body =>
  await axios.post(
    `${process.env.REACT_APP_BASE_URL}/api/post-information/`,
    body,
    {
      headers: {
        Authorization: JSON.parse(localStorage.getItem('authTokens')).access,
      },
    }
  );

export const getAllDonationsAdmin = async () =>
  await axios.get(`${process.env.REACT_APP_BASE_URL}/api/donations/`, {
    headers: {
      Authorization: JSON.parse(localStorage.getItem('authTokens')).access,
    },
  });

export const getAllComplaintsAdmin = async () =>
  await axios.get(`${process.env.REACT_APP_BASE_URL}/api/complain/`, {
    headers: {
      Authorization: JSON.parse(localStorage.getItem('authTokens')).access,
    },
  });

export const addressComplainAdmin = async (param, body) =>
  await axios.put(
    `${process.env.REACT_APP_BASE_URL}/api/complain/${param}/`,
    body,
    {
      headers: {
        Authorization: JSON.parse(localStorage.getItem('authTokens')).access,
      },
    }
  );
