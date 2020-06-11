import request from 'utils/request'
import { baseURL,userAlbums } from 'utils/apiRoutes'
import axios from 'axios'
// get user albums
export const getUserAlbums = (userId, query) => request(`${userAlbums(userId)}`, query)
export const getUserAlbumCSV = async (userId,query) => {
  const csv = await axios({
    url: `${baseURL}${userAlbums(userId)}`,
    method: 'GET',
    params: query,
    responseType: 'blob',
    headers: { Accept: 'text/csv' }
  })
  return csv
}
