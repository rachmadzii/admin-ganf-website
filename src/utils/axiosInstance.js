import axios from 'axios';
import Cookies from 'js-cookie';

const accessToken = Cookies.get('accessToken');

const instance = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'multipart/form-data',
    authorization: accessToken ? `Bearer ${accessToken}` : '',
  },
});

export default instance;
