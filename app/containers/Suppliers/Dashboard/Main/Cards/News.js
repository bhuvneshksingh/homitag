import React, { useEffect, useState, memo } from 'react';
import { object } from 'prop-types';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Grid, Typography } from '@material-ui/core';

import { useInjectReducer } from 'utils/injectReducer';
import reducer from 'containers/Suppliers/Auth/reducer';
import { makeSelectUserInfo } from 'containers/Suppliers/Auth/selectors';
import Icon from 'components/Common/Icon';
import MainPageCard from 'components/Common/Cards/MainPageCard';
import HomitagLogo from 'assets/images/logo.svg';
import { Link } from 'components/Common/Link';
import { getNewsService } from '../api';
import messages from '../messages';

const key = 'auth';

const ItemWrapper = styled(Grid).attrs({
  container: true,
})`
  height: 80px;
  max-height: 80px;
  margin-bottom: 8px;
  && {
    margin-bottom: 20px;
  }
  &.even-item {
    flex-direction: row-reverse;
  }
`

const TextWrapper = styled.div`
  margin: 0 10px;
  flex: 1;
`

const StyledTitle = styled(Typography).attrs({
  component: 'div',
})`
  color: ${({ theme }) => theme.colors.homiWhite};
  && {
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
  }
`

const StyledText = styled(Typography).attrs({
  component: 'div',
})`
  color: ${({ theme }) => theme.colors.homiWhite};
  && {
    font-weight: normal;
    font-size: 12px;
    line-height: 15px;
  }
`

const ImgWrapper = styled.div`
  height: 45px;
  width: 45px;
  background-color: #424242;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  ::before {
    content: '';
  }
`

const StyledImage = styled.img`
  height: 45px;
  width: 45px;
  &.img-holder {
    height: 35px;
    width: 35px;
  }
`

const ReadMore = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  text-align: center;
  height: 60px;
  background-color: ${({ theme }) => theme.colors.homiBlack};
  display: flex;
  align-items: center;
  justify-content: center;
`

const ArrowIcon = styled(Icon).attrs(props => ({
  color: props.theme.colors.homiPrimary,
  width: 6,
  height: 12,
}))`
  margin-left: 5px;
`

const renderItem = (item, index) => {
  const evenItem = (index + 1) % 2 === 0
  return (
    <ItemWrapper key={item.id} className={evenItem && 'even-item'}>
      <ImgWrapper>
        <StyledImage
          src={item.picture || HomitagLogo}
          alt={item.title}
          className={!item.picture && 'img-holder'}
        />
      </ImgWrapper>
      <TextWrapper>
        <StyledTitle>{item.title}</StyledTitle>
        <StyledText>{item.text}</StyledText>
      </TextWrapper>
    </ItemWrapper>
  )
}

const News = ({ intl, userInfo }) => {
  useInjectReducer({ key, reducer })
  const [loading, setLoading] = useState(false)
  const [news, setNews] = useState([])
  useEffect(() => {
    setLoading(true)
    getNewsService(userInfo.id)
      .then(res => setNews(res.data.data))
      .finally(() => setLoading(false))
  }, [])
  return (
    <Grid
      item
      md={4}
      style={{
        maxWidth: '34.7%',
        flexBasis: '34.7%',
      }}
    >
      <MainPageCard
        title={intl.formatMessage(messages.newsFromHomitag)}
        fullHeight
        loading={loading}
      >
        {news.map((n, i) => renderItem(n, i))}
        <Link to="/" primary>
          <ReadMore>
            {intl.formatMessage(messages.readMoreArticles)}{' '}
            <ArrowIcon icon="arrow" />
          </ReadMore>
        </Link>
      </MainPageCard>
    </Grid>
  )
}

News.propTypes = {
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
)(News)
