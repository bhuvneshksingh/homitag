import React from 'react'
import {  bool, string, func, object } from 'prop-types'
import { injectIntl } from 'react-intl'
import PromtMessageModal from './PromtMessageModal'


const MessageModal = ({ isOpen, onClose, showError, errorMessage, showSuccess, successMessage }) => {
  
  const myOnClose = () => {
    onClose()
  }
 
  return (
    <PromtMessageModal
      isOpen={isOpen}
      onClose={myOnClose}
      showError={showError}
      errorMessage={errorMessage}
      showSuccess={showSuccess}
      successMessage={successMessage}
    />
  )
}

MessageModal.propTypes = {
  isOpen: bool,
  onClose: func,
  showError: bool,
  errorMessage: string,
  showSuccess: bool,
  successMessage: object
}


export default injectIntl(MessageModal)
