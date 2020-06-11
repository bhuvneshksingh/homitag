import React, { useState } from 'react'
import { object, bool, string, func, array } from 'prop-types'
import { injectIntl } from 'react-intl'

import PromptConfirmModal from 'components/Suppliers/Dashboard/Modals/PromptConfirmModal'
import messages from './messages'
import ActionController from './Controllers/actionController'
import { updateAction, deletePost, archiveAction, unarchiveAction } from './api'

const renderContent = (action, type, intl) => {
  let title = ''
  let desc = ''
  let confirmationDesc = ''
  let icon
  switch (action) {
    case 'boost':
      title = intl.formatMessage(messages.boostListing)
      desc = intl.formatMessage(messages.boostPromptDesc, { type })
      confirmationDesc = intl.formatMessage(messages.activateConfirmationDesc, {
        type,
      })
      icon = 'boostBadge'
      break
    case 'activate':
      title = intl.formatMessage(messages.activate)
      desc = intl.formatMessage(messages.activatePromptDesc, { type })
      confirmationDesc = intl.formatMessage(messages.activateConfirmationDesc, {
        type,
      })
      icon = 'reCircle'
      break
    case 'deactivate':
      title = intl.formatMessage(messages.deactivate)
      desc = intl.formatMessage(messages.deactivatePromptDesc, { type })
      confirmationDesc = intl.formatMessage(
        messages.deactivateConfirmationDesc,
        { type }
      )
      break
    case 'archive':
      title = intl.formatMessage(messages.archive)
      desc = intl.formatMessage(messages.archivePromptDesc, { type })
      confirmationDesc = intl.formatMessage(messages.archiveConfirmationDesc, {
        type,
      })
      icon = 'box'
      break
    case 'unarchive':
      title = intl.formatMessage(messages.unarchive)
      desc = intl.formatMessage(messages.unarchivePromptDesc, { type })
      confirmationDesc = intl.formatMessage(messages.unarchiveConfirmationDesc, {
        type,
      })
      icon = 'box'
      break
    case 'delete':
      title = intl.formatMessage(messages.delete)
      desc = intl.formatMessage(messages.deletePromptDesc, { type })
      confirmationDesc = intl.formatMessage(messages.deleteConfirmationDesc, {
        type,
      })
      break
    default:
      title = ''
      desc = ''
      confirmationDesc = ''
  }

  const modalTitle = action === 'boost' ? intl.formatMessage(messages.boostListing) :
    intl.formatMessage(messages.actionPromptTitle, { action: title, type })

  return {
    title: modalTitle,
    desc,
    prmoptButtonTitle: intl.formatMessage(messages.promptButtonTitle, {
      action: title,
      type,
    }),
    confirmationTitle: intl.formatMessage(messages.confirmationTitle, {
      action: title,
      type,
    }),
    confirmationDesc,
    icon
  }
}


const ActionModal = ({ intl, isOpen, onClose, action, isBulk, id, selectedItems, removeSelectedItems }) => {
  const type = isBulk ? 'Listing' : 'Listings'
  const postsId =  selectedItems || [id]
  const [isConfirmed, setIsConfirmed] = useState(false)
  const content = renderContent(action, type, intl)

  const handlePromptClose = () => {
    onClose()
    removeSelectedItems()
    setIsConfirmed(false)
  }
  const handleAction = () => {
    if(action === 'delete'){
      postsId.forEach(postId =>
        deletePost(postId).then(res => {
          if(res.status === 200 && res.data.success === true){
            setIsConfirmed(true)
          }
        }))
    }else if(action === 'activate' || action === 'deactivate'){
      postsId.forEach(postId =>{
        const postStatusId = ActionController.getPostStatusId(action)
        updateAction(postStatusId, postId).then(res => {
          if(res.status === 200 && res.data.success === true){
            setIsConfirmed(true)
          }
        })
      })
    }
    else if(action === 'archive'){
      postsId.forEach(postId =>{
        archiveAction(postId).then(res => {
          if(res.status === 200 && res.data.success === true){
            setIsConfirmed(true)
          }
        })
      })
    }else if(action === 'unarchive'){
      postsId.forEach(postId =>{
        unarchiveAction(postId).then(res => {
          if(res.status === 200 && res.data.success === true){
            setIsConfirmed(true)
          }
        })
      })
    }
  }

  return (
    <PromptConfirmModal
      isOpen={isOpen}
      action={action}
      onClose={handlePromptClose}
      showConfirmation={isConfirmed}
      promptButtonAction={() => handleAction(action, id)}
      promptButtonTitle = {content.title}
      {...content}
    />
  )
}

ActionModal.propTypes = {
  intl: object,
  isOpen: bool,
  onClose: func,
  action: string,
  isBulk: bool,
  id: string,
  selectedItems: array,
  removeSelectedItems: func
}

export default injectIntl(ActionModal)
