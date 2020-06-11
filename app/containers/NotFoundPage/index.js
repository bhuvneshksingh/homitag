import React from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import messages from './messages'

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: absolute;
`

const Text404 = styled.h1`
  font-size: 80px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.homiPrimary};
`

const Subtitle = styled.h6`
  margin-top: 16px;
  color: ${({ theme }) => theme.colors.text};
`

export default function NotFound() {
  return (
    <Wrapper>
      <Text404>404</Text404>
      <Subtitle>
        <FormattedMessage {...messages.subtitle} />
      </Subtitle>
    </Wrapper>
  )
}
