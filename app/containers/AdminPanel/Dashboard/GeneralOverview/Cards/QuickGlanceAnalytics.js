import React, { useEffect, useState, memo } from 'react';
import { object } from 'prop-types';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Grid } from '@material-ui/core';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from 'containers/Suppliers/Auth/reducer';
import { makeSelectUserInfo } from 'containers/Suppliers/Auth/selectors';
import MainPageCard from 'components/Common/Cards/MainPageCard';

import { getClaimFiled, getDailyActiveUsers, getItemsReported, getNewListingsAdded, getNewOrdersPlaced, getReturnsRequested } from './api';
import messages from './messages';
import QuickGlanceAnalyticsItem from './QuickGlanceAnalyticsItem';

const key = 'auth';

const Root = styled.div`
  flex-grow: 1;
`;

const QuickGlanceAnalytics = ({ intl }) => {
  useInjectReducer({ key, reducer });
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [expanded, setExpanded] = useState(0);

  useEffect(() => {
    setLoading(true);
    setLoading(false)
  }, []);
  return (
    <Grid
      item
      style={{
        maxWidth: '98%',
        flexBasis: '99.7%'
      }}
    >
      <MainPageCard
        title={intl.formatMessage(messages.quickGlanceAnalytics)}
        fullHeight
        loading={loading}
      >
        <Root style={expanded !== 0 ? { width: "100%", height: "60vh"} : {}}>
          <Grid
            container
            spacing={3}
            direction="row"
            
          >
            <QuickGlanceAnalyticsItem title={intl.formatMessage(messages.dailyActiveUsers)} style={expanded !== 0 ? { width: "100%", height: "100%"} : {}} visible={expanded === 0 || expanded === 1} getDataService={getDailyActiveUsers} />
            <QuickGlanceAnalyticsItem title={intl.formatMessage(messages.newListingsAdded)} style={expanded !== 0 ? { width: "100%", height: "100%"} : {}} visible={expanded === 0 || expanded === 2} getDataService={getNewListingsAdded} />
            <QuickGlanceAnalyticsItem title={intl.formatMessage(messages.newOrdersPlaced)} style={expanded !== 0 ? { width: "100%", height: "100%"} : {}} visible={expanded === 0 || expanded === 3} getDataService={getNewOrdersPlaced} />

          </Grid>

          <Grid
            container
            spacing={3}
            
            direction="row"
          >
            <QuickGlanceAnalyticsItem title={intl.formatMessage(messages.returnsRequested)} style={expanded !== 0 ? { width: "100%", height: "100%"} : {}} visible={expanded === 0 || expanded === 4} getDataService={getReturnsRequested} />
            <QuickGlanceAnalyticsItem title={intl.formatMessage(messages.claimsFiled)} style={expanded !== 0 ? { width: "100%", height: "100%"} : {}} visible={expanded === 0 || expanded === 5} getDataService={getClaimFiled} />
            <QuickGlanceAnalyticsItem title={intl.formatMessage(messages.itemsReported)} style={expanded !== 0 ? { width: "100%", height: "100%"} : {}} visible={expanded === 0 || expanded === 6} getDataService={getItemsReported} />

          </Grid>
        </Root>
      </MainPageCard>
    </Grid>
  );
};
QuickGlanceAnalytics.propTypes = {
  intl: object,
};

const mapStateToProps = createStructuredSelector({
  userInfo: makeSelectUserInfo(),
});

const withConnect = connect(mapStateToProps);

export default compose(
  withConnect,
  injectIntl,
  memo,
)(QuickGlanceAnalytics);
