import React from 'react'
import styled from 'styled-components'

import LogoFile from 'assets/images/logo.svg'

const StyledLogo = styled.img`
  margin: 20px 0;
`

export default () => <StyledLogo src={LogoFile} />
