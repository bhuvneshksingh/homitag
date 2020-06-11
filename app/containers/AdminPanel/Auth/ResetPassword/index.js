import React, { useState } from 'react'
import { object, func } from 'prop-types'
import { injectIntl } from 'react-intl'
import styled from 'styled-components'
import * as Yup from 'yup'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Typography } from '@material-ui/core'
import queryString from 'query-string'

import { useInjectSaga } from 'utils/injectSaga'
import Input from 'components/Common/Form/Input'
import AuthWrapper from 'components/Suppliers/Wrappers/AuthWrapper'
import FormButton from 'components/Common/Form/FormButton'
import saga from 'containers/AdminPanel/Auth/saga'
import { yupEqualTo, passwordValidation } from 'utils/helpers'
import Form from 'components/Suppliers/Forms/OnboardingForm'
import { logoutAction } from 'containers/AdminPanel/Auth/action'
import Routes from 'containers/AdminPanel/Router/Routes.json'
import messages from './messages'
import { resetPasswordService } from './api'

const Description = styled(Typography).attrs({
  component: 'p',
})`
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
  && {
    margin: 50px 0;
  }
`

Yup.addMethod(Yup.string, 'equalTo', yupEqualTo)
const key = 'auth'

const ResetPassword = ({ intl, history, location, logout }) => {
  useInjectSaga({ key, saga })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const qs = queryString.parse(location.search)
  const { token, uId } = qs
  if (!token || !uId) history.push(Routes.AdminPanel)
  const handleSubmit = values => {
    setLoading(true)
    const { password } = values
    resetPasswordService(uId, token, { params: { password } })
      .then(() => {
        logout()
        history.push(Routes.AdminPanel)
      })
      .catch(e => setError(e.response.data.result.content.message))
      .finally(() => setLoading(false))
  }
  return (
    <AuthWrapper showAgreement={false}>
      <Description>{intl.formatMessage(messages.description)}</Description>
      <Form
        formValues={{
          password: '',
          confirmPassword: '',
        }}
        validationSchema={Yup.object().shape({
          password: passwordValidation(
            intl.formatMessage(messages.passwordLength),
            intl.formatMessage(messages.passwordNotValid),
            intl.formatMessage(messages.passwordRequired)
          ),
          confirmPassword: Yup.string()
            .required(intl.formatMessage(messages.confirmPasswordRequired))
            .equalTo(
              Yup.ref('password'),
              intl.formatMessage(messages.passwordNotMatch)
            ),
        })}
        inputs={[
          {
            name: 'password',
            label: intl.formatMessage(messages.newPassword),
            component: Input,
            type: 'password',
          },
          {
            name: 'confirmPassword',
            label: intl.formatMessage(messages.confirmNewPassword),
            component: Input,
            type: 'password',
          },
        ]}
        submitButton={formIsValid => (
          <FormButton type="submit" disabled={loading} primary={formIsValid}>
            {intl.formatMessage(messages.resetPassword)}
          </FormButton>
        )}
        onSubmit={handleSubmit}
        loading={loading}
        submitError={error}
      />
    </AuthWrapper>
  )
}

ResetPassword.propTypes = {
  intl: object,
  location: object,
  history: object,
  logout: func,
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logoutAction()),
  }
}

const withConnect = connect(
  null,
  mapDispatchToProps
)

export default compose(
  withConnect,
  injectIntl
)(ResetPassword)
