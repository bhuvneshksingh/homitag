import React, { useEffect, memo, useState } from 'react'
import { object, func } from 'prop-types'
import { injectIntl } from 'react-intl'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { compose } from 'redux'
import * as Yup from 'yup'
import { createStructuredSelector } from 'reselect'
import { Typography } from '@material-ui/core'

import { useInjectReducer } from 'utils/injectReducer'
import { useInjectSaga } from 'utils/injectSaga'
import Input from 'components/Common/Form/Input'
import AuthWrapper from 'components/Suppliers/Wrappers/AuthWrapper'
import { OutlinePrimaryButton } from 'components/Common/Button'
import FormButton from 'components/Common/Form/FormButton'
import saga from 'containers/Suppliers/Auth/saga'
import { yupEqualTo } from 'utils/helpers'
import reducer from 'containers/Suppliers/Auth/reducer'
import { makeSelectUserInfo } from 'containers/Suppliers/Auth/selectors'
import Form from 'components/Suppliers/Forms/OnboardingForm'
import Routes from 'containers/Suppliers/Router/Routes.json'
import { authCheckAction } from 'containers/Suppliers/Auth/action'
import messages from './messages'
import { sendCodeService, verificationService } from './api'
import MobileForm from './MobileForm'

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

const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const InputsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Label = styled(Typography)`
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  && {
    margin: 30px 0;
  }
`

const BoldOutlineButton = styled(OutlinePrimaryButton)`
  && {
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
  }
`

const BoldFormButton = styled(FormButton)`
  && {
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
  }
`

Yup.addMethod(Yup.string, 'equalTo', yupEqualTo)
const key = 'auth'

const Register = ({ intl, userInfo, history, authCheck }) => {
  useInjectReducer({ key, reducer })
  useInjectSaga({ key, saga })
  const [loading, setLoading] = useState(false)
  const [sendCodeLoading, setSendCodeLoading] = useState(false)
  const [error, setError] = useState('')
  const [mobileForm, setMobileForm] = useState(false)
  const [description, setDescription] = useState('')
  const sendCode = () => {
    setSendCodeLoading(true)
    sendCodeService(userInfo.id, 'email', { email: userInfo.email })
      .then(() =>
        setDescription(
          intl.formatMessage(messages.description, { email: userInfo.email })
        )
      )
      .catch(e => setError(e.response.data.result.content.message))
      .finally(() => setSendCodeLoading(false))
  }
  useEffect(() => {
    sendCode()
  }, [])
  const handleSubmit = values => {
    setLoading(true)
    const { no1, no2, no3, no4, no5 } = values
    const token = no1 + no2 + no3 + no4 + no5
    verificationService(userInfo.id, 'email', { token })
      .then(() => {
        authCheck({ token, userId: userInfo.id })
        history.push(Routes.Suppliers + Routes.Onboarding + Routes.AboutYou)
      })
      .catch(e => setError(e.response.data.result.content.message))
      .finally(() => setLoading(false))
  }
  const showMobileForm = () => {
    setDescription(intl.formatMessage(messages.mobileFormOpen))
    setMobileForm(true)
  }
  const hideMobileForm = msg => {
    setDescription(msg || '')
    setMobileForm(false)
  }
  const resendCode = () => {
    hideMobileForm()
    sendCode()
  }
  return (
    <AuthWrapper>
      {description && <Description>{description}</Description>}
      <ButtonsWrapper>
        <BoldOutlineButton
          style={{ marginRight: '12px' }}
          onClick={resendCode}
          disabled={sendCodeLoading}
        >
          {intl.formatMessage(messages.cantFindCode)}
        </BoldOutlineButton>
        <BoldOutlineButton
          style={{ marginLeft: '12px' }}
          onClick={showMobileForm}
        >
          {intl.formatMessage(messages.sendToPhone)}
        </BoldOutlineButton>
      </ButtonsWrapper>
      {mobileForm ? (
        <MobileForm userId={userInfo.id} hideMobileForm={hideMobileForm} />
      ) : (
        <>
          <Label>{intl.formatMessage(messages.enterCode)}</Label>
          <Form
            wrapper={children => <InputsWrapper>{children}</InputsWrapper>}
            formValues={{
              no1: '',
              no2: '',
              no3: '',
              no4: '',
              no5: '',
            }}
            validationSchema={Yup.object().shape({
              no1: Yup.number().required(),
              no2: Yup.number().required(),
              no3: Yup.number().required(),
              no4: Yup.number().required(),
              no5: Yup.number().required(),
            })}
            inputs={[
              {
                name: 'no1',
                component: Input,
                type: 'text',
                style: { marginRight: '10px' },
                textAlign: 'center',
                maxLength: 1,
                showError: false,
                goToNextInput: true,
              },
              {
                name: 'no2',
                component: Input,
                type: 'text',
                style: { marginRight: '10px' },
                textAlign: 'center',
                maxLength: 1,
                showError: false,
                goToNextInput: true,
              },
              {
                name: 'no3',
                component: Input,
                type: 'text',
                style: { marginRight: '10px' },
                textAlign: 'center',
                maxLength: 1,
                showError: false,
                goToNextInput: true,
              },
              {
                name: 'no4',
                component: Input,
                type: 'text',
                style: { marginRight: '10px' },
                textAlign: 'center',
                maxLength: 1,
                showError: false,
                goToNextInput: true,
              },
              {
                name: 'no5',
                component: Input,
                type: 'text',
                textAlign: 'center',
                maxLength: 1,
                showError: false,
              },
            ]}
            submitButton={formIsValid => (
              <BoldFormButton
                type="submit"
                disabled={loading}
                primary={formIsValid}
              >
                {intl.formatMessage(messages.verify)}
              </BoldFormButton>
            )}
            onSubmit={handleSubmit}
            loading={loading}
            submitError={error}
          />
        </>
      )}
    </AuthWrapper>
  )
}

Register.propTypes = {
  intl: object,
  userInfo: object,
  history: object,
  authCheck: func,
}

const mapStateToProps = createStructuredSelector({
  userInfo: makeSelectUserInfo(),
})

function mapDispatchToProps(dispatch) {
  return {
    authCheck: payload => dispatch(authCheckAction(payload)),
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
