import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as Yup from 'yup';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import Input from 'components/Common/Form/Input';
import AuthWrapper from 'components/Suppliers/Wrappers/AuthWrapper';
import { PrimaryButton, LinkButton } from 'components/Common/Button';
import { loginAction } from 'containers/AdminPanel/Auth/action';
import saga from 'containers/AdminPanel/Auth/saga';
import reducer from 'containers/AdminPanel/Auth/reducer';
import { makeSelectLoginRequesting, makeSelectLoginFailure } from 'containers/Suppliers/Auth/selectors';
import Form from 'components/Suppliers/Forms/OnboardingForm';
import Routes from 'containers/AdminPanel/Router/Routes.json';
import messages from './messages';

const key = 'auth';

const Login = ({ intl, login, loading, error }) => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  return (
    <AuthWrapper baseRoute={Routes.AdminPanel}>
      <Form
        formValues={{
          email: '',
          password: '',
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .required(intl.formatMessage(messages.emailRequired))
            .email(intl.formatMessage(messages.invalidEmail)),
          password: Yup.string().required(intl.formatMessage(messages.passwordRequired)),
        })}
        inputs={[
          {
            name: 'email',
            label: intl.formatMessage(messages.email),
            component: Input,
            type: 'text',
          },
          {
            name: 'password',
            label: intl.formatMessage(messages.password),
            component: Input,
            type: 'password',
          },
        ]}
        submitButton={() => (
          <PrimaryButton type="submit" disabled={loading}>
            {intl.formatMessage(messages.login)}
          </PrimaryButton>
        )}
        onSubmit={login}
        loading={loading}
        submitError={error}
      />
      <LinkButton link={Routes.AdminPanel + Routes.ForgotPassword}>
        {intl.formatMessage(messages.forgotPassword)}
      </LinkButton>
    </AuthWrapper>
  );
};

Login.propTypes = {
  intl: PropTypes.object,
  login: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoginRequesting(),
  error: makeSelectLoginFailure(),
});

function mapDispatchToProps(dispatch) {
  return {
    login: body => dispatch(loginAction(body)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  injectIntl,
  memo,
)(Login);
