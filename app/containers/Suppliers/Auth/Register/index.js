import React, { useEffect, memo } from 'react'
import { bool, func, string, object } from 'prop-types'
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
  PrimaryButton,
} from 'components/Common/Button'
import { registerAction } from 'containers/Suppliers/Auth/action'
import saga from 'containers/Suppliers/Auth/saga'
import { yupEqualTo, passwordValidation } from 'utils/helpers'
import reducer from 'containers/Suppliers/Auth/reducer'
import {
  makeSelectRegisterLoading,
  makeSelectRegisterFailure,
  makeSelectRegisterSuccess,
} from 'containers/Suppliers/Auth/selectors'
import Form from 'components/Suppliers/Forms/OnboardingForm'
import Routes from 'containers/Suppliers/Router/Routes.json'
import styled from 'styled-components'
import messages from './messages'

Yup.addMethod(Yup.string, 'equalTo', yupEqualTo)
const key = 'auth'

const BoldPrimaryButton = styled(PrimaryButton)`
  && {
    font-weight: 600;
    font-size: 16px;
  }
`

const Register = ({ intl, register, loading, error, success, history }) => {
  useInjectReducer({ key, reducer })
  useInjectSaga({ key, saga })
  const handleSubmit = values => {
    const { firstName, lastName, email, password } = values
    register({ firstName, lastName, email, password })
  }
  useEffect(() => {
    if (success) history.push(Routes.Suppliers + Routes.Verification)
  }, [success])
  return (
    <AuthWrapper>
      <Form
        formValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          passwordConfirm: '',
        }}
        validationSchema={Yup.object().shape({
          firstName: Yup.string().required(
            intl.formatMessage(messages.firstNameRequired)
          ),
          lastName: Yup.string().required(
            intl.formatMessage(messages.lastNameRequired)
          ),
          email: Yup.string()
            .required(intl.formatMessage(messages.emailRequired))
            .email(intl.formatMessage(messages.invalidEmail)),
          password: passwordValidation(
            intl.formatMessage(messages.passwordLength),
            intl.formatMessage(messages.passwordNotValid),
            intl.formatMessage(messages.passwordRequired)
          ),
          passwordConfirm: Yup.string()
            .required(intl.formatMessage(messages.passwordConfirmRequired))
            .equalTo(
              Yup.ref('password'),
              intl.formatMessage(messages.passwordNotMatch)
            ),
        })}
        inputs={[
          {
            name: 'firstName',
            label: intl.formatMessage(messages.firstName),
            component: Input,
            type: 'text',
          },
          {
            name: 'lastName',
            label: intl.formatMessage(messages.lastName),
            component: Input,
            type: 'text',
          },
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
          {
            name: 'passwordConfirm',
            label: intl.formatMessage(messages.passwordConfirm),
            component: Input,
            type: 'password',
          },
        ]}
        submitButton={formIsValid => (
          <BoldPrimaryButton type="submit" disabled={loading} primary={formIsValid}>
            {intl.formatMessage(messages.createAccount)}
          </BoldPrimaryButton>
        )}
        onSubmit={handleSubmit}
        loading={loading}
        submitError={error}
      />
    </AuthWrapper>
  )
}

Register.propTypes = {
  history: object,
  intl: object,
  register: func,
  loading: bool,
  error: string,
  success: bool,
}

const mapStateToProps = createStructuredSelector({
  loading: makeSelectRegisterLoading(),
  error: makeSelectRegisterFailure(),
  success: makeSelectRegisterSuccess(),
})

function mapDispatchToProps(dispatch) {
  return {
    register: body => dispatch(registerAction(body)),
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
)(Register)
