import React from 'react'
import { bool, func, array, string, oneOfType, object } from 'prop-types'

import { PrimaryButton, OutlinePrimaryButton } from 'components/Common/Button'
import ModalLayout from './ModalLayout'
import { ModalContent } from './ModalContent'

const PromptConfirmModal = ({
  isOpen,
  onClose,
  showConfirmation,
  promptButtonTitle,
  confirmationTitle,
  confirmationDesc,
  showError,
  onChangeForm,
  formValues,
  ...props
}) => (
  <ModalLayout isOpen={isOpen} onClose={onClose}>
        <>
          <ModalContent {...props}>
            <PrimaryButton onClick={(e) => props.promptButtonAction(e)}>
              {promptButtonTitle}
            </PrimaryButton>
            <OutlinePrimaryButton onClick={onClose}>Cancel</OutlinePrimaryButton>
          </ModalContent>
        </>
  </ModalLayout>
)

PromptConfirmModal.propTypes = {
  isOpen: bool,
  onClose: func,
  children: oneOfType([array, object]),
  icon: string,
  title: string,
  desc: string,
  showConfirmation: bool,
  showError: bool,
  promptButtonTitle: string,
  action: string,
  promptButtonAction: func,
  confirmationTitle: string,
  confirmationDesc: string,
  form: object,
  onChangeForm: func,
  formValues: object
}


export default PromptConfirmModal
