import request from 'utils/request'
import { loginApi, usersApi, regsiterApi } from 'utils/apiRoutes'

export const loginService = body => request(loginApi, { params: body }, 'POST')
export const registerService = body =>
  request(regsiterApi, { params: body }, 'POST')
export const getUserService = userId => request(usersApi(userId))
