import request from 'utils/request'
import {
  catalogCategoriesApi,
  baseURL,
  inventoryProductsApi,
} from 'utils/apiRoutes'
import axios from 'axios'

export const getCatalogCategoriesApi = query =>
  request(`${baseURL}/${catalogCategoriesApi}`, query)

export const createProduct = async data => {
  const res = await axios.post(`${baseURL}/catalog/products`, {params: data})
  return res
}

export const createPost = async data => {
  const res = await axios.post(`${baseURL}/catalog/posts/`, { params: data })
  return res
}

export const addProductPhotos = async (postId, formData, config) => {
  const res = await axios.post(
    `${baseURL}/${inventoryProductsApi()}/${postId}/images`,
    formData,
    config
  )
  return res
}
