import React from 'react'
import { injectIntl } from 'react-intl'
import { object, func } from 'prop-types'
import styled from 'styled-components'
import { Formik } from 'formik'
import { PrimaryButton } from '../../../../../Common/Button'
import messages from '../../../../../../containers/Suppliers/Dashboard/Orders/messages'
import WhiteLabel from './WhiteLabel'
import { StyledCheckbox } from '../../../../../Common/Form/Checkbox'

const StyledText = styled.p`
  font-weight: 600;
  font-size: 16px;
`
const StyledLightText = styled.p`
  font-weight: normal;
  font-size: 14px;
  color: #313334;
`

const DefaultWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`

const EditAddressForm = ({ intl, onSubmit, address }) => {
  const handleAddressSubmit = values => {
    onSubmit(values)
  }

  return (
    <Formik
      onSubmit={handleAddressSubmit}
      initialValues={
        address || {
          name: '',
          addressLine1: '',
          addressLine2: '',
          number: '',
          city: '',
          state: '',
          zipCode: '',
          defaultAddress: true,
        }
      }
    >
      {({ values, handleChange, handleSubmit, setFieldValue }) => (
        <form onSubmit={handleSubmit}>
          <StyledText>Your Address</StyledText>
          <WhiteLabel
            placeholder="Name"
            name="name"
            onChange={handleChange}
            value={values.name}
          />
          <WhiteLabel
            placeholder="Address line 1"
            name="addressLine1"
            onChange={handleChange}
            value={values.addressLine1}
          />
          <WhiteLabel
            placeholder="Address line 2"
            name="addressLine2"
            onChange={handleChange}
            value={values.addressLine2}
          />
          <WhiteLabel
            placeholder="Number"
            name="number"
            onChange={handleChange}
            value={values.number}
          />
          <WhiteLabel
            placeholder="City"
            name="city"
            onChange={handleChange}
            value={values.city}
          />
          <WhiteLabel
            placeholder="State"
            name="state"
            onChange={handleChange}
            value={values.state}
          />
          <WhiteLabel
            placeholder="ZIP Code"
            name="zipCode"
            onChange={handleChange}
            value={values.zipCode}
          />
          <DefaultWrapper>
            <StyledLightText>Set as Default</StyledLightText>
            <StyledCheckbox
              type="checkbox"
              name="defaultAddress"
              onClick={() => {
                setFieldValue('defaultAddress', !values.defaultAddress)
              }}
              checked={values.defaultAddress}
            />
          </DefaultWrapper>
          <PrimaryButton type="submit" style={{ marginTop: 36 }}>
            {intl.formatMessage(messages.saveChanges)}
          </PrimaryButton>
        </form>
      )}
    </Formik>
  )
}

EditAddressForm.propTypes = {
  intl: object,
  address: object,
  onSubmit: func,
}

export default injectIntl(EditAddressForm)
