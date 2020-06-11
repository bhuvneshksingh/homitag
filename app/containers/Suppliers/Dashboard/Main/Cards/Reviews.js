import React, { memo } from 'react'
import { object } from 'prop-types'
import styled from 'styled-components'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'
import { Grid, Typography } from '@material-ui/core'

import { useInjectReducer } from 'utils/injectReducer';
import reducer from 'containers/Suppliers/Auth/reducer';
import { makeSelectUserInfo } from 'containers/Suppliers/Auth/selectors';
import { PrimaryButton } from 'components/Common/Button';
import MainPageCard from 'components/Common/Cards/MainPageCard'
import Stars from 'components/Common/Stars';
import messages from '../messages';

const key = 'auth'

const Wrapper = styled.div`
  text-align: center;
`

const ItemTitle = styled(Typography).attrs({
  component: 'div',
})`
  && {
    margin: 15px 0;
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
  }
  span {
    color: ${({ theme }) => theme.colors.homiPrimary};
  }
`

const Reviews = ({ intl, userInfo }) => {
  useInjectReducer({ key, reducer })
  return (
    <Grid item md={6}>
      <MainPageCard
        title={intl.formatMessage(messages.overallReviews)}
        fullHeight
      >
        <Wrapper>
          <Stars initialCount={userInfo.rating} />
          <ItemTitle>
            {userInfo.reviews} {intl.formatMessage(messages.reviews)}
          </ItemTitle>
          <PrimaryButton>
            {intl.formatMessage(messages.seeAllReviews)}
          </PrimaryButton>
        </Wrapper>
      </MainPageCard>
    </Grid>
  )
}

Reviews.propTypes = {
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
)(Reviews)
