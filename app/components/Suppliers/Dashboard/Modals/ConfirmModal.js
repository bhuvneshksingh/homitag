import React from 'react'
import styled from 'styled-components'
import { bool, func, array, string, oneOfType, object } from 'prop-types'
import { DialogActions } from '@material-ui/core'

import { PrimaryButton } from 'components/Common/Button'
import ModalLayout from './ModalLayout'
import { ModalContent } from './ModalContent'

const StyledDialogActions = styled(DialogActions)`
  && {
    padding: 0;
  }
`

const ConfirmButton = styled(PrimaryButton)`
  && {
    margin: 0;
    border-radius: 0;
  }
`

export const ConfirmModalContent = ({ onClose, ...props }) => (
    <>
      <ModalContent {...props} />
      <StyledDialogActions>
        <ConfirmButton onClick={onClose}>Done</ConfirmButton>
      </StyledDialogActions>
    </>
)



ConfirmModalContent.propTypes = {
  onClose: func,
  children: oneOfType([array, object]),
  icon: string,
  title: string,
  desc: string,
}

ConfirmModalContent.defaultProps = {
  icon: 'checkCircle',
}

const ConfirmModal = ({ isOpen, onClose, ...props }) => 

  (<ModalLayout isOpen={isOpen} onClose={onClose}>
    <ConfirmModalContent onClose={onClose} {...props} />
  </ModalLayout>)
  


ConfirmModal.propTypes = {
  isOpen: bool,
  onClose: func,
  children: oneOfType([array, object]),
  icon: string,
  title: string,
  desc: string,
}

ConfirmModal.defaultProps = {
  icon: 'checkCircle',
}

export default ConfirmModal
