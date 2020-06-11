import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectAuth = state => state.auth || initialState

const makeSelectLoginRequesting = () =>
  createSelector(
    selectAuth,
    authState => authState.requesting
  )

const makeSelectLoginSuccess = () =>
  createSelector(
    selectAuth,
    authState => authState.success
  )

const makeSelectLoginFailure = () =>
  createSelector(
    selectAuth,
    authState => authState.error
  )

const makeSelectToken = () =>
  createSelector(
    selectAuth,
    authState => authState.token
  )

const makeSelectUserInfo = () =>
  createSelector(
    selectAuth,
    authState => authState.userInfo
  )

const makeSelectAuthCheckLoading = () =>
  createSelector(
    selectAuth,
    authState => authState.check.requesting
  )

const makeSelectAuthCheckFailure = () =>
  createSelector(
    selectAuth,
    authState => authState.check.error
  )

const makeSelectRegisterLoading = () =>
  createSelector(
    selectAuth,
    authState => authState.register.requesting
  )

const makeSelectRegisterSuccess = () =>
  createSelector(
    selectAuth,
    authState => authState.register.success
  )

const makeSelectRegisterFailure = () =>
  createSelector(
    selectAuth,
    authState => authState.register.error
  )
export {
  makeSelectLoginRequesting,
  makeSelectLoginSuccess,
  makeSelectLoginFailure,
  makeSelectToken,
  makeSelectUserInfo,
  makeSelectAuthCheckLoading,
  makeSelectAuthCheckFailure,
  makeSelectRegisterLoading,
  makeSelectRegisterSuccess,
  makeSelectRegisterFailure,
}
