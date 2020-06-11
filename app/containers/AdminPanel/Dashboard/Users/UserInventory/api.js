import request from 'utils/request'
import { baseURL, customerService, userReportApi } from 'utils/apiRoutes'
import axios from 'axios'
// get user Support lsit
export const getUserSupports = query => request(`${customerService()}`, query)
// get single user info by id
export const getUserSupportDetails = uid =>
  request(`${customerService()}/${uid}`)
// user count Customer Support
export const countCustomerSupport = async () => {
  const userSupports = await axios.get(`${baseURL}${userReportApi()}/countCustomerService`)
  return userSupports
}
