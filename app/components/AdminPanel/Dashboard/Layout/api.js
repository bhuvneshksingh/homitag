import { baseURL, userReportApi } from 'utils/apiRoutes'
// user count Customer Support
import axios from 'axios'

export const countCustomerSupport = async () => {
  const userSupports = await axios.get(`${baseURL}${userReportApi()}/countCustomerService`)
  return userSupports
}
