import React, { useEffect, useState, memo } from 'react';
import { object, string } from 'prop-types';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Grid, Typography } from '@material-ui/core';
import Truncate from 'react-truncate';

import { useInjectReducer } from 'utils/injectReducer';
import reducer from 'containers/Suppliers/Auth/reducer';
import { makeSelectUserInfo } from 'containers/Suppliers/Auth/selectors';
import Icon from 'components/Common/Icon';
import MainPageCard from 'components/Common/Cards/MainPageCard';
import HomitagLogo from 'assets/images/logo.svg';
import { Link } from 'components/Common/Link';
import { getNewsService } from '../api';
import messages from './messages';

const key = 'auth';

const ItemWrapper = styled(Grid).attrs({
  container: true,
})`
  background: rgba(77, 74, 74, 0.2);
  border: 1px solid rgba(150, 150, 150, 0.2);
  box-sizing: border-box;
  border-radius: 4px;
  height: 111px;
  max-height: 111px;
  margin-right: 15px;
  && {
    flex: 1;
    margin-bottom: 20px;
  }
`;

const TextWrapper = styled.div`
  padding: 10px 15px 10px 15px;
  flex: 1;
`;

const StyledTitle = styled(Typography).attrs({
  component: 'div',
})`
  color: ${({ theme }) => theme.colors.homiWhite};
  padding-bottom: 4px;
  && {
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
  }
`;

const StyledText = styled(Typography).attrs({
  component: 'div',
})`
  color: ${({ theme }) => theme.colors.homiWhite};
  && {
    font-weight: normal;
    font-size: 12px;
    line-height: 15px;
  }
`;

const ImgWrapper = styled.div`
  height: 100%;
  width: 45px;
  margin-left: 15px;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  ::before {
    content: '';
  }
`;

const StyledImage = styled.img`
  height: 45px;
  width: 45px;
  border-radius: 10px;
  &.img-holder {
    height: 35px;
    width: 35px;
  }
`;

const ReadMore = styled.div`
  justify-content: center;
`;

const ArrowIcon = styled(Icon).attrs(props => ({
  color: props.theme.colors.homiPrimary,
  width: 6,
  height: 12,
}))`
  margin-left: 5px;
`;

const renderItem = item => (
  <ItemWrapper key={item.id}>
    <ImgWrapper>
      <StyledImage src={item.picture || HomitagLogo} alt={item.title} className={!item.picture && 'img-holder'} />
    </ImgWrapper>
    <TextWrapper>
      <StyledTitle>{item.title}</StyledTitle>
      <StyledText>
        <Truncate lines={3}>
          {item.text}
        </Truncate>
      </StyledText>
    </TextWrapper>
  </ItemWrapper>
);

const ReadMoreArticles = props => (
  <Link to="/" style={{ textDecoration: 'none' }} primary>
    <ReadMore>
      {props.text}
      <ArrowIcon icon="arrow" />
    </ReadMore>
  </Link>
);

const News = ({ intl, userInfo }) => {
  useInjectReducer({ key, reducer });
  const [loading, setLoading] = useState(false);
  const [news, setNews] = useState([]);
  useEffect(() => {
    setLoading(true);
    getNewsService(userInfo.id)
      .then(res => setNews(res.data.data))
      .finally(() => setLoading(false));
  }, []);
  return (
    <Grid
      item
      md={4}
      style={{
        maxWidth: '98%',
        flexBasis: '99.7%',
      }}
    >
      <MainPageCard
        title={intl.formatMessage(messages.newsFromHomitag)}
        action={<ReadMoreArticles text={intl.formatMessage(messages.readMoreArticles)} />}
        fullHeight
        loading={loading}
      >
        {news.map((n, i) => renderItem(n, i))}
      </MainPageCard>
    </Grid>
  );
};

News.propTypes = {
  intl: object,
  userInfo: object,
};

ReadMoreArticles.propTypes = {
  text: string,
};

const mapStateToProps = createStructuredSelector({
  userInfo: makeSelectUserInfo(),
});

const withConnect = connect(mapStateToProps);

export default compose(
  withConnect,
  injectIntl,
  memo,
)(News);
