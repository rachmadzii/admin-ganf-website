import axios from 'axios';
import Cookies from 'js-cookie';
import { getUrl } from './apiUrl';

const accessToken = Cookies.get('accessToken');

const instance = axios.create({
  baseURL: `${getUrl()}/api`,
  headers: {
    'Content-Type': 'multipart/form-data',
    authorization: accessToken ? `Bearer ${accessToken}` : '',
  },
});

export default instance;
