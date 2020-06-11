import React from 'react'
import styled from 'styled-components'
import { bool, func, object } from 'prop-types'
import { Dialog } from '@material-ui/core'

const StyledDialog = styled(Dialog)`
  .MuiDialog-paper {
    border-radius: 10px;
    box-shadow: none;
  }
`

const ModalLayout = ({ isOpen, onClose, children }) => (
  <StyledDialog open={isOpen} onClose={onClose}>
    {children}
  </StyledDialog>
)

ModalLayout.propTypes = {
  isOpen: bool,
  onClose: func,
  children: object,
}

export default ModalLayout
