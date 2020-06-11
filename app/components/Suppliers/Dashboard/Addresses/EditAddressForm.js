import React, { useState } from 'react'
import { injectIntl } from 'react-intl'
import { object, func } from 'prop-types'
import styled from 'styled-components'
import Autocomplete from 'react-google-autocomplete'
import { Checkbox } from '@material-ui/core'
import { PrimaryButton, DangerButton } from '../../../Common/Button'
import messages from '../../../../containers/Suppliers/Dashboard/Orders/messages'
import WhiteLabel from './WhiteLabel'

const StyledText = styled.p`
  font-weight: 600;
  font-size: 16px;
`
const StyledTextError = styled.p`
  font-weight: 800;
  font-size: 16px;
  color: red;
  margin-bottom: 20px;
`
const StyledLightText = styled.p`
  font-weight: normal;
  font-size: 14px;
  color: #313334;
  align-self: center;
`

const AutocompleteWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  height: 50px;
  color: #969696;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 20px;
  && input {
    font-size: 16px;
    color: ${({ theme }) => theme.colors.homiBlack};
  }
  && input::placeholder {
    color: #ccc;
  }
`
const DefaultWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0px;
`
const StyledCheckbox = styled(Checkbox)`
  && .Mui-checked {
    color: #000;
  }
`

const EditAddressForm = ({ intl, onSubmit, address, handleDelete }) => {
  const [error, setError] = useState({})
  const defaultAddress = {
    name: '',
    addressLine1: '',
    city: '',
    state: '',
    zipCode: '',
    defaultAddress: false,
  }

  const [input, setInput] = useState({ ...defaultAddress, ...address })

  function validateInputs() {
    const errors = {
      name: '',
      address: '',
    }

    if (input.name === '') {
      errors.name = `Please enter a name for your address`
    } else {
      errors.name = ''
    }
    if (
      input.addressLine1 === '' ||
      input.city === '' ||
      input.zipCode === '' ||
      input.state === ''
    ) {
      errors.address = `Please enter a valid address`
    } else {
      errors.address = ''
    }

    if (errors.name !== '' || errors.address !== '') {
      setError({
        name: errors.name,
        address: errors.address,
      })
      return false
    }
    return true
  }

  const handleFoundAddress = place => {
    setError({})
    const ComponentsByType = {}
    for (let i = 0; i < place.address_components.length; i += 1) {
      const c = place.address_components[i]
      ComponentsByType[c.types[0]] = c
    }
    const city = ComponentsByType.locality
      ? `${ComponentsByType.locality.long_name}`
      : `${ComponentsByType.administrative_area_level_2.long_name}`
    setInput({
      ...input,
      addressLine1: `${ComponentsByType.street_number.short_name} ${
        ComponentsByType.route.short_name
      }`,
      city: `${city}`,
      state: `${ComponentsByType.administrative_area_level_1.short_name}`,
      zipCode: `${ComponentsByType.postal_code.long_name}`,
      country: `${ComponentsByType.country.short_name}`,
    })
  }

  const handleInputChange = e => {
    setError({})

    setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value,
    })
  }

  const handleAddressSubmit = () => {
    if (validateInputs()) {
      onSubmit(input)
    }
  }

  const handleDefaultChange = () => {
    setInput({ ...input, defaultAddress: !input.defaultAddress })
  }

  let deleteButton = ''

  if (Object.keys(address).length !== 0) {
    deleteButton = (
      <DangerButton onClick={() => handleDelete()}>
        {intl.formatMessage(messages.deleteRecord)}
      </DangerButton>
    )
  }

  const AddressfromEdit =
    Object.keys(address).length > 0
      ? `${address.addressLine1} ${address.city} ${address.state}`
      : 'Address'

  return (
    <>
      <StyledText>Your Address</StyledText>
      <WhiteLabel
        placeholder="Name"
        id="name"
        name="name"
        onChange={handleInputChange}
        value={input.name}
      />
      <StyledTextError>{error.name}</StyledTextError>

      <AutocompleteWrapper>
        <Autocomplete
          style={{ width: '90%' }}
          onPlaceSelected={place => {
            handleFoundAddress(place)
          }}
          types={['address']}
          componentRestrictions={{ country: 'us' }}
          placeholder={AddressfromEdit}
        />
      </AutocompleteWrapper>
      <StyledTextError>{error.address}</StyledTextError>

      <DefaultWrapper>
        <StyledLightText>Set as Default</StyledLightText>
        <StyledCheckbox
          value="defaultAddress"
          checked={input.defaultAddress}
          onClick={handleDefaultChange}
          color="primary"
        />
      </DefaultWrapper>
      <PrimaryButton type="submit" onClick={handleAddressSubmit}>
        {intl.formatMessage(messages.saveChanges)}
      </PrimaryButton>
      {deleteButton}
    </>
  )
}

EditAddressForm.propTypes = {
  intl: object,
  address: object,
  onSubmit: func,
  handleDelete: func,
}

export default injectIntl(EditAddressForm)
