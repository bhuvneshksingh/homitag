import { put, takeLatest, call } from 'redux-saga/effects';
import Cookies from 'universal-cookie';
import { loginService, getUserService } from 'containers/AdminPanel/Auth/api';
import {
  AUTHCHECK,
  AUTHCHECK_FAILURE,
  AUTHCHECK_REQUEST,
  AUTHCHECK_SUCCESS,
  DOLOGIN,
  DOLOGIN_FAILURE,
  DOLOGIN_REQUEST,
  DOLOGIN_SUCCESS,
  DOLOGOUT,
  DOLOGOUT_SUCCESS,
} from './constants';
const cookies = new Cookies();

function* login(action) {
  yield put({ type: DOLOGIN_REQUEST });
  try {
    const response = yield call(loginService, action.payload);
    if(response.data.roles.indexOf('Admin') === -1 && response.data.roles.indexOf('SuperAdmin') === -1
    && response.data.roles.indexOf('UserAdmin') === -1)
      yield put({
        type: DOLOGIN_FAILURE,
        payload: 'User Admin is required.',
      });
    else{
      cookies.set('authToken', response.data.token, { path: '/admin-panel' });
      cookies.set('userId', response.data.user.id, { path: '/admin-panel' });

      yield put({
        type: DOLOGIN_SUCCESS,
        payload: {
          token: response.data.token,
          userInfo: response.data.user,
          roles: response.data.roles
        },
      });
    }
  } catch (error) {
    yield put({
      type: DOLOGIN_FAILURE,
      payload: error.response.data.result.content.message,
    });
  }
}

function* logout() {
  cookies.remove('authToken', { path: '/admin-panel' });
  cookies.remove('userId', { path: '/admin-panel' });
  yield put({ type: DOLOGOUT_SUCCESS, payload: { token: '', userInfo: {} } });
}

function* authCheck(action) {
  yield put({ type: AUTHCHECK_REQUEST });
  try {
    const response = yield call(getUserService, action.payload.userId);
    yield put({
      type: AUTHCHECK_SUCCESS,
      payload: { token: action.payload.token, userInfo: response.data },
    });
  } catch (error) {
    yield put({ type: AUTHCHECK_FAILURE, payload: error });
  }
}

export default function* authSaga() {
  yield takeLatest(DOLOGIN, login);
  yield takeLatest(DOLOGOUT, logout);
  yield takeLatest(AUTHCHECK, authCheck);
}
