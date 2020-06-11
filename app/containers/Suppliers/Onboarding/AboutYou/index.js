import React, { memo, useState } from 'react'
import { func, object } from 'prop-types'
import styled from 'styled-components'
import { injectIntl } from 'react-intl'
import * as Yup from 'yup'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'

import { useInjectReducer } from 'utils/injectReducer'
import reducer from 'containers/Suppliers/Auth/reducer'
import { makeSelectUserInfo } from 'containers/Suppliers/Auth/selectors'
import AccountPagesWrapper from 'components/Suppliers/Wrappers/AccountPagesWrapper'
import Form from 'components/Suppliers/Forms/OnboardingForm'
import FormButton from 'components/Common/Form/FormButton'
import Input from 'components/Common/Form/Input'
import Routes from 'containers/Suppliers/Router/Routes.json'
import { clearObject, phoneNumberValidation } from 'utils/helpers'
import { updateUserInfoAction } from 'containers/Suppliers/Auth/action'
import messages from './messages'
import { aboutYouService } from './api'

const key = 'auth'

const PhoneNumberStartAdornment = styled.div`
  padding-right: 10px;
`

const AboutYou = ({ intl, userInfo, history, updateUserInfo }) => {
  useInjectReducer({ key, reducer })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const submitForm = values => {
    setLoading(true)
    const {
      firstName,
      lastName,
      phonenumber,
      phoneextension,
      reference,
    } = values
    const data = {
      firstName,
      lastName,
      phonenumber: `+1${phonenumber.replace(/[^\d]/g, '')}`,
      phoneextension,
      reference,
    }
    aboutYouService(userInfo.id, clearObject(data))
      .then(() => {
        updateUserInfo(data)
        history.push(Routes.Suppliers + Routes.Onboarding + Routes.YourBusiness)
      })
      .catch(e => setError(e.response.data.result.content.message))
      .finally(() => setLoading(false))
  }
  return (
    <AccountPagesWrapper
      currentPageTitle={intl.formatMessage(messages.aboutYou)}
    >
      <Form
        formValues={{
          firstName: userInfo.firstName || '',
          lastName: userInfo.lastName || '',
          email: userInfo.email,
          phonenumber: userInfo.phonenumber
            ? userInfo.phonenumber.slice(-10)
            : '',
          phoneextension: userInfo.phoneextension || '',
          reference: userInfo.reference || '',
        }}
        validationSchema={Yup.object().shape({
          firstName: Yup.string().required(
            intl.formatMessage(messages.firstNameRequired)
          ),
          lastName: Yup.string().required(
            intl.formatMessage(messages.lastNameRequired)
          ),
          email: Yup.string().required(
            intl.formatMessage(messages.emailAddressRequired)
          ),
          phonenumber: phoneNumberValidation(
            intl.formatMessage(messages.phoneNumberInvalid),
            intl.formatMessage(messages.phoneNumberRequired)
          ),
        })}
        inputs={[
          {
            name: 'firstName',
            label: intl.formatMessage(messages.firstName),
            component: Input,
          },
          {
            name: 'lastName',
            label: intl.formatMessage(messages.lastName),
            component: Input,
          },
          {
            name: 'email',
            label: intl.formatMessage(messages.emailAddress),
            component: Input,
            readOnly: true,
          },
          {
            name: 'phonenumber',
            label: intl.formatMessage(messages.phoneNumber),
            component: Input,
            fullWidth: false,
            startAdornment: (
              <PhoneNumberStartAdornment>+1</PhoneNumberStartAdornment>
            ),
            mask: '(999) 999-9999',
          },
          {
            name: 'phoneextension',
            label: intl.formatMessage(messages.ext),
            component: Input,
            fullWidth: false,
          },
          {
            name: 'reference',
            label: intl.formatMessage(messages.hear),
            component: Input,
          },
        ]}
        submitButton={formIsValid => (
          <FormButton
            type="submit"
            disabled={loading}
            primary={formIsValid}
            subtitle={intl.formatMessage(messages.aboutYourBuss)}
          >
            {intl.formatMessage(messages.next)}
          </FormButton>
        )}
        onSubmit={submitForm}
        loading={loading}
        submitError={error}
      />
    </AccountPagesWrapper>
  )
}

AboutYou.propTypes = {
  intl: object,
  userInfo: object,
  history: object,
  updateUserInfo: func,
}

const mapStateToProps = createStructuredSelector({
  userInfo: makeSelectUserInfo(),
})

function mapDispatchToProps(dispatch) {
  return {
    updateUserInfo: payload => dispatch(updateUserInfoAction(payload)),
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
)(AboutYou)
