import request from 'utils/request'
import { userBusiness } from 'utils/apiRoutes'

export const yourBusinessService = (userId, body) =>
  request(userBusiness(userId), { params: body }, 'POST')
export const yourBusinessUpdateService = (businessId, body) =>
  request(userBusiness(businessId), { params: body }, 'PATCH')
