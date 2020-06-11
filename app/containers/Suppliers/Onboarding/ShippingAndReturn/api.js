import request from 'utils/request'
import { userBusiness, businessShipping } from 'utils/apiRoutes'

export const updateShippingService = (businessId, body) =>
  request(userBusiness(businessId), { params: body }, 'PATCH')

export const getOptionsService = () => request(businessShipping)
