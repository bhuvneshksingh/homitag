import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { bool, string} from 'prop-types'
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { PrimaryButton } from '../../../Common/Button'
import PostedSuccess from '../../../../assets/images/icons/PostedSuccess.png'
import postAnother from '../../../../assets/images/icons/postAnother.png'
import boost from '../../../../assets/images/icons/boost.png'

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
const SuccessIcon = styled.img`
  margin: auto;
  margin-top: 50px;
  margin-bottom: 40px;
`

const ActionCardsContainer = styled.div`
  margin: auto;
  margin-bottom: 50px;
  width: 80%;
  display: flex;
  justify-content: space-around;
`

const ActionCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 165px;
  height: 135px;
  box-shadow: 0px 4px 5px rgba(0, 0, 0, .25);
  border-radius: 8px;
`
const ActionButton = styled.div`
    height: 40px;
    background-color: #969696;
    margin-bottom: 0;
    border-radius: 0px 0px 8px 8px;
    text-align: center;
    padding: 10px;
    color: white;
`
const CardImg = styled.img`
  margin:auto;
`
const NewProductConfirm = ( {isOpen, productName}) => (
  <StyledDialog open={isOpen}>
    <SuccessIcon src={PostedSuccess}/>
    <DialogContent>
      <DialogTitle>Congratulations! You succesfully listed {productName}.</DialogTitle>
      <ActionCardsContainer>
        <ActionCard>
          <CardImg src={postAnother} />
          <BackToDashLink to='/suppliers/new-product'>
            <ActionButton>Post Another</ActionButton>
          </BackToDashLink>
        </ActionCard>
        <ActionCard>
          <CardImg src={boost} />
          <BackToDashLink to='/suppliers/new-product'>
            <ActionButton>Boost Listing</ActionButton>
          </BackToDashLink>
        </ActionCard>
      </ActionCardsContainer>
    </DialogContent>
    <StyledDialogActions>
      <BackToDashLink to='/suppliers'>
        <ConfirmButton>Back to Dashboard</ConfirmButton>
      </BackToDashLink>
    </StyledDialogActions>
  </StyledDialog>
)

NewProductConfirm.propTypes = {
  isOpen: bool,
  productName: string
}

export default NewProductConfirm
