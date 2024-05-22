import axios from 'axios';
import Cookies from 'js-cookie';

const accessToken = Cookies.get('accessToken');
const getCurrentUrl = () => {
  const url = window.location.href;

  if (url.includes('localhost')) return 'http://localhost:3000';
  return 'https://ganf-backend.vercel.app';
};

const instance = axios.create({
  baseURL: `${getCurrentUrl()}/api`,
  headers: {
    'Content-Type': 'multipart/form-data',
    authorization: accessToken ? `Bearer ${accessToken}` : '',
  },
});

export default instance;
