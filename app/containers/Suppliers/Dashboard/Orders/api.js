import request from 'utils/request'
import { deliveryMethodsApi, reasonsDeclineListApi, declineOrderApi, refundOrderApi, ordersListApi, ordersCancelApi,ordersArchiveApi,orderLabel,  ordersReturnCountApi, returnsListApi, cancellationsListApi, archivedListApi, orderShowApi, inventoryListApi, postModifyApi, usersApi, ordersShipApi, reasonsRefundListApi} from 'utils/apiRoutes'

export const getProductDetail = postId => request(`${inventoryListApi()}/${postId}`)

export const getOrdersList = query => request(ordersListApi(), query)

export const getArchivedList = query => request(archivedListApi(), query)

export const getOrderDetail = orderId => request(`${orderShowApi()}/${orderId}`)

export const getOrderLabel = (provider, body) => request(orderLabel(provider), { params: body }, 'POST')

export const cancelOrder = (orderId, body) => request(ordersCancelApi(orderId), { params: body }, 'POST')

export const archiveOrder = (orderId, body) => request(ordersArchiveApi(orderId), { params: body }, 'PATCH')

export const shipOrder = (orderId, body) => request(ordersShipApi(orderId), { params: body }, 'PATCH')

export const postModify = (postId, body) => request(postModifyApi(postId), { params: body }, 'PATCH')

export const getReturnsList = query => request(returnsListApi(), query)

export const getReasonsRefundList = query => request(reasonsRefundListApi(), query)

export const getReasonsDeclineList = query => request(reasonsDeclineListApi(), query)

export const refundOrder = (orderId, body) => request(refundOrderApi(orderId), { params: body }, 'POST')

export const declineOrder = (orderId, body) => request(declineOrderApi(orderId), { params: body }, 'POST')

export const getCancellationsList = query => request(cancellationsListApi(), query)

export const getOrdersReturnCount = query => request(ordersReturnCountApi(), query)

export const getUserService = userId => request(usersApi(userId));

export const getDeliveryMethods = query => request(`${deliveryMethodsApi()}`, query)

