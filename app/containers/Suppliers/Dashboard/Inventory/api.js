import request from 'utils/request'
import axios from 'axios'
import { inventoryListApi, inventoryProductsApi, baseURL, deliveryMethodsApi } from 'utils/apiRoutes'

// MAIN
export const getInventoryList = query => request(`${inventoryListApi()}`, query)

// PRODUCT DETAIL
export const getProductDetail = postId =>
  request(`${inventoryListApi()}/${postId}`)

// PRODUCT PRICE RAnge
export const getProductPriceRange = id =>
  request(`${inventoryProductsApi()}/${id}/minMaxPrice`)

// PHOTOS MODAL
export const deleteProductPhotos = async ( postId, imageId) =>{
  const res = await axios.delete(`${baseURL}/${inventoryProductsApi()}/${postId}/images/${imageId}`)
  return res
}

export const addProductPhotos = async (postId, formData, config) =>{
  const res = await axios.post(`${baseURL}/${inventoryProductsApi()}/${postId}/images`, formData, config)
  return res
}

// ACTIONS
export const updateAction = async (postStatusId, postId) =>{
  const res = await axios.patch(`${baseURL}${inventoryListApi()}/${postId}`, {params: {postStatusId}})
  return res
}

export const deletePost = async (postId) =>{
  const res = await axios.delete(`${baseURL}${inventoryListApi()}/${postId}`)
  return res
}

export const archiveAction = async (postId) =>{
  const res = await axios.patch(`${baseURL}${inventoryListApi()}/${postId}`,
    {params: {archived: true}}
  )
  return res
}
export const unarchiveAction = async (postId) =>{
  const res = await axios.patch(`${baseURL}${inventoryListApi()}/${postId}`,
    {params: {archived: false}}
  )
  return res
}

export const editPricePost = async (postId, initialPrice) => {
  const res = await axios.patch(`${baseURL}${inventoryListApi()}/${postId}`, {
    params: { initialPrice },
  })
  return res
}

export const editPost = async (postId, taxExempt, availableQuantity, initialPrice) =>{
  const res = await axios.patch(`${baseURL}${inventoryListApi()}/${postId}`,
    {params: {taxExempt, availableQuantity, initialPrice}}
  )
  return res
}

export const editPostQuantity = async (postId, availableQuantity) =>{
  const res = await axios.patch(`${baseURL}${inventoryListApi()}/${postId}`,
    {params: { availableQuantity }}
  )
  return res
}

export const editAddress = async (postId, address) =>{
  const res = await axios.patch(`${baseURL}/${inventoryListApi()}/${postId}`,
    {params: {address}}
  )
  return res
}

// SHIPPING
export const getDeliveryMethods = query => request(`${deliveryMethodsApi()}`, query)

export const updateShipping = async (postId, deliveryMethods) =>{
  const res = await axios.patch(`${baseURL}${inventoryListApi()}/${postId}`,
    {params: {deliveryMethods}}
  )
  return res
}
