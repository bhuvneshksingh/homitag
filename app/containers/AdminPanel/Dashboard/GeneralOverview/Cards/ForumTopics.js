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
import CommentIcon from 'assets/images/icons/comments.svg';
import LikesIcon from 'assets/images/icons/likes.svg';
import ViewsIcon from 'assets/images/icons/views.svg';

import { Link } from 'components/Common/Link';
import { getForumsTopicService } from './api';
import messages from './messages';

const key = 'auth';

const ItemWrapper = styled(Grid).attrs({
  container: true,
})`
  background: rgba(77, 74, 74, 0.2);
  border: 1px solid rgba(150, 150, 150, 0.2);
  box-sizing: border-box;
  border-radius: 4px;
  height: 204px;
  max-height: 204px;
  margin-right: 15px;
  && {
    flex: 1;
    margin-bottom: 20px;
  }
`;

const TextWrapper = styled.div`
  padding: 10px 15px 10px 15px;
  display: flex;
  flex-direction: column;
`;

const FooterWrapper = styled.div`
  display: flex;
  background: #313334;
  border: 1px solid rgba(150, 150, 150, 0.2);
  box-sizing: border-box;
  border-radius: 4px 4px 0px 0px;
  padding: 10px;
  width: 100%;
  margin-top: auto;
`;

const StyledTitle = styled(Typography).attrs({
  component: 'div',
})`
  color: ${({ theme }) => theme.colors.homiWhite};
  padding-bottom: 7px;
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
const IconWrapper = styled.div`
  margin-left: 20px;
  margin-right: 20px;
`;

const StyledImage = styled.img`
  height: 14px;
  width: 14px;
  margin-right: 15px;
  &.img-holder {
    height: 14px;
    width: 14px;
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

const renderItem = (item, intl ) => (
  <ItemWrapper key={item.id}>
    <TextWrapper>
      <StyledTitle>{item.title}</StyledTitle>
      
      <StyledText>
        <Truncate lines={5}>
          {item.text}
        </Truncate>
      </StyledText>
      <StyledText style={{ color: "#969696","margin-top": "8%" }}>{intl.formatMessage(messages.lastUpdate)} {intl.formatDate(item.updatedAt)} {intl.formatTime(item.updatedAt)}</StyledText>
    </TextWrapper>
    <FooterWrapper>
      <IconWrapper>
        <StyledImage src={ViewsIcon} alt="Logo" />
        {item.views}  
      </IconWrapper>
      <IconWrapper>
        <StyledImage src={CommentIcon} alt="Logo" />
        {item.comments}
      </IconWrapper>
      <IconWrapper>
        <StyledImage src={LikesIcon} alt="Logo" />
        {item.likes}
      </IconWrapper>
      <StyledText style={{ "margin-left": "auto" }}>
        {intl.formatMessage(messages.homitagEngaged)} : {item.status === "homitagengaged" ? intl.formatMessage(messages.yes) : intl.formatMessage(messages.no)}
      </StyledText>
    </FooterWrapper>
  </ItemWrapper>
);

const ReadAllTopics = props => (
  <Link to="/" style={{ textDecoration: 'none' }} primary>
    <ReadMore>
      {props.text}
      <ArrowIcon icon="arrow" />
    </ReadMore>
  </Link>
);

const ForumTopics = ({ intl }) => {
  useInjectReducer({ key, reducer });
  const [loading, setLoading] = useState(false);
  const [forumTopics, setForumTopics] = useState([]);
  useEffect(() => {
    setLoading(true);
    getForumsTopicService()
      .then(res => setForumTopics(res.data.data))
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
        title={intl.formatMessage(messages.forumTopics)}
        action={<ReadAllTopics text={intl.formatMessage(messages.readAllTopics)} />}
        fullHeight
        loading={loading}
      >
        {forumTopics.map((n) => renderItem(n, intl))}
      </MainPageCard>
    </Grid>
  );
};

ForumTopics.propTypes = {
  intl: object,
};

ReadAllTopics.propTypes = {
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
)(ForumTopics);
