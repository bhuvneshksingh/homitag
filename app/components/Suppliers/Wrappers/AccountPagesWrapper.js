import React from 'react'
import PropTypes from 'prop-types'
import { Container } from '@material-ui/core'
import styled from 'styled-components'
import { injectIntl } from 'react-intl'

import LogoImg from 'assets/images/logo.svg'
import Icon from 'components/Common/Icon'
import history from 'utils/history'
import messages from './messages'
import { Wrapper } from './AuthWrapper'
import InnerWrapper from './InnerWrapper'

const Logo = styled.img`
  margin: 30px 0;
  width: 130px;
`

const TopBar = styled.div`
  display: flex;
  margin-bottom: 30px;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
`

const Side = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`

const Center = styled.div``

const Description = styled.div`
  margin-bottom: 30px;
  font-size: 16px;
  line-height: 22px;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
`

const BackArrow = styled.div`
  margin-right: 10px;
  transform: rotateY(180deg);
`

const StyledIcon = styled(Icon).attrs(props => ({
  color: props.theme.colors.homiPrimary,
  width: 10,
  height: 15,
}))``

const AccountPagesWrapper = ({
  intl,
  children,
  lastPageTitle,
  currentPageTitle,
  description,
}) => (
  <Container>
    <Logo src={LogoImg} alt="Logo" />
    <TopBar>
      {lastPageTitle ? (
        <Side onClick={() => history.goBack()} style={{ cursor: 'pointer' }}>
          <BackArrow>
            <StyledIcon icon="arrow" />
          </BackArrow>
          {lastPageTitle}
        </Side>
      ) : (
        <Side />
      )}
      <Center>{currentPageTitle}</Center>
      <Side />
    </TopBar>
    <Wrapper style={{ minHeight: 'unset' }}>
      <InnerWrapper style={{ width: '600px' }}>
        <Description>
          {description || intl.formatMessage(messages.description)}
        </Description>
        {children}
      </InnerWrapper>
    </Wrapper>
  </Container>
)

AccountPagesWrapper.propTypes = {
  intl: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  lastPageTitle: PropTypes.string,
  currentPageTitle: PropTypes.string,
  description: PropTypes.string,
}

export default injectIntl(AccountPagesWrapper)
