import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { bool} from 'prop-types'
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { PrimaryButton } from '../../../../../components/Common/Button'

const StyledDialog = styled(Dialog)`
  margin: auto;
  .MuiPaper-rounded {
    border-radius: 10px;
  }
  .MuiDialogContent-root:first-child {
    padding: 30px 60px 30px 60px;
}
  .MuiDialogTitle-root {
    text-align: center;
    margin-top: -30px;
  }
  .MuiTypography-body1 {
    color: #969696;
    font-size: 14px;
    line-height: 22px;
    padding: 20px;
  }
`
const StyledDialogActions = styled(DialogActions)`
  && {
    padding: 0;
  }
`
const BackToDashLink = styled(Link)`
  text-decoration: none;
  width: 100%;
`

const ConfirmButton = styled(PrimaryButton)`
  && {
    margin: 0;
    border-radius: 0;
  }
`

const NewProductConfirm = ( {isOpen}) => (
  <StyledDialog open={isOpen}>
    <DialogContent>
      <DialogTitle>Congratulations! You succesfully listed ...item name...</DialogTitle>
    </DialogContent>
    <StyledDialogActions>
      <BackToDashLink to='/suppliers'>
        <ConfirmButton>Back to Dashboard</ConfirmButton>
      </BackToDashLink>
    </StyledDialogActions>
  </StyledDialog>
)

NewProductConfirm.propTypes = {
  isOpen: bool
}

export default NewProductConfirm
