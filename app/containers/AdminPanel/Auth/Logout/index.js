import React, { useEffect } from 'react';
import { object, func } from 'prop-types';
import { connect } from 'react-redux';

import Loading from 'components/Common/Loading';
import Routes from 'containers/AdminPanel/Router/Routes.json';
import { logoutAction } from '../action';

const Logout = ({ logout, history }) => {
  useEffect(() => {
    logout();
    history.push(Routes.AdminPanel);
  }, []);

  return <Loading show pageLoading size={60} />;
};

Logout.propTypes = {
  logout: func,
  history: object,
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutAction()),
});

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default withConnect(Logout);
