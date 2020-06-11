import React from 'react'
import styled from 'styled-components'
import { bool, func } from 'prop-types'
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@material-ui/core'
import { PrimaryButton } from '../../../Common/Button'
import PostedSuccess from '../../../../assets/images/icons/PostedSuccess.png'

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

const LightText = styled.p`
  font-size: 14px;
  color: #969696;
`
const ConfirmButton = styled(PrimaryButton)`
  && {
    margin: 0;
    border-radius: 0;
  }
`
const SuccessIcon = styled.img`
  margin: auto;
  margin-top: 50px;
  margin-bottom: 40px;
`

const MatchLowestPriceModal = ({ isOpen, onClose }) => (
  <StyledDialog open={isOpen}>
    <SuccessIcon src={PostedSuccess} />
    <DialogContent>
      <DialogTitle>You&apos;re now the most competitive!</DialogTitle>
      <LightText>
        Your listing&apos;s price has been updated to match the lowest price.
      </LightText>
    </DialogContent>
    <ConfirmButton onClick={onClose}>Done</ConfirmButton>
  </StyledDialog>
)

MatchLowestPriceModal.propTypes = {
  isOpen: bool,
  onClose: func.isRequired,
}

export default MatchLowestPriceModal
