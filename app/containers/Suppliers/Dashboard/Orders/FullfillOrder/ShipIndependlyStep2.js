import React, {  useState } from 'react'
import { injectIntl } from 'react-intl'
import styled from 'styled-components'
import {  func, object} from 'prop-types'
import { withRouter } from "react-router";
import Grid from '@material-ui/core/Grid';
import { format, addDays } from 'date-fns'

import  PackingSlip  from "assets/images/packingslip.png"
import  printIcon  from "assets/images/icons/printIcon.svg"
import  cloudIcon  from "assets/images/icons/cloudIcon.svg"
import { PrimaryButton } from '../../../../../components/Common/Button'
import {  shipOrder } from '../api'


const PackingSlipImage= styled.div`
text-align: center;
 
`
const ActionsBox = styled.div`
display: flex;
justify-content: space-evenly;
`

const ActionButton= styled.div`
  width: 70px;
  height: 70px;
  align-self: center;
  color: ${({ theme }) => theme.colors.homiBlack};
  cursor: pointer;
`

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


const StyledPrimaryButton = styled(PrimaryButton)`
&& :disabled {
  color: #7471ff;
  /* opacity: 0.5; */
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.homiPrimary};
}
&& :disabled .MuiButton-label * {
  color: ${({ theme }) => theme.colors.homiPrimary};
}
`


const Steps = ({ order,  handleNextStep, shippingIndData, handleError }) => {
  
  
  const [error, setError] = useState(false)
  const [submitDisabled, setSubmitDisabled] = useState(true); 

  
  const handleValidation = () => {

    setSubmitDisabled(false)
  }

  const handlePrint = () => {

    handleValidation()
  }

  const handleDownload = () => {

    handleValidation()
    
  }
  const showErrorModal = (message) => {
    handleError(message)
  }

  const handleClick = () => {

    // SHIP ORDER
    const bodyShip = {
      "deliveryMethod": {
        "type": "shipindependently",
        "carrier": shippingIndData.carrier,
        "otherCarrier": shippingIndData.otherCarrier
      },
      "orderStatus": "buyAccepted",
      "deliveryStatus": "processing",
      "trackingId": shippingIndData.trackingId,
      "shipBy": format(addDays(new Date(),1), 'yyyy/MM/dd')
    }

    
    shipOrder(order.id, bodyShip)
      .then(() => {
        handleValidation()
      })
      .catch(() => {
        const errorMessage =  `LABEL GENERATION ERROR`
        setError(true)
        showErrorModal(errorMessage)
      })
    handleNextStep(3)

  }

  const  buttonShow = () => (<StyledPrimaryButton subtitle="Drop Off" onClick={() => handleClick()} disabled={submitDisabled}> Next</StyledPrimaryButton>)
  if (!error) {
    return ( 
     
      <FullfillSteps>
        <StyledSubTitle>Packing Slip</StyledSubTitle>
        <StyledStepText>Please include this in the package you ship off. We`ll send a copy to your email too.</StyledStepText>
        <Grid container spacing={3}>
          <Grid item xs={12}> 
            <PackingSlipImage>
              <img src={PackingSlip} alt=''/>
            </PackingSlipImage>
          </Grid>
          <Grid item xs={12}> 
            <ActionsBox>
              <ActionButton onClick={handlePrint}>
                <img src={printIcon} alt=''/>
              Print
              </ActionButton>
              <ActionButton onClick={handleDownload}>
                <img src={cloudIcon} alt=''/>
              Download
              </ActionButton>
            </ActionsBox>
          </Grid> 
          <Grid item xs={12}> 
            {buttonShow()}
          </Grid>
        </Grid>
      </FullfillSteps>
    )
  }
  return null
}
  
Steps.propTypes = {
  order: object,
  handleNextStep: func,
  handleError: func,
  shippingIndData: object
}
export default injectIntl(withRouter(Steps))
