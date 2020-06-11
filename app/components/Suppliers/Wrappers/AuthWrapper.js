import React from 'react'
import { bool, object, oneOfType, array, string } from 'prop-types'
import styled from 'styled-components'
import { injectIntl } from 'react-intl'

import { Link } from 'components/Common/Link'
import Routes from 'containers/Suppliers/Router/Routes.json'
import Logo from './Logo'
import messages from './messages'
import InnerWrapper from './InnerWrapper'

export const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const Agreement = styled.p`
  && {
    text-align: center;
    color: ${({ theme }) => theme.colors.text};
    margin-top: 80px;
    line-height: 22px;
  }
`

const AuthWrapper = ({ children, intl, showAgreement, baseRoute }) => (
  <Wrapper>
    <InnerWrapper
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Logo />
      <div style={{ width: '100%', height: '100%' }}>{children}</div>
      {showAgreement && (
        <Agreement>
          {intl.formatMessage(messages.agreement)}{' '}
          <Link primary to={baseRoute + Routes.Terms}>
            {intl.formatMessage(messages.terms)}
          </Link>{' '}
          {intl.formatMessage(messages.and)}{' '}
          <Link primary to={baseRoute + Routes.Policy}>
            {intl.formatMessage(messages.policy)}
          </Link>
        </Agreement>
      )}
    </InnerWrapper>
  </Wrapper>
)

AuthWrapper.propTypes = {
  children: oneOfType([object, array]),
  intl: object,
  showAgreement: bool,
  baseRoute: string,

}

AuthWrapper.defaultProps = {
  showAgreement: true,
  baseRoute: Routes.Suppliers,
}

export default injectIntl(AuthWrapper)
