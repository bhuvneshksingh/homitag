import React from 'react'
import { injectIntl } from 'react-intl'
import styled from 'styled-components'
import {  func } from 'prop-types'
import { withRouter } from "react-router";
import Grid from '@material-ui/core/Grid';
import  chronIcon  from "assets/images/icons/chron.svg"
import  dropIcon  from "assets/images/icons/drop.svg"
import  signIcon  from "assets/images/icons/sign.svg"
import { PrimaryButton } from '../../../../../components/Common/Button'



const StyledSubTitle = styled.div`
  text-align: left;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 25px;
`


const StyledText = styled.div`
  font-weight: 600;
  margin-bottom: 20px;
  color: white;
  font-size: 16px;
`



const FullfillSteps = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
`
const StyledStepText = styled(StyledText)`
  color: ${({ theme }) => theme.colors.homiBlack};
  font-weight: normal;
`


const StyledPackingTipsOptionText = styled(StyledText)`
color: #969696;
padding: 0px 20px;
font-size: 14px;
font-weight: bold;
`


const PackingTipOption = styled(StyledText)`
  color:  #969696;
  font-weight: normal;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.05);
  text-align: center;
  min-height: 200px
`
const PackingStyledIcon = styled.div`
margin: 20px 0px;
`

const PackingTipTitle = styled(StyledText)`
background-color: #7471ff;
color: #FFF;
padding: 20px;
text-align: center;
`

const StyledPrimaryButton = styled(PrimaryButton)`
  color: #7471ff;
  /* opacity: 0.5; */
  background: white;
  border: 1px solid #7471ff;

`


const InitialStep = ({ handleSuccess }) => {
  
  const handleValidation = () => {
    handleSuccess({title: "You`re Ready to Ship!", text: "Your label and packing slip are ready to go and now all you have to do is ship your item!"})
  }
  
  const  buttonShow = () => (<StyledPrimaryButton onClick={() => handleValidation()}> Finish</StyledPrimaryButton>)

  return ( 
     
    <FullfillSteps>
      <StyledSubTitle>Drop Off Instructions</StyledSubTitle>
      <StyledStepText>Please follow these shipping instructions to keep the delivery process as smooth as possible.</StyledStepText>
      <Grid container spacing={3}>
        <Grid item xs={6}> 
          <PackingTipOption>
            <PackingTipTitle>Step 1</PackingTipTitle>
            <PackingStyledIcon><img src={signIcon} alt=''/></PackingStyledIcon>
            <StyledPackingTipsOptionText>Print your shipping label and packing slip</StyledPackingTipsOptionText>
          </PackingTipOption>
        </Grid>
        <Grid item xs={6}> 
          <PackingTipOption>
            <PackingTipTitle>Step 2</PackingTipTitle>
            <PackingStyledIcon>  <img src={dropIcon} alt=''/></PackingStyledIcon>
            <StyledPackingTipsOptionText>Drop your package at the nearest carrier store</StyledPackingTipsOptionText>
          </PackingTipOption>
        </Grid>
        <Grid item xs={6}> 
          <PackingTipOption>
            <PackingTipTitle>Step 3</PackingTipTitle>
            <PackingStyledIcon><img src={chronIcon} alt=''/></PackingStyledIcon>
            <StyledPackingTipsOptionText>Await confirmation that the buyer received your item</StyledPackingTipsOptionText>
          </PackingTipOption>
        </Grid>
      </Grid>
      {buttonShow()}
    </FullfillSteps>


  )
}
  
InitialStep.propTypes = {
  handleSuccess: func
}
export default injectIntl(withRouter(InitialStep))
