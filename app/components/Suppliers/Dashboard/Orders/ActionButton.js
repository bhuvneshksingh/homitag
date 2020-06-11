import React, { useState } from 'react'
import { injectIntl } from 'react-intl'
import styled from 'styled-components'
import { object, string, bool, func } from 'prop-types'
import { IconButton } from '@material-ui/core'
import MoreIcon from 'assets/images/icons/more-purple.png'
import messages from '../../../../containers/Suppliers/Dashboard/Orders/messages'
import Dropdown from './Dropdown'
import ActionModal from '../../../../containers/Suppliers/Dashboard/Orders/ActionModal'


const StyledMore = styled.img`
  width: 26px;
  height: 6px;
`

const ActionButton = ({ intl, id, type , shipped, onClose, status, deliveryMethod, from}) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState(null)
  const [actionPrompt, setActionPrompt] = useState('')
  const items = []
  let DropDownTitle = ''
 

  if (type === "Cancellation") {
    
    DropDownTitle = intl.formatMessage(messages.cancellationActions)
    items.push( { value: 'contactBuyer', label: intl.formatMessage(messages.contactBuyer), actionType: 'page', destination: `/suppliers/orders/order/contact-buyer/${  id}`})
    
  }
  if (type === "Order") {

    DropDownTitle = intl.formatMessage(messages.orderActions)
   
  
    
    if (from==="OrderDetail" && !shipped && status === 'pendingbuyerconfirmation' ) {
      items.push( { value: 'fullfillOrder', label: intl.formatMessage(messages.fullfillOrder), actionType: 'page', destination: `/suppliers/orders/order/fullfill-order/${  id}`}) 
    }

    if (!shipped) { 
      if (status==="accepted" || status==="created" || status==="pendingbuyerconfirmation" ) { 
        items.push( { value: 'cancel', label: intl.formatMessage(messages.cancel), actionType: 'modal'}) 
      }
    }

    // items.push( { value: 'refundOrder', label: intl.formatMessage(messages.refundOrder), actionType: 'page', destination: `/suppliers/orders/order/refund/${  id}`})
    
    if (shipped) { items.push( { value: 'archive', label: intl.formatMessage(messages.archive) , actionType: 'modal'}) }
    // items.push( { value: 'viewPackingSlip', label: intl.formatMessage(messages.viewPackingSlip), actionType: 'page' , destination: `/suppliers/orders/order/view-packing-slip/${  id}`})  
   

    if (status === 'buyAccepted' && deliveryMethod.type === 'homitagshipping') { 
      items.push( { value: 'editLabel', label: intl.formatMessage(messages.editLabel), actionType: 'page', destination: `/suppliers/orders/order/edit-label/${  id}`})
    }
    if (status === 'buyAccepted' && deliveryMethod.type === 'shipindependently') { 
      items.push( { value: 'editLabel', label: intl.formatMessage(messages.editLabel), actionType: 'page', destination: `/suppliers/orders/order/edit-label/${  id}`})
      items.push( { value: 'viewPackingSlip', label: intl.formatMessage(messages.viewPackingSlip), actionType: 'page' , destination: `/suppliers/orders/order/view-packing-slip/${  id}`}) 
    }
    // items.push( { value: 'editLabel', label: intl.formatMessage(messages.editLabel), actionType: 'page', destination: `/suppliers/orders/order/edit-label/${  id}`})
    items.push( { value: 'contactBuyer', label: intl.formatMessage(messages.contactBuyer), actionType: 'page', destination: `/suppliers/orders/order/contact-buyer/${  id}`})
    

  }


  if (type === "Return") {

    if (status==="requested"){

      items.push( { value: 'refundBuyer', label: intl.formatMessage(messages.refundBuyer), actionType: 'page', destination: `/suppliers/orders/order/refund/${  id}`})
      items.push( { value: 'contactBuyer', label: intl.formatMessage(messages.contactBuyer), actionType: 'page', destination: `/suppliers/orders/order/contact-buyer/${  id}`})

    }
    if (status==="accepted"){
      items.push( { value: 'refundBuyer', label: intl.formatMessage(messages.refundBuyer), actionType: 'page', destination: `/suppliers/orders/order/refund/${  id}`})
      items.push( { value: 'contactBuyer', label: intl.formatMessage(messages.contactBuyer), actionType: 'page', destination: `/suppliers/orders/order/contact-buyer/${  id}`})
      items.push( { value: 'closeReturn', label: intl.formatMessage(messages.closeReturn) , actionType: 'none'})
    }
    if (status==="returned"){

      items.push( { value: 'contactBuyer', label: intl.formatMessage(messages.contactBuyer), actionType: 'page', destination: `/suppliers/orders/order/contact-buyer/${  id}`})
      items.push( { value: 'closeReturn', label: intl.formatMessage(messages.closeReturn) , actionType: 'none'})
      items.push( { value: 'archive', label: intl.formatMessage(messages.archive) , actionType: 'modal'})  
    }
   
    if (status==="refundnoreturnedrequested"){

      items.push( { value: 'contactBuyer', label: intl.formatMessage(messages.contactBuyer), actionType: 'page', destination: `/suppliers/orders/order/contact-buyer/${  id}`})
      items.push( { value: 'resendLabel', label: intl.formatMessage(messages.resendLabel) , actionType: 'modal'})
      items.push( { value: 'editLabel', label: intl.formatMessage(messages.editLabel), actionType: 'page', destination: `/suppliers/orders/order/edit-label/${  id}`})
      items.push( { value: 'refundOrder', label: intl.formatMessage(messages.refundOrder), actionType: 'page', destination: `/suppliers/orders/order/refund/${  id}`})
    }

    if (status==="refundreturnedrequested"){
      items.push( { value: 'contactBuyer', label: intl.formatMessage(messages.contactBuyer), actionType: 'page', destination: `/suppliers/orders/order/contact-buyer/${  id}`})
      items.push( { value: 'resendLabel', label: intl.formatMessage(messages.resendLabel) , actionType: 'modal'})
      items.push( { value: 'editLabel', label: intl.formatMessage(messages.editLabel), actionType: 'page', destination: `/suppliers/orders/order/edit-label/${  id}`})
      items.push( { value: 'refundOrder', label: intl.formatMessage(messages.refundOrder), actionType: 'page', destination: `/suppliers/orders/order/refund/${  id}`})
      items.push( { value: 'closeReturn', label: intl.formatMessage(messages.closeReturn) , actionType: 'none'})

    }
    if (status === "refundedreturned"){
      items.push( { value: 'contactBuyer', label: intl.formatMessage(messages.contactBuyer), actionType: 'page', destination: `/suppliers/orders/order/contact-buyer/${  id}`})
      items.push( { value: 'closeReturn', label: intl.formatMessage(messages.closeReturn) , actionType: 'none'})
      items.push( { value: 'archive', label: intl.formatMessage(messages.archive) , actionType: 'modal'})  

    }

    if (status === "cancelled") {
      items.push( { value: 'contactBuyer', label: intl.formatMessage(messages.contactBuyer), actionType: 'page', destination: `/suppliers/orders/order/contact-buyer/${  id}`})
      items.push( { value: 'closeReturn', label: intl.formatMessage(messages.closeReturn) , actionType: 'none'})
      items.push( { value: 'archive', label: intl.formatMessage(messages.archive) , actionType: 'modal'})  

    }

    if (status === "declined") {
      items.push( { value: 'contactBuyer', label: intl.formatMessage(messages.contactBuyer), actionType: 'page', destination: `/suppliers/orders/order/contact-buyer/${  id}`})
      items.push( { value: 'closeReturn', label: intl.formatMessage(messages.closeReturn) , actionType: 'none'})
      items.push( { value: 'archive', label: intl.formatMessage(messages.archive) , actionType: 'modal'})  

    }
   
  
    DropDownTitle = intl.formatMessage(messages.returnActions)
  }
  if (type === "Archived") {
    items.push( { value: 'refundOrder', label: intl.formatMessage(messages.refundOrder), actionType: 'page', destination: `/suppliers/orders/order/refund/${  id}`})

    items.push( { value: 'dearchive', label: intl.formatMessage(messages.dearchive), actionType: 'modal'}) 
  
    DropDownTitle = intl.formatMessage(messages.archiveActions)
  }

  items.push({ value: 'help', label: intl.formatMessage(messages.help), actionType: 'page', destination: `/suppliers/help`})
  // items.push({ value: status, label: status, actionType: 'page', destination: `/suppliers/help`})

  
  return (
    <>
      <IconButton onClick={e => setMenuAnchorEl(e.currentTarget)}>
        <StyledMore src={MoreIcon} alt="More" />
      </IconButton>
      <Dropdown
        anchorEl={menuAnchorEl}
        onClose={() => setMenuAnchorEl(null)}
        items={items}
        title={DropDownTitle}
        onItemClick={value => setActionPrompt(value)}
        id={id}
      />
      <ActionModal
        isOpen={!!actionPrompt}
        id={id}
        onClose={() => onClose()}
        action={actionPrompt}
        type={type}
      />
  </>
  )
}

ActionButton.propTypes = {
  intl: object,
  id: string,
  type: string,
  shipped: bool,
  status: string,
  onClose: func,
  deliveryMethod: object,
  from: string
}
export default injectIntl(ActionButton)
