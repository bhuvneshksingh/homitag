import React, { useState, memo } from 'react'
import PropTypes from 'prop-types'
import { injectIntl } from 'react-intl'
import * as Yup from 'yup'
import { Typography } from '@material-ui/core'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'
import idx from 'idx'

import { useInjectReducer } from 'utils/injectReducer'
import reducer from 'containers/Suppliers/Auth/reducer'
import {
  makeSelectUserInfo,
  makeSelectToken,
} from 'containers/Suppliers/Auth/selectors'
import AccountPagesWrapper from 'components/Suppliers/Wrappers/AccountPagesWrapper'
import Form from 'components/Suppliers/Forms/OnboardingForm'
import FormButton from 'components/Common/Form/FormButton'
import Switch from 'components/Common/Form/Switch'
import { Link } from 'components/Common/Link'
import Routes from 'containers/Suppliers/Router/Routes.json'
import { authCheckAction } from 'containers/Suppliers/Auth/action'
import messages from './messages'
import { sellerAgreementService } from './api'

const Paragraph = styled(Typography).attrs({
  component: 'p',
})`
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  color: ${({ theme }) => theme.colors.text};
  && {
    margin: 10px 0;
  }
`

const key = 'auth'

const SellerAgreement = ({ intl, history, userInfo, authCheck, token }) => {
  useInjectReducer({ key, reducer })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const submitForm = values => {
    setLoading(true)
    sellerAgreementService(userInfo.UserBusiness.id, values)
      .then(() => {
        authCheck({ token, userId: userInfo.id })
        history.push(`${Routes.Suppliers}?onboardingCompleted`)
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }
  const AgreementLabel = () => (
    <>
      {intl.formatMessage(messages.read)}{' '}
      <Link to="/terms">{intl.formatMessage(messages.agreement)}</Link>
    </>
  )
  return (
    <AccountPagesWrapper
      currentPageTitle={intl.formatMessage(messages.sellerAgreement)}
      lastPageTitle={intl.formatMessage(messages.shippingAndReturns)}
      description={intl.formatMessage(messages.description)}
    >
      <Paragraph>{intl.formatMessage(messages.firstParagraph)}</Paragraph>
      <Paragraph>{intl.formatMessage(messages.secondParagraph)}</Paragraph>
      <Paragraph>{intl.formatMessage(messages.thirdParagraph)}</Paragraph>
      <Paragraph>{intl.formatMessage(messages.fourthParagraph)}</Paragraph>
      <Form
        formValues={{
          acceptSellerAgreement:
            idx(userInfo, _ => _.UserBusiness.acceptSellerAgreement) || false,
        }}
        validationSchema={Yup.object().shape({
          acceptSellerAgreement: Yup.bool().oneOf(
            [true],
            intl.formatMessage(messages.agreementRequired)
          ),
        })}
        inputs={[
          {
            name: 'acceptSellerAgreement',
            component: Switch,
            label: <AgreementLabel />,
            type: 'checkbox',
          },
        ]}
        submitButton={formIsValid => (
          <FormButton type="submit" disabled={loading} primary={formIsValid}>
            {intl.formatMessage(messages.completeOnboarding)}
          </FormButton>
        )}
        onSubmit={submitForm}
        loading={loading}
        submitError={error}
      />
    </AccountPagesWrapper>
  )
}

SellerAgreement.propTypes = {
  intl: PropTypes.object,
  userInfo: PropTypes.object,
  history: PropTypes.object,
  authCheck: PropTypes.func,
  token: PropTypes.string,
}

const mapStateToProps = createStructuredSelector({
  userInfo: makeSelectUserInfo(),
  token: makeSelectToken(),
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
)(SellerAgreement)
