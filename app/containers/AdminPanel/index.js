import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import axios from 'axios';
import Cookies from 'universal-cookie';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import saga from 'containers/AdminPanel/Auth/saga';
import Loading from 'components/Common/Loading';
import { OuterRouter, InnerRouter } from './Router';
import {
  makeSelectToken,
  makeSelectUserInfo,
  makeSelectLoginSuccess,
  makeSelectAuthCheckLoading,
  makeSelectRoles,
  // makeSelectAuthCheckFailure,
} from './Auth/selectors';
import reducer from './Auth/reducer';
import { authCheckAction } from './Auth/action';
import { loginRedirection } from './Router/redirection';

const key = 'auth';

// Here we decide when to show Inner or Outer routes
const AdminPanel = ({
  token,
  roles,
  userInfo,
  success,
  history,
  authCheck,
  authCheckLoading,
  // authCheckError,
}) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const setToken = (t, userId) => {
    axios.defaults.headers.common.authToken = t;
    authCheck({ token: t, userId });
  };
  useEffect(() => {
    const cookies = new Cookies();
    setToken(cookies.get('authToken'), cookies.get('userId'));
  }, []);
  useEffect(() => {
    axios.defaults.headers.common.authToken = token;
  }, [token]);
  useEffect(() => {
    if (success && token) {
      history.push(loginRedirection(userInfo, roles));
    }
  }, [success]);
  if (authCheckLoading) return <Loading pageLoading size={60} />;
  return token ? <InnerRouter /> : <OuterRouter />;
};

AdminPanel.propTypes = {
  token: PropTypes.string,
  roles: PropTypes.array,
  userInfo: PropTypes.object,
  success: PropTypes.bool,
  history: PropTypes.object,
  authCheck: PropTypes.func,
  authCheckLoading: PropTypes.bool,
  // authCheckError: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  token: makeSelectToken(),
  roles: makeSelectRoles(),
  userInfo: makeSelectUserInfo(),
  success: makeSelectLoginSuccess(),
  authCheckLoading: makeSelectAuthCheckLoading(),
  // authCheckError: makeSelectAuthCheckFailure(),
});

function mapDispatchToProps(dispatch) {
  return {
    authCheck: payload => dispatch(authCheckAction(payload)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AdminPanel);
