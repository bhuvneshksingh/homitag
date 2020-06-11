import request from 'utils/request'
import { forgotPasswordApi } from 'utils/apiRoutes'

export const forgotPasswordService = body =>
  request(forgotPasswordApi, body, 'POST')
