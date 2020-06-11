import React from 'react'
import { bool, func, array, string, oneOfType, object } from 'prop-types'

import { PrimaryButton, OutlinePrimaryButton } from 'components/Common/Button'
import RadioGroup from "../../../Common/Form/Radio"
import ModalLayout from './ModalLayout'
import { ModalContent } from './ModalContent'
import { ConfirmModalContent } from './ConfirmModal'

const PromptConfirmModal = ({
  isOpen,
  onClose,
  showConfirmation,
  promptButtonTitle,
  confirmationTitle,
  confirmationDesc,
  showError,
  errorMessage,
  onChangeForm,
  formValues,
  ...props
}) => {


  
  
  let showForm = ''

  if (props.action === 'closeReturn') {
    showForm  = <RadioGroup
      labelTitle={props.form.formLabelTitle} 
      form={props.form.formRadio} 
      value={parseInt(formValues.value, 0)}
      options={props.form.optionsRadio} 
      field={props.form.fieldsRadio}
      onChange={onChangeForm}/>
  }
  if (props.action === 'boost'){
    return(
      <ModalLayout isOpen={isOpen} onClose={onClose}>
        <>
          <ModalContent {...props}>

          </ModalContent>
        </>
      </ModalLayout>
    )
  }

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
  return (
    <ModalLayout isOpen={isOpen} onClose={onClose}>
     
      {showConfirmation ? (
        <ConfirmModalContent
          onClose={onClose}
          title={confirmationTitle}
          desc={confirmationDesc}
        />
      ) : (
        <>
          <ModalContent {...props}>
            {showForm}
            <PrimaryButton onClick={(e) => props.promptButtonAction(e)}>
              {promptButtonTitle}
            </PrimaryButton>
            <OutlinePrimaryButton onClick={onClose}>Cancel</OutlinePrimaryButton>
          </ModalContent>
        </>
      )}
    </ModalLayout>
  )

}

PromptConfirmModal.propTypes = {
  isOpen: bool,
  onClose: func,
  children: oneOfType([array, object]),
  icon: string,
  title: string,
  desc: string,
  showConfirmation: bool,
  showError: bool,
  errorMessage: string,
  promptButtonTitle: string,
  action: string,
  promptButtonAction: func,
  confirmationTitle: string,
  confirmationDesc: string,
  form: object,
  onChangeForm: func,
  formValues: object
}

PromptConfirmModal.defaultProps = {
  icon: 'crossCircle',
}

export default PromptConfirmModal
