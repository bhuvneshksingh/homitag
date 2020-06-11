import React from 'react'
import { bool, func, object, string } from 'prop-types'

import ModalLayout from './ModalLayout'
import { ConfirmModalContent } from './ConfirmModal'

const PromptMessageModal = ({
  isOpen,
  onClose,
  showSuccess,
  successMessage,
  showError,
  errorMessage
}) => {



  if (showError) {
    return  <ModalLayout isOpen={isOpen} onClose={onClose}>
      <ConfirmModalContent
        onClose={onClose}
        title="ERROR"
        icon="crossCircle"
        desc={errorMessage}
      />
    </ModalLayout>
  }
  if (showSuccess) {
    return (
      <ModalLayout isOpen={isOpen} onClose={onClose}>
        <ConfirmModalContent
          onClose={onClose}
          title={successMessage.title}
          desc={successMessage.text}
        />
      </ModalLayout>
    )
  }
  return null

}

PromptMessageModal.propTypes = {
  isOpen: bool,
  onClose: func,
  showSuccess: bool,
  successMessage: object,
  showError: bool,
  errorMessage: string
}


export default PromptMessageModal
