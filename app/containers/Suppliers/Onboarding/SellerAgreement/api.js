import request from 'utils/request'
import { userBusiness } from 'utils/apiRoutes'

export const sellerAgreementService = (businessId, body) =>
  request(userBusiness(businessId), { params: body }, 'PATCH')
