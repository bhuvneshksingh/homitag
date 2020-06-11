import React, {useState} from 'react'
import { object, bool, string, func } from 'prop-types'
import { injectIntl } from 'react-intl'
import PromptConfirmModal from 'components/Suppliers/Dashboard/Modals/PromptConfirmModal'
import Cookies from 'universal-cookie';
import { cancelOrder, archiveOrder } from './api'
import messages from './messages'

const renderContent = (action, type, intl) => {
  let title = ''
  let desc = ''
  let confirmationDesc = ''
  let icon
  let form = {}
  const formOptions = {
    valueSelected: 1,
    optionsRadio: [{
      value: 1,
      label: intl.formatMessage(messages.closeReturnFormOptionsReason1)
    },{
      value: 2,
      label: intl.formatMessage(messages.closeReturnFormOptionsReason2)
    },{
      value: 3,
      label: intl.formatMessage(messages.closeReturnFormOptionsReason3)
    }],
    fieldsRadio: {
      name: 'reason'
    },
    formRadio: {
      touched: 1,
      errors: ''
    }
  }
  switch (action) {
    case 'cancel':
      title = intl.formatMessage(messages.cancel)
      desc = intl.formatMessage(messages.cancelPromptDesc, { type })
      confirmationDesc = intl.formatMessage(messages.cancelConfirmationDesc, {
        type,
      })
      icon = 'cancellationsPurple'
      form = {}
      break
    case 'archive':
      title = intl.formatMessage(messages.archive)
      desc = intl.formatMessage(messages.archivePromptDesc, { type })
      confirmationDesc = intl.formatMessage(messages.archiveConfirmationDesc, {
        type,
      })
      icon = 'box'
      form = {}
      break
    case 'dearchive':
      title = intl.formatMessage(messages.dearchive)
      desc = intl.formatMessage(messages.dearchivePromptDesc, { type })
      confirmationDesc = intl.formatMessage(messages.dearchiveConfirmationDesc, {
        type,
      })
      icon = 'box'
      form = {}
      break
    case 'delete':
      title = intl.formatMessage(messages.delete)
      desc = intl.formatMessage(messages.deletePromptDesc, { type })
      confirmationDesc = intl.formatMessage(messages.deleteConfirmationDesc, {
        type,
      })
      icon = 'box'
      form = {}
      break
    case 'refund':
      title = intl.formatMessage(messages.refund)
      desc = intl.formatMessage(messages.refundPromptDesc, { type })
      confirmationDesc = intl.formatMessage(messages.refundConfirmationDesc, {
        type,
      })
      icon = 'box'
      form = {}
      break
    case 'archiveReturn':
      title = intl.formatMessage(messages.archiveReturn)
      desc = intl.formatMessage(messages.archiveReturnPromptDesc, { type })
      confirmationDesc = intl.formatMessage(messages.archiveReturnConfirmationDesc, {
        type,
      })
      icon = 'box'
      form = {}
      break
    case 'closeReturn':
      title = intl.formatMessage(messages.closeReturn)
      desc = intl.formatMessage(messages.closeReturnPromptDesc, { type })
      confirmationDesc = intl.formatMessage(messages.closeReturnConfirmationDesc, {
        type,
      })
      icon = 'closeReturnsPurple'
      form = formOptions
      break
    default:
      title = ''
      desc = ''
      confirmationDesc = ''
      form = {}
  }

  const modalTitle = intl.formatMessage(messages.actionPromptTitle, { action: title, type })

  return {
    title: modalTitle,
    desc,
    promtButtonTitle: intl.formatMessage(messages.promptButtonTitle, {
      action,
      type,
    }),
    confirmationTitle: intl.formatMessage(messages.confirmationTitle, {
      action: title,
      type,
    }),
    confirmationDesc,
    icon,
    form
  }

}

const ActionModal = ({ intl, isOpen, onClose, action, id, type }) => {
  const content = renderContent(action, type, intl)
  const [confirmationModal, showConfirmationModal] = useState(false)
  const [errorMessage, showErrorMessage] = useState('')
  const [errorModal, showErrorModal] = useState(false)
  const [inputValue, setInputValue] = useState({value:1})
  const cookies = new Cookies();

  const archive = () => {
    const ArchivedBody = {
      "archived":  true
    }
    // console.log('Call Archive Method')
    showConfirmationModal(true)
    archiveOrder(id, ArchivedBody)
      .then(() => {
        showConfirmationModal(true)
      }
      )
      .finally(
      ) /* */
  }

  const dearchive = () => {
    const DerchivedBody = {
      "archived":  false
    }
    // console.log('Call Archive Method') 
    showConfirmationModal(true)
    archiveOrder(id, DerchivedBody)
      .then(() => {
        showConfirmationModal(true)
      } 
      )
      .finally(
      ) /* */
  }
  

  const cancellation = () => {
    const body = {
      "userId":  cookies.get('userId'),
      "cancelReason": "otherreason",
      "comment": "string"
    }
    cancelOrder(id, body)
      .then(result => {
        if(result.status === 200){
          showConfirmationModal(true)
        }
      })
      .catch((e) => {
        showErrorModal(true)
        showErrorMessage(e.response.data.result.content.message)
      })
  }

  const handleAction = () => {
    switch (action) {
      case 'cancel':
        cancellation()
        break
      case 'archive':
        archive()
        break
      case 'dearchive':
        dearchive()
        break
      default:
    }
  }

  
  const myOnClose = () => {
    showConfirmationModal(false)
    onClose()
  }
  const onChangeForm = (e) => {
    setInputValue({value: e.target.value})
  }
  return (
    <PromptConfirmModal
      isOpen={isOpen}
      action={action}
      onClose={myOnClose}
      showError={errorModal}
      errorMessage={errorMessage}
      showConfirmation={confirmationModal}
      onChangeForm={onChangeForm}
      formValues={inputValue}
      promptButtonAction={() => handleAction(action, id)}
      promptButtonTitle = {content.promtButtonTitle}
      {...content}
    />
  )
}

ActionModal.propTypes = {
  intl: object,
  isOpen: bool,
  onClose: func,
  action: string,
  id: string,
  type: string
}


export default injectIntl(ActionModal)
