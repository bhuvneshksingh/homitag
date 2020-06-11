import { AUTHCHECK, DOLOGIN, DOLOGOUT, UPDATE_USER_INFO } from './constants';

export const loginAction = data => ({ type: DOLOGIN, payload: data });
export const logoutAction = () => ({ type: DOLOGOUT });
export const authCheckAction = payload => ({ type: AUTHCHECK, payload });
export const updateUserInfoAction = payload => ({ type: UPDATE_USER_INFO, payload });
