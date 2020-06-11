import React, { useState } from 'react'
import { object } from 'prop-types'
import { injectIntl } from 'react-intl'
import styled from 'styled-components'
import * as Yup from 'yup'
import { Typography } from '@material-ui/core'

import Input from 'components/Common/Form/Input'
import AuthWrapper from 'components/Suppliers/Wrappers/AuthWrapper'
import FormButton from 'components/Common/Form/FormButton'
import Form from 'components/Suppliers/Forms/OnboardingForm'
import messages from './messages'
import { forgotPasswordService } from './api'

const Description = styled(Typography).attrs({
  component: 'p',
})`
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  color: ${({ theme }) => theme.colors.homiBlack};
  && {
    margin: 50px 0;
  }
`
const BoldFormButton = styled(FormButton)`
  && {
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
  }
`


const Register = ({ intl }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const handleSubmit = values => {
    setLoading(true)
    setError('')
    const { email } = values
    forgotPasswordService({ params: { email } })
      .then(() => {
        setSuccess(intl.formatMessage(messages.checkEmail))
      })
      .catch(e => {
        setError(e.response.data.result.content.message)
        setLoading(false)
      })
  }
  return (
    <AuthWrapper showAgreement={false}>
      <Description>{intl.formatMessage(messages.description)}</Description>
      <Form
        formValues={{
          email: '',
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .required(intl.formatMessage(messages.emailRequired))
            .email(intl.formatMessage(messages.invalidEmail)),
        })}
        inputs={[
          {
            name: 'email',
            label: intl.formatMessage(messages.email),
            component: Input,
            type: 'text',
          },
        ]}
        submitButton={formIsValid => (
          <BoldFormButton type="submit" disabled={loading} primary={formIsValid}>
            {intl.formatMessage(messages.sendLink)}
          </BoldFormButton>
        )}
        onSubmit={handleSubmit}
        loading={loading}
        submitError={error}
        submitSuccess={success}
      />
    </AuthWrapper>
  )
}

Register.propTypes = {
  intl: object,
}

export default injectIntl(Register)
