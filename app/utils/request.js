import axios from 'axios'
import { baseURL } from 'utils/apiRoutes'

export default function request(url, data, method = 'GET') {
  const params = {
    url,
    baseURL,
    method,
    data: method !== 'GET' ? data : undefined,
    params: method === 'GET' ? data : undefined,
  }
  // console.log('requestUrl: ', url);
  // console.log('params: ', params);
  return axios(params)
}
