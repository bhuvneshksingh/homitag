import React from 'react'
import { object, func } from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { PrimaryButton, OutlinePrimaryButton } from 'components/Common/Button'
import { DialogContent } from '@material-ui/core'
import ModalLayout from 'components/Suppliers/Dashboard/Modals/ModalLayout'
import { ModalContent } from 'components/Suppliers/Dashboard/Modals/ModalContent'
import Routes from 'containers/Suppliers/Router/Routes.json'
import { logoutAction } from '../action'

const StyledDialogContent = styled(DialogContent)`
`


const Logout = ({ logout, history }) => {

  const handleLogoutAction  = () => {
    logout();
    history.push(Routes.Suppliers)
  }
  const handleClose  = () => {
    history.goBack();
  }

 
  return <>
  <ModalLayout isOpen>
    <StyledDialogContent>
      <ModalContent 
        icon = 'logoutBig'
        title="Log Out?"
        desc="Are you sure you want to log out?">
      </ModalContent>
      <PrimaryButton type="submit" style={{ marginTop: '30px' }} onClick={handleLogoutAction}>
          Yes, Log Out
      </PrimaryButton>
      <OutlinePrimaryButton onClick={handleClose}>
          Cancel
      </OutlinePrimaryButton>
    </StyledDialogContent>
  </ModalLayout>
  </>
}

Logout.propTypes = {
  logout: func,
  history: object
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutAction()),
})

const withConnect = connect(
  null,
  mapDispatchToProps
)

export default withConnect(Logout)
