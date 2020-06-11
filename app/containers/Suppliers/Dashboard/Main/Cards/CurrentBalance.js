import React, { useEffect, useState, memo } from 'react'
import { object } from 'prop-types'
import styled from 'styled-components'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'
import { Grid, Typography } from '@material-ui/core'
import idx from 'idx'

import { useInjectReducer } from 'utils/injectReducer';
import reducer from 'containers/Suppliers/Auth/reducer';
import { makeSelectUserInfo } from 'containers/Suppliers/Auth/selectors';
import MainPageCard from 'components/Common/Cards/MainPageCard';
import { getBalanceService } from '../api';
import messages from '../messages';

const key = 'auth'

const BalanceText = styled(Typography).attrs({
  component: 'div',
})`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  && {
    font-weight: 600;
    font-size: 28px;
    line-height: 34px;
  }
`

const CurrentBalance = ({ intl, userInfo }) => {
  useInjectReducer({ key, reducer })
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({})
  useEffect(() => {
    setLoading(true)
    getBalanceService(userInfo.id)
      .then(res => setData(res.data.data))
      .finally(() => setLoading(false))
  }, [])
  const amount = idx(data, _ => _.available[0].amount) || 0
  const currency = idx(data, _ => _.available[0].currency) || 'usd'
  return (
    <Grid item md={6}>
      <MainPageCard
        title={intl.formatMessage(messages.currentBalance)}
        fullHeight
        loading={loading}
      >
        <BalanceText>
          {amount.toLocaleString(undefined, { style: 'currency', currency })}
        </BalanceText>
      </MainPageCard>
    </Grid>
  )
}

CurrentBalance.propTypes = {
  intl: object,
  userInfo: object,
}

const mapStateToProps = createStructuredSelector({
  userInfo: makeSelectUserInfo(),
})

const withConnect = connect(mapStateToProps)

export default compose(
  withConnect,
  injectIntl,
  memo
)(CurrentBalance)
