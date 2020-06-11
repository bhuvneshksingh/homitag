import request from 'utils/request'
import {
  userBusiness,
  catalogsApi,
  catalogCategoriesApi,
} from 'utils/apiRoutes'

export const updateCatalogService = (businessId, body) =>
  request(userBusiness(businessId), { params: body }, 'PATCH')

export const getOptionsService = () => request(catalogsApi)

export const getCategoriesService = () => request(catalogCategoriesApi)
