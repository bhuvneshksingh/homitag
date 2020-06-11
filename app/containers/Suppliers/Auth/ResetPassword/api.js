import request from 'utils/request'
import { resetPasswordApi } from 'utils/apiRoutes'

export const resetPasswordService = (userId, resetToken, body) =>
  request(resetPasswordApi(userId, resetToken), body, 'POST')
