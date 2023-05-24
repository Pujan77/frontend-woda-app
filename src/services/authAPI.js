import axios from 'axios';

export const loginAPI = async body =>
  await axios.post(`${process.env.REACT_APP_BASE_URL}/api-admin/login`, body);
