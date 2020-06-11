import request from 'utils/request'
import { userBusiness, marketplacesApi } from 'utils/apiRoutes'

export const updateCatalogService = (businessId, body) =>
  request(userBusiness(businessId), { params: body }, 'PATCH')

export const getMarketplacesService = () => request(marketplacesApi)
