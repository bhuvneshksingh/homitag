import { put, takeLatest, call } from 'redux-saga/effects'
import Cookies from 'universal-cookie'
import {
  loginService,
  getUserService,
  registerService,
} from 'containers/Suppliers/Auth/api'
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
  REGISTER,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from './constants'
const cookies = new Cookies()

function* login(action) {
  yield put({ type: DOLOGIN_REQUEST });
  try {
    const response = yield call(loginService, action.payload);
    cookies.set('authToken', response.data.token, { path: '/suppliers' });
    cookies.set('userId', response.data.user.id, { path: '/suppliers' });
    const userData = {};
    userData.id = response.data.user.id;
    userData.firstName = response.data.user.firstName;
    userData.lastName = response.data.user.lastName;
    userData.email = response.data.user.email;
    userData.profilepictureurl = response.data.user.profilepictureurl;
    userData.location = response.data.user.location;
    cookies.set('userData', JSON.stringify(userData), { path: '/suppliers' });
    yield put({
      type: DOLOGIN_SUCCESS,
      payload: {
        token: response.data.token,
        userInfo: response.data.user,
      },
    });
  } catch (error) {
    yield put({
      type: DOLOGIN_FAILURE,
      payload: error.response.data.result.content.message,
    });
  }
}

function* logout() {
  cookies.remove('authToken', { path: '/suppliers' });
  cookies.remove('userId', { path: '/suppliers' });
  cookies.remove('userData', { path: '/suppliers' });
  yield put({ type: DOLOGOUT_SUCCESS, payload: { token: '', userInfo: {} } });
}

function* authCheck(action) {
  yield put({ type: AUTHCHECK_REQUEST })
  try {
    const response = yield call(getUserService, action.payload.userId)
    yield put({
      type: AUTHCHECK_SUCCESS,
      payload: { token: action.payload.token, userInfo: response.data },
    })
  } catch (error) {
    yield put({ type: AUTHCHECK_FAILURE, payload: error })
  }
}

function* register(action) {
  yield put({ type: REGISTER_REQUEST })
  try {
    const response = yield call(registerService, action.payload)
    cookies.set('userId', response.data.user.id, { path: '/suppliers' })
    cookies.remove('authToken', { path: '/suppliers' })
    yield put({
      type: REGISTER_SUCCESS,
      payload: {
        userInfo: response.data.user,
      },
    })
  } catch (error) {
    yield put({
      type: REGISTER_FAILURE,
      payload: error.response.data.result.content.message,
    })
  }
}

export default function* authSaga() {
  yield takeLatest(DOLOGIN, login)
  yield takeLatest(DOLOGOUT, logout)
  yield takeLatest(AUTHCHECK, authCheck)
  yield takeLatest(REGISTER, register)
}
