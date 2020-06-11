/* eslint-disable no-unused-vars */
import React, { useEffect, useState, memo } from 'react';
import { object, func, bool, string } from 'prop-types';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Grid, Typography } from '@material-ui/core';
import Moment from 'moment/moment';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from 'containers/Suppliers/Auth/reducer';
import { makeSelectUserInfo } from 'containers/Suppliers/Auth/selectors';
import LineChart from 'components/AdminPanel/Dashboard/Cards/LineChart';

import expandIcon from 'assets/images/icons/expand.svg';
import downloadIcon from 'assets/images/icons/download.svg';

import messages from './messages';

const key = 'auth';

const ItemWrapper = styled(Grid).attrs({
  item: true,
  direction: "row",
  spacing:2,
  xs: true,
})`
  background: rgba(77, 74, 74, 0.2);
  border: 1px solid rgba(150, 150, 150, 0.2);
  box-sizing: border-box;
  border-radius: 4px;
  height: 204px;
  max-height: 240px;
  flex-direction: column;
  overflow: hidden;
  &&&{
    margin-right: 15px;
  }
  && {
    flex: 1;
    margin-bottom: 20px;
  }
`;

const CanvasWrapper = styled.div`

`;

const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
`;

const FooterWrapper = styled.div`
  display: flex;
  background: #313334;
  border: 1px solid rgba(150, 150, 150, 0.2);
  box-sizing: border-box;
  border-radius: 4px 4px 0px 0px;
  height: 40px;
  padding: 10px;
  width: 100%;
  margin-top: auto;
`;

const StyledTitle = styled(Typography).attrs({
  component: 'div',
})`
  color: ${({ theme }) => theme.colors.homiWhite};
  padding-bottom: 7px;
  text-align: center;
  && {
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    margin: auto;
  }
`;

const StyledTotal = styled(Typography).attrs({
  component: 'div',
})`
  color: ${({ theme }) => theme.colors.homiWhite};
  && {
    font-weight: normal;
    font-size: 14px;
    line-height: 14px;
    margin: auto;
    margin-bottom: 20px;
  }
`;

const QuickGlanceAnalyticsItem = ({ intl, title, getDataService, visible }) => {
  useInjectReducer({ key, reducer });
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [dateIntervals, setDateIntervals] = useState([
    Moment().subtract(7, 'days'),
    Moment()
  ]);

  useEffect(() => {
    setLoading(true);
    getDataService(dateIntervals[0],dateIntervals[1])
      .then(res => setData(res))
      .finally(() => setLoading(false));
  }, [dateIntervals]);
  return (
    <ItemWrapper style={visible ? { display: 'flex',width: "100%",  height: '100%'} :  { display: 'none' } }>
      <HeaderWrapper>
        <img src={expandIcon} alt="Expand" />
        <StyledTitle>{title}</StyledTitle>
        <img src={downloadIcon} alt="Download CSV" />
      </HeaderWrapper>
      <StyledTotal>
        {intl.formatMessage(messages.total)} : {data.total}
      </StyledTotal>
      <CanvasWrapper style={visible ? { width: "100%", height: '100%'} : {}}>
        <LineChart style={visible ? { width: "100%", height: '100%'} : {}} dataPoints={data.dataPoints} labels={data.labels}></LineChart>       
      </CanvasWrapper>
    </ItemWrapper>      
  );
};

// <LineChart dataPoints={data.dataPoints} labels={data.labels}></LineChart>
QuickGlanceAnalyticsItem.propTypes = {
  intl: object,
  getDataService: func,
  visible: bool,
  title: string
};

const mapStateToProps = createStructuredSelector({
  userInfo: makeSelectUserInfo(),
});

const withConnect = connect(mapStateToProps);

export default compose(
  withConnect,
  injectIntl,
  memo,
)(QuickGlanceAnalyticsItem);
