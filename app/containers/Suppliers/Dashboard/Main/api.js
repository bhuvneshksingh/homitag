import request from 'utils/request'
import {
  reportCountApi,
  userAccountBalanceApi,
  newsApi,
  invertoryAlertsApi,
  salesReportApi,
} from 'utils/apiRoutes'

export const getActivityTickerService = userId =>
  request(reportCountApi(userId))

export const getBalanceService = userId =>
  request(userAccountBalanceApi(userId))

export const getNewsService = () => request(newsApi(1, 3))

export const getInvertoryAlertsService = userId =>
  request(invertoryAlertsApi(userId, 1, 9))

export const getSalesReportService = (userId, params) =>
  request(salesReportApi(userId), params)
