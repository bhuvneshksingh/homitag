import React from 'react'
import styled from 'styled-components'
import { object, oneOfType, array, string }  from 'prop-types'
import { DialogContent } from '@material-ui/core'

import Icon from 'components/Common/Icon'

const StyledIcon = styled(Icon).attrs(props => ({
  color: props.theme.colors.homiPrimary,
}))``

const StyledDialogContent = styled(DialogContent)`
  text-align: center;
`

const ModalTitle = styled.h1`
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.homiBlack};
  margin: 30px 0;
`

const Description = styled.p`
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 40px;
`

export const ModalContent = ({ children, icon, title, desc }) => (<StyledDialogContent>
  <StyledIcon icon={icon} />
  <ModalTitle>{title}</ModalTitle>
  <Description>{desc}</Description>
  {children}
</StyledDialogContent>)

ModalContent.propTypes = {
  children: oneOfType([array, object]),
  icon: string,
  title: string,
  desc: string
}
