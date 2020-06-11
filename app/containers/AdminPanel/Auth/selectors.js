import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectAuth = state => state.auth || initialState;

const makeSelectLoginRequesting = () =>
  createSelector(
    selectAuth,
    authState => authState.requesting,
  );

const makeSelectLoginSuccess = () =>
  createSelector(
    selectAuth,
    authState => authState.success,
  );

const makeSelectLoginFailure = () =>
  createSelector(
    selectAuth,
    authState => authState.error,
  );

const makeSelectToken = () =>
  createSelector(
    selectAuth,
    authState => authState.token,
  );

const makeSelectRoles = () =>
  createSelector(
    selectAuth,
    authState => authState.roles,
  );

const makeSelectUserInfo = () =>
  createSelector(
    selectAuth,
    authState => authState.userInfo,
  );

const makeSelectAuthCheckLoading = () =>
  createSelector(
    selectAuth,
    authState => authState.check.requesting,
  );

const makeSelectAuthCheckFailure = () =>
  createSelector(
    selectAuth,
    authState => authState.check.error,
  );

export {
  makeSelectLoginRequesting,
  makeSelectLoginSuccess,
  makeSelectLoginFailure,
  makeSelectToken,
  makeSelectRoles,
  makeSelectUserInfo,
  makeSelectAuthCheckLoading,
  makeSelectAuthCheckFailure,
};
