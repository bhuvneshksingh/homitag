import React, { useEffect, useState, memo } from 'react'
import { object } from 'prop-types'
import styled from 'styled-components'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'
import { Grid, Typography } from '@material-ui/core'

import Icon from 'components/Common/Icon';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from 'containers/Suppliers/Auth/reducer';
import { makeSelectUserInfo } from 'containers/Suppliers/Auth/selectors';
import MainPageCard from 'components/Common/Cards/MainPageCard';
import { getActivityTickerService } from '../api';
import messages from '../messages';

const key = 'auth'

const StyledIcon = styled(Icon).attrs(props => ({
  color: props.theme.colors.homiPrimary,
}))`
  margin-bottom: 20px;
`

const ItemTitle = styled(Typography).attrs({
  component: 'div',
})`
  && {
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
  }
  span {
    color: ${({ theme }) => theme.colors.homiPrimary};
  }
`

const renderItem = (icon, title, count) => (
  <Grid item>
    <Grid container direction="column" alignItems="center">
      <StyledIcon icon={icon} />
      <ItemTitle>
        {title}
        <span> ({count})</span>
      </ItemTitle>
    </Grid>
  </Grid>
)

const ActivityTicker = ({ intl, userInfo }) => {
  useInjectReducer({ key, reducer })
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({
    orders: 0,
    claim: 0,
    cancel: 0,
    return: 0,
    message: 0,
  })
  useEffect(() => {
    setLoading(true)
    getActivityTickerService(userInfo.id)
      .then(res => setData(res.data))
      .finally(() => setLoading(false))
  }, [])
  return (
    <Grid item md={12}>
      <MainPageCard
        title={intl.formatMessage(messages.newActivityTicker)}
        loading={loading}
      >
        <Grid container spacing={3} justify="space-between" alignItems="center">
          {renderItem(
            'ordersPurple',
            intl.formatMessage(messages.orders),
            data.orders
          )}
          {renderItem(
            'returnsPurple',
            intl.formatMessage(messages.returns),
            data.return
          )}
          {renderItem(
            'cancellationsPurple',
            intl.formatMessage(messages.cancellations),
            data.cancel
          )}
          {/* {renderItem('messagesPurple', intl.formatMessage(messages.messages), data.message)} */}
          {renderItem(
            'claimsPurple',
            intl.formatMessage(messages.claims),
            data.claim
          )}
        </Grid>
      </MainPageCard>
    </Grid>
  )
}

ActivityTicker.propTypes = {
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
)(ActivityTicker)
