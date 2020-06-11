import React, { useEffect, useState, memo } from 'react'
import { object, func } from 'prop-types'
import { injectIntl } from 'react-intl'
import { Elements } from 'react-stripe-elements'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'

import { useInjectReducer } from 'utils/injectReducer'
import reducer from 'containers/Suppliers/Auth/reducer'
import Loading from 'components/Common/Loading'
import { makeSelectUserInfo } from 'containers/Suppliers/Auth/selectors'
import { getUserService } from 'containers/Suppliers/Auth/api'
import AccountPagesWrapper from 'components/Suppliers/Wrappers/AccountPagesWrapper'
import { updateUserInfoAction } from 'containers/Suppliers/Auth/action'
import { getUserStripeAccountsService } from './api'
import Form from './Form'
import messages from './messages'

const key = 'auth'

const BankingInfo = ({ intl, userInfo, updateUserInfo }) => {
  useInjectReducer({ key, reducer })
  const [userInfoLoading, setUserInfoLoading] = useState(false)
  const [accountInfo, setAccountInfo] = useState({})
  useEffect(() => {
    setUserInfoLoading(true)
    getUserService(userInfo.id).then(res => updateUserInfo(res.data))
    getUserStripeAccountsService(userInfo.id)
      .then(res => setAccountInfo(res.data))
      .finally(() => setUserInfoLoading(false))
  }, [])
  if (userInfoLoading)
    return <Loading show={userInfoLoading} pageLoading transparent size={60} />
  return (
    <AccountPagesWrapper
      currentPageTitle={intl.formatMessage(messages.bankingInfo)}
      lastPageTitle={intl.formatMessage(messages.yourBusiness)}
    >
      <Elements>
        <Form accountInfo={accountInfo} />
      </Elements>
    </AccountPagesWrapper>
  )
}

BankingInfo.propTypes = {
  intl: object,
  userInfo: object,
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
)(BankingInfo)
