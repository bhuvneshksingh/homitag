import React from 'react'
import { array, string, bool, object, oneOfType } from 'prop-types'
import styled from 'styled-components'
import { Typography } from '@material-ui/core'
import { injectIntl } from 'react-intl'

import Loading from 'components/Common/Loading';
import messages from 'components/Common/Cards/MainPageCard/messages';

const StyledCard = styled.div`
  background: ${({ theme }) => theme.colors.homiBlack};
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.homiWhite};
  ${({ fullHeight }) => fullHeight && `height: 100%;`}
  position: relative;
  overflow: hidden;
  min-height: 200px;
`

const StyledTitle = styled(Typography).attrs({
  component: 'div',
})`
  color: ${({ theme }) => theme.colors.homiWhite};
  padding: 20px;
  border-bottom: 1px solid #4d4a4a;
  height: 60px;
  box-sizing: border-box;
  && {
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
  }
  position: relative;
`

const StyledBody = styled.div`
  color: ${({ theme }) => theme.colors.homiWhite};
  padding: 20px;
  height: calc(100% - 60px);
  flex-flow: row wrap;
  display: flex;
`;

const StyledAction = styled.div`
  color: ${({ theme }) => theme.colors.homiWhite};
  float: right;
`;

const NoItem = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  z-index: 1;
`

const MainPageCard = ({ children, action, title, loading, fullHeight, bodyStyle, noItem, intl, ...props }) => (
  <StyledCard fullHeight={fullHeight} {...props}>
    <StyledTitle>
      {title}
      <StyledAction>{action}</StyledAction>
    </StyledTitle>
    {loading ? <Loading show size={60} transparent /> : <StyledBody style={bodyStyle}>{children}</StyledBody>}
    {noItem && <NoItem>{intl.formatMessage(messages.noItem)}</NoItem>}
  </StyledCard>
)

MainPageCard.propTypes = {
  children: oneOfType([array, object]),
  action: object,
  title: string,
  fullHeight: bool,
  loading: bool,
  bodyStyle: object,
  noItem: bool,
  intl: object,
}

export default injectIntl(MainPageCard)
