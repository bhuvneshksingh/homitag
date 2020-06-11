import request from 'utils/request'
import { baseURL,userSavedItems } from 'utils/apiRoutes'
import axios from 'axios'
// get user albums
export const getUserSavedItems = (userId, query) => request(`${userSavedItems(userId)}`, query)
export const getUserSavedItemsCSV = async (userId,query) => {
  const csv = await axios({
    url: `${baseURL}${userSavedItems(userId)}`,
    method: 'GET',
    params: query,
    responseType: 'blob',
    headers: { Accept: 'text/csv' }
  })
  return csv
}
