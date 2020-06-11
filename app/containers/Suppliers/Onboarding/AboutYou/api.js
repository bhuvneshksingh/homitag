import request from 'utils/request'
import { usersApi } from 'utils/apiRoutes'

export const aboutYouService = (userId, body) =>
  request(usersApi(userId), { params: body }, 'PATCH')
