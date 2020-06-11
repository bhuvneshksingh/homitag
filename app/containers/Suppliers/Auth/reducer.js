import produce from 'immer'
import {
  AUTHCHECK_FAILURE,
  AUTHCHECK_REQUEST,
  AUTHCHECK_SUCCESS,
  DOLOGIN_FAILURE,
  DOLOGIN_REQUEST,
  DOLOGIN_SUCCESS,
  DOLOGOUT_SUCCESS,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  UPDATE_USER_INFO,
} from './constants'

// The initial state of the App
export const initialState = {
  check: {
    requesting: true,
    error: '',
  },
  register: {
    requesting: false,
    success: false,
    error: '',
  },
  requesting: false,
  token: '',
  userInfo: {},
  error: '',
  success: false,
}

/* eslint-disable default-case, no-param-reassign */
const authReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DOLOGIN_REQUEST:
        draft.requesting = true
        draft.token = ''
        draft.userInfo = {}
        draft.error = ''
        draft.success = false
        break
      case AUTHCHECK_REQUEST:
        draft.check.requesting = true
        draft.token = ''
        draft.userInfo = {}
        draft.check.error = ''
        draft.success = false
        break
      case DOLOGIN_SUCCESS:
        draft.requesting = false
        draft.token = action.payload.token
        draft.userInfo = action.payload.userInfo
        draft.success = true
        break
      case AUTHCHECK_SUCCESS:
        draft.check.requesting = false
        draft.token = action.payload.token
        draft.userInfo = action.payload.userInfo
        // draft.success = true;
        break
      case DOLOGIN_FAILURE:
        draft.requesting = false
        draft.error = action.payload
        break
      case AUTHCHECK_FAILURE:
        draft.check.requesting = false
        draft.check.error = action.payload
        break
      case REGISTER_REQUEST:
        draft.register.requesting = true
        draft.register.success = false
        draft.register.error = ''
        break
      case REGISTER_SUCCESS:
        draft.register.requesting = false
        draft.register.success = true
        draft.userInfo = action.payload.userInfo
        break
      case REGISTER_FAILURE:
        draft.register.requesting = false
        draft.register.error = action.payload
        break
      case DOLOGOUT_SUCCESS:
        draft.token = action.payload.token
        draft.userInfo = action.payload.userInfo
        break
      case UPDATE_USER_INFO:
        draft.userInfo = { ...draft.userInfo, ...action.payload }
        break
    }
  })

export default authReducer
