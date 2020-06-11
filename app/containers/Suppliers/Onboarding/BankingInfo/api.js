import request from 'utils/request'
import {
  bankAccountApi,
  stripeApi,
  userBusiness,
  stripeUserIdApi,
  bankAccountDetailsApi,
} from 'utils/apiRoutes'

export const createBankAccountService = (userId, body) =>
  request(bankAccountApi(userId), { params: body }, 'POST')

export const updateBankAccountService = (userId, accountId, body) =>
  request(bankAccountDetailsApi(userId, accountId), { params: body }, 'PATCH')

export const createStripeAccountService = body =>
  request(stripeApi, { params: body }, 'POST')

export const updateStripeAccountService = (userId, body) =>
  request(stripeUserIdApi(userId), { params: body }, 'PATCH')

export const updateUserService = (businessId, body) =>
  request(userBusiness(businessId), { params: body }, 'PATCH')

export const getUserStripeAccountsService = userId =>
  request(stripeUserIdApi(userId))
