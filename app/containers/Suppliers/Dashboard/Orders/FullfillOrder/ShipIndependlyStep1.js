import React, {  useState, useEffect } from 'react'
import { injectIntl } from 'react-intl'
import styled from 'styled-components'
import { func, object} from 'prop-types'
import { withRouter } from "react-router";
import Grid from '@material-ui/core/Grid';

import {TextField, FormControl, Select, MenuItem} from '@material-ui/core';
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
const StyledFormControl = styled(FormControl)`
  width: 100%; 
  padding: 10px;
  .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: #CCC;
    border-width: 1px;
  }
`
const StyledSelect = styled(Select)`

 && .MuiSelect-root {
   background-color: #f4f4f4;
   border-bottom: none;
   border-radius: 5px;
   padding: 10px;
 }
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

const StyledTextField = styled(TextField)`
padding: 10px;
&& .MuiOutlinedInput-input {
  padding: 10px;
}
`



const Steps = ({ order, handleNextStep , setShippingIndData}) => {
  
  
  const [showOtherSpecify, setShowOtherSpecify] = useState(false); 
  const [submitDisabled, setSubmitDisabled] = useState(true); 


  const initialStateErrors = {
    Error: false,
    carrierError: false,
    trackingError: false,
    otherCarrierError: false
  }
 
  const [formValues, setFormValues] = useState({
    carrier: order.deliveryMethod.carrier ? order.deliveryMethod.carrier : '',
    tracking: order.trackingId ? order.trackingId : '',
    otherCarrier: order.deliveryMethod.otherCarrier ? order.deliveryMethod.otherCarrier : '', 
  }); 

  const [formErrors, setFormErrors] = useState(initialStateErrors); 

  const handleChange  = name => event  => {
    setFormErrors(initialStateErrors)
    setFormValues({
      ...formValues,
      [name]: event.target.value
    })
   
  };
  const handleChangeCarrier  = () => event  => {
    setFormErrors(initialStateErrors)
    setFormValues({
      ...formValues,
      carrier: event.target.value
    })
 
    if (event.target.value === 'Other Specify') {
      setShowOtherSpecify(true)
    }else{
      setShowOtherSpecify(false)
    }
  };
  useEffect(() => {
    handleValidation()
    if (formValues.otherCarrier) {
      setShowOtherSpecify(true)
    }
  },[formValues])

  const OtherSpecify = () => (
    <Grid item xs={12}> 
      <StyledFormControl variant="outlined" >
        <StyledTextField
          id="otherCarrier" value={formValues.otherCarrier} placeholder="Carrier name" variant="outlined"  error={formErrors.otherCarrierError} 
          onChange={handleChange('otherCarrier')}/>
      </StyledFormControl>
    </Grid>
  )

  const handleValidation = () => {
    const errorObj = { ...formErrors  }
    if (formValues.carrier === '' ) {
      // errorObj.carrierError = true;
      errorObj.Error = true;
    }
    if (formValues.carrier === 'Other Specify') {
      if (formValues.otherCarrier === "" ) {
        // errorObj.otherCarrierError = true;
        errorObj.Error = true;
      }
    }
    if (formValues.tracking === '' ) {
      // errorObj.trackingError = true;
      errorObj.Error = true;
    }
    setFormErrors(errorObj)

    if (errorObj.Error) { 
      setSubmitDisabled(true)
    }else{
      setSubmitDisabled(false)
    }

  }


  const handleClick = () => 
  {
    setShippingIndData({ carrier: formValues.carrier, otherCarrier: formValues.otherCarrier , trackingId: formValues.tracking })
    handleNextStep(2)
  }

  const  buttonShow = () => (<StyledPrimaryButton subtitle="Label Details" onClick={() => handleClick()} disabled={submitDisabled}> Next</StyledPrimaryButton>)
  return ( 
     
    <FullfillSteps>
      <StyledSubTitle>Add Label Details</StyledSubTitle>
      <StyledStepText>Please provide the label infromation for your item. Both you and the buyer can track it in the order status page</StyledStepText>
      <Grid container spacing={3}>
        <Grid item xs={12}> 
          <StyledFormControl variant="outlined" >
            <StyledSelect 
              error={formErrors.carrierError}
              labelId="carrier"
              id="carrier"
              value={formValues.carrier}
              displayEmpty
              onChange={handleChangeCarrier()}
              placeholder=""
            ><MenuItem value="" disabled>
            Select a Carrier
              </MenuItem>
              <MenuItem value="usps">USPS</MenuItem>
              <MenuItem value="fedex">Fedex</MenuItem>
              <MenuItem value="ups">UPS</MenuItem>
              <MenuItem value="dhls">DHL</MenuItem>
              <MenuItem value="Other Specify">Other Specify</MenuItem>
            </StyledSelect>
          </StyledFormControl>
        </Grid>
        {showOtherSpecify ? OtherSpecify() : ''}
        <Grid item xs={12}> 
          <StyledFormControl variant="outlined" >
            <StyledTextField
              id="tracking" placeholder="Tracking Number" variant="outlined" value={formValues.tracking}  error={formErrors.trackingError}
              onChange={handleChange('tracking')}/>
          </StyledFormControl>
        </Grid>
        <Grid item xs={12}> 
          {buttonShow()}
        </Grid>
      </Grid>
    </FullfillSteps>






  )
}
  
Steps.propTypes = {
  handleNextStep: func,
  setShippingIndData: func,
  order: object
}
export default injectIntl(withRouter(Steps))
