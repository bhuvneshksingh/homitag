import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { compose } from 'redux'
import * as Yup from 'yup'
import { createStructuredSelector } from 'reselect'

import { useInjectReducer } from 'utils/injectReducer'
import { useInjectSaga } from 'utils/injectSaga'
import Input from 'components/Common/Form/Input'
import AuthWrapper from 'components/Suppliers/Wrappers/AuthWrapper'
import {
  OutlinePrimaryButton,
  PrimaryButton,
  LinkButton,
} from 'components/Common/Button'
import { loginAction } from 'containers/Suppliers/Auth/action'
import saga from 'containers/Suppliers/Auth/saga'
import reducer from 'containers/Suppliers/Auth/reducer'
import {
  makeSelectLoginRequesting,
  makeSelectLoginFailure,
} from 'containers/Suppliers/Auth/selectors'
import Form from 'components/Suppliers/Forms/OnboardingForm'
import Routes from 'containers/Suppliers/Router/Routes.json'
import styled from 'styled-components'
import messages from './messages'

const key = 'auth'

const BoldPrimaryButton = styled(PrimaryButton)`
  && {
    font-weight: 600;
    font-size: 16px;
  }
`
const BoldOutlineButton = styled(OutlinePrimaryButton)`
  && {
    font-weight: 600;
    font-size: 16px;
  }
`

const StyledLinkButton = styled(LinkButton)`
  && {
    font-size: 16px;
    line-height: 20px;
    text-decoration-line: underline;
  }
`

const Login = ({ intl, login, loading, error }) => {
  useInjectReducer({ key, reducer })
  useInjectSaga({ key, saga })
  return (
    <AuthWrapper>
      <Form
        formValues={{
          email: '',
          password: '',
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .required(intl.formatMessage(messages.emailRequired))
            .email(intl.formatMessage(messages.invalidEmail)),
          password: Yup.string().required(
            intl.formatMessage(messages.passwordRequired)
          ),
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
          <BoldPrimaryButton type="submit" disabled={loading}>
            {intl.formatMessage(messages.login)}
          </BoldPrimaryButton>
        )}
        onSubmit={login}
        loading={loading}
        submitError={error}
      />
      <BoldOutlineButton link={Routes.Suppliers + Routes.Register}>
        {intl.formatMessage(messages.createAccount)}
      </BoldOutlineButton>
      <StyledLinkButton link={Routes.Suppliers + Routes.ForgotPassword}>
        {intl.formatMessage(messages.forgotPassword)}
      </StyledLinkButton>
    </AuthWrapper>
  )
}

Login.propTypes = {
  intl: PropTypes.object,
  login: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.string,
}

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoginRequesting(),
  error: makeSelectLoginFailure(),
})

function mapDispatchToProps(dispatch) {
  return {
    login: body => dispatch(loginAction(body)),
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(
  withConnect,
  injectIntl,
  memo
)(Login)
