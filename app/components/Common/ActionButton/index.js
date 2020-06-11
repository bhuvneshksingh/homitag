import React, { useState } from 'react'
import { injectIntl } from 'react-intl'
import styled from 'styled-components'
import { object, string, func, bool } from 'prop-types'
import { IconButton } from '@material-ui/core'
import MoreIcon from 'assets/images/icons/more-purple.png'
import messages from '../../../containers/Suppliers/Dashboard/Inventory/messages'
import Dropdown from '../../Suppliers/Dashboard/Inventory/Dropdown'
import ActionModal from '../../../containers/Suppliers/Dashboard/Inventory/ActionModal'


const StyledMore = styled.img`
  width: 26px;
  height: 6px;
`

const ActionButton = ({ intl, id, productStatus, onConfirmed, archived }) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState(false)
  const [actionPrompt, setActionPrompt] = useState('')

  const items = []

  if(archived === false || archived === undefined){
    if(productStatus === 'Active'){
      items.push({ value: 'boost', label: intl.formatMessage(messages.boost)})
      items.push({ value: 'deactivate', label: intl.formatMessage(messages.deactivate)})
    }
    if(productStatus === 'Inactive'){
      items.push({ value: 'archive', label: intl.formatMessage(messages.archive) })
      items.push({ value: 'activate', label: intl.formatMessage(messages.activate)})
    }
    if(productStatus === 'Blocked'){
      items.push({ value: 'archive', label: intl.formatMessage(messages.archive) })
    }
    if(productStatus === 'Soldout'){
      items.push({ value: 'archive', label: intl.formatMessage(messages.archive) })
    }
  } else if(productStatus === 'Inactive'){
    items.push({ value: 'unarchive', label: intl.formatMessage(messages.unarchive) })
  }

  items.push( { value: 'delete', label: intl.formatMessage(messages.delete) } )
  items.push({ value: 'help', label: intl.formatMessage(messages.help), actionType: 'page', destination: `/suppliers/help`})

  const handleClose = () => {
    onConfirmed()
    setActionPrompt('')
  }
  return (
    <>
      <IconButton onClick={e => setMenuAnchorEl(e.currentTarget)}>
        <StyledMore src={MoreIcon} alt="More" />
      </IconButton>
      <Dropdown
        anchorEl={menuAnchorEl}
        onClose={() => setMenuAnchorEl(null)}
        items={items}
        title={intl.formatMessage(messages.productActions)}
        onItemClick={value => setActionPrompt(value)}
      />
      <ActionModal
        isOpen={!!actionPrompt}
        id={id}
        onClose={handleClose}
        action={actionPrompt}
        isBulk
      />
    </>
  )
}

ActionButton.propTypes = {
  intl: object,
  id: string,
  productStatus: string,
  onConfirmed: func,
  archived: bool
}
export default injectIntl(ActionButton)
