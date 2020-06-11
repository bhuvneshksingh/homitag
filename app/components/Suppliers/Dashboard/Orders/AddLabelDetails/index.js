import React, { useState, useEffect, createRef } from 'react'
import { injectIntl } from 'react-intl'
import styled from 'styled-components'
import { func, object } from 'prop-types'
import { withRouter } from 'react-router'
import Grid from '@material-ui/core/Grid'

import IconButton from '@material-ui/core/IconButton'

import { TextField, FormControl, Select, MenuItem } from '@material-ui/core'
import Icon from 'components/Common/Icon'
import CloudUploadIcon from '../../../../../assets/images/icons/uploadLabel.svg'

const StyledSubTitle = styled.div`
  text-align: left;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 25px;
`

const StyledIcon = styled(Icon).attrs(props => ({
  color: props.theme.colors.homiPrimary,
  width: '13px',
  height: '15px',
}))`
  position: absolute;
  top: -15px;
  right: -18px;
`

const FullfillSteps = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
`
const StyledLabelContainer = styled.div`
  width: 100px;
  text-align: center;
  position: relative;
  margin: auto;
  && img {
    max-width: 100px;
  }
`

const StyledFormControl = styled(FormControl)`
  width: 100%;
  padding: 10px;
  .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: #ccc;
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

const StyledTextField = styled(TextField)`
  padding: 10px;
  && .MuiOutlinedInput-input {
    padding: 10px;
  }
`

const StyledGrid = styled(Grid)`
  && label {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

const AddLabelDetails = ({ order, setShippingIndData }) => {
  const [showOtherSpecify, setShowOtherSpecify] = useState(false)

  const initialStateErrors = {
    Error: false,
    carrierError: false,
    trackingError: false,
    otherCarrierError: false,
  }

  const [formValues, setFormValues] = useState({
    carrier: order.deliveryMethod.carrier ? order.deliveryMethod.carrier : '',
    tracking: order.trackingId ? order.trackingId : '',
    otherCarrier: order.deliveryMethod.otherCarrier
      ? order.deliveryMethod.otherCarrier
      : '',
    labelData: '',
  })

  const [formErrors, setFormErrors] = useState(initialStateErrors)

  const inputOpenFileRef = createRef()

  const handleChange = name => event => {
    setFormErrors(initialStateErrors)
    setFormValues({
      ...formValues,
      [name]: event.target.value,
    })
  }
  const handleChangeCarrier = () => event => {
    setFormErrors(initialStateErrors)
    setFormValues({
      ...formValues,
      carrier: event.target.value,
    })

    if (event.target.value === 'Other Specify') {
      setShowOtherSpecify(true)
    } else {
      setShowOtherSpecify(false)
    }
  }

  useEffect(() => {
    setShippingIndData(formValues)
  }, [formValues])

  const OtherSpecify = () => (
    <Grid item xs={12}>
      <StyledFormControl variant="outlined">
        <StyledTextField
          id="otherCarrier"
          value={formValues.otherCarrier}
          placeholder="Carrier name"
          variant="outlined"
          error={formErrors.otherCarrierError}
          onChange={handleChange('otherCarrier')}
        />
      </StyledFormControl>
    </Grid>
  )

  const toBase64 = file =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = error => reject(error)
    })
  async function handleCapture(e) {
    setFormValues({
      ...formValues,
      labelData: await toBase64(e.target.files[0]),
    })
  }
  const handleDeleteLabel = () => {
    setFormValues({
      ...formValues,
      labelData: '',
    })
  }
  const onButtonClick = () => {
    // `current` points to the mounted file input element
    inputOpenFileRef.current.click()
  }
  const labelUploadContent = (
    <StyledGrid item xs={12} alignItems="center">
      <label htmlFor="icon-button-photo">
        <input
          ref={inputOpenFileRef}
          type="file"
          style={{ display: 'none' }}
          onChange={handleCapture}
        />

        <IconButton color="primary" component="span" onClick={onButtonClick}>
          <img src={CloudUploadIcon} alt="Upload" />
        </IconButton>
      </label>
    </StyledGrid>
  )
  let labelShow = labelUploadContent
  if (formValues.labelData !== '') {
    labelShow = (
      <StyledLabelContainer>
        <StyledIcon
          icon="cancellationsPurple"
          width={25}
          height={25}
          onClick={handleDeleteLabel}
        />
        <img src={formValues.labelData} alt="LABEL" />
      </StyledLabelContainer>
    )
  } else {
    labelShow = labelUploadContent
  }

  return (
    <FullfillSteps>
      <StyledSubTitle>Add Label Details</StyledSubTitle>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {labelShow}
        </Grid>
        <Grid item xs={12}>
          <StyledFormControl variant="outlined">
            <StyledSelect
              error={formErrors.carrierError}
              labelId="carrier"
              id="carrier"
              value={formValues.carrier}
              displayEmpty
              onChange={handleChangeCarrier()}
              placeholder=""
            >
              <MenuItem value="" disabled>
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
          <StyledFormControl variant="outlined">
            <StyledTextField
              id="tracking"
              placeholder="Tracking Number"
              variant="outlined"
              value={formValues.tracking}
              error={formErrors.trackingError}
              onChange={handleChange('tracking')}
            />
          </StyledFormControl>
        </Grid>
      </Grid>
    </FullfillSteps>
  )
}

AddLabelDetails.propTypes = {
  setShippingIndData: func,
  order: object,
}
export default injectIntl(withRouter(AddLabelDetails))
