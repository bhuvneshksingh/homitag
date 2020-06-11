import request from 'utils/request'
import {
  baseURL,
  userAccountApi,
  userReportApi,
  userAccountBalanceApi,
  reportCountApi,
  userAgreementApi,
  userContract,
  reportUser,
} from 'utils/apiRoutes'
import axios from 'axios'
// get user lsit
export const getUserList = query => request(`${userAccountApi()}`, query)
// get single user info by id
export const getUserDetails = uid =>
  request(`${userAccountApi()}${uid}`)
// get single user reviews
export const getUserReviews = (uid, query) =>
  request(`${userAccountApi()}${uid}/review`, query)
// user details report
export const getBalanceService = userId =>
  request(userAccountBalanceApi(userId))
// user report counts
export const getUserReportService = userId =>
  request(reportCountApi(userId))
// user report counts
export const getSupplierAgreement = () =>
  request(userAgreementApi())
// user report counts
export const getUserContract = () =>
  request(userContract())
// change user status
export const changeUserStatus = async (userId, toStatus) => {
  let req = null
  if (toStatus === 'delete') {
    req = await axios.delete(`${baseURL}${userAccountApi()}${userId}`)
  } else {
    let params = {}
    switch (toStatus) {
      case 'active':
        params = { params: { 'status': 'active' } }
        break
      case 'inactive':
        params = { params: { 'status': 'inactive' } }
        break
      default:
        params = { params: { 'status': 'deactivated' } }
        break
    }
    req = await axios.patch(`${baseURL}${userAccountApi()}${userId}`, params)
  }

  return req
}

export const countUserKind = async () => {
  const userKind = await axios.get(`${baseURL}${userReportApi()}/countUserKind`)
  return userKind
}
export const getCSV = async (query) => {
  const csv = await axios({
    url: `${baseURL}${userAccountApi()}`,
    method: 'GET',
    params: query,
    responseType: 'blob',
    headers: { Accept: 'text/csv' },
  })
  return csv
}

export const ReportUser = async (userId, byUserId, reason) => {
  const params = { params: { 'reason': reason, 'reportedByUserId': byUserId, 'reportedUserId': userId } }
  const report = await axios.post(`${baseURL}${reportUser()}`, params)
  return report
}
