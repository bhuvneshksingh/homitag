import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { injectIntl } from 'react-intl'
import styled from 'styled-components'
import  { object } from 'prop-types'
import { editPost } from '../api'
import messages from '../messages'
import YesNoSwitch from '../../../../../components/Common/YesNoSwitch'
import { PrimaryButton } from '../../../../../components/Common/Button'
import ShippingLabel from '../../../../../components/Suppliers/Dashboard/Inventory/ProductDetail/ShippingLabel'
import Routes from '../../../Router/Routes.json'
import PromptConfirmModal from '../../../../../components/Suppliers/Dashboard/Modals/PromptConfirmModal'
import { getShippingCost } from '../Controllers/shippingCost'
import history from '../../../../../utils/history';
import PriceInput from '../../../../../components/Suppliers/Dashboard/PriceInput'
import InputNumber from '../../../../../components/Common/Form/Input/InputNumber'

const Form = styled.div`
  display: grid;
   width: 50%;
`
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
  grid-column-gap: 35px;
`

const TaxWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`
const StyledText = styled.div`
  font-weight: 600;
  margin-bottom: 20px;
  color: white;
  font-size: 16px;
`
const StyledLink = styled(Link)`
  text-decoration: none;
`

const LightStyledText = styled(StyledText)`
  font-weight: normal;
`
const PriceWrapper = styled.div`
  display: flex; 
  flex-direction: column;
`
const ValidationText = styled.p`
  color: red;
  font-size: 11px;
  margin-top: 5px;
  font-weight: bold;
`

const BoldText = styled.div`
    color: white;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: -15px;
`

const renderContent = () => {
  let icon
  return {
    confirmationTitle: 'Succesfully Edited!',
    confirmationDesc: 'Your product has been edited',
    icon,
    onClose: () => {history.push('/suppliers/inventory');
    },
  }
}

const ProductEditableForm = ({product, intl}) => {
  const content = renderContent('archive', 'edited', intl)
  const [isOpen, setIsOpen] = useState(false)
  const [isEdited, setIsEdited] = useState(false)
  const quantity = product.availableQuantity
  const [values, setValues] = useState({
    initialPrice: product.initialPrice,
    availableQuantity: quantity,
    taxExempt: product.taxExempt
  })

  const myOnClose = () => {
    setIsOpen(false)
  }
  const handleInputChange= (e) => {
    setIsEdited(true)
    const {name, value} = e.target
    setValues({...values, [name]: value})
  }

  const handleCheck = () => {
    setIsEdited(true)
    setValues({...values, taxExempt: !values.taxExempt})
  }

  const handleSubmit = () => {
    editPost(product.id, values.taxExempt, values.availableQuantity, values.initialPrice).then(res =>{
      setIsOpen(true)
      setIsEdited(false)
      return res
    })
  }
  const item = product
  const shippingCost = getShippingCost(item)
  const numberValidation = Number.isNaN(parseFloat(values.initialPrice))
  const decimalValidation = parseFloat(values.availableQuantity) % 1 !== 0

  return (
    <>
    <Form onSubmit={handleSubmit}>
      <Wrapper>
        <PriceWrapper>
          <BoldText>Price</BoldText>
          <PriceInput
            type=''
            isWhite
            name='initialPrice'
            id="initialPrice"
            value={values.initialPrice}
            onChange={e =>handleInputChange(e)}
          />
          {isEdited && numberValidation ? <ValidationText>Price must be a number</ValidationText> : ''}
        </PriceWrapper>
        <StyledLink to={`${Routes.Suppliers}/inventory/shipping/${product.id}`} >
          <ShippingLabel text='Shipping' shippingCost={shippingCost}/>
        </StyledLink>
        <PriceWrapper>
          <BoldText>Quantity</BoldText>
          <InputNumber
            isWhite
            id='availableQuantity'
            name='availableQuantity'
            value={values.availableQuantity}
            onChange={e =>handleInputChange(e)}
          />
          {isEdited && numberValidation || decimalValidation ? <ValidationText>Quantity must be a number and can not have decimals.</ValidationText> : ''}
        </PriceWrapper>
      </Wrapper>
      <TaxWrapper>
        <LightStyledText>Tax Exempt Item</LightStyledText>
        <YesNoSwitch value={values.taxExempt} isWhite onChange={handleCheck}/>
      </TaxWrapper>
      {isEdited ?  <PrimaryButton type='submit' onClick={() => handleSubmit()}>{intl.formatMessage(messages.saveChanges)}</PrimaryButton> : ''}
    </Form>
      <PromptConfirmModal
        isOpen={isOpen}
        onClose={myOnClose}
        showConfirmation
        {...content}
      />
    </>
  )
}

ProductEditableForm.propTypes = {
  product: object,
  intl: object
}

export default injectIntl(ProductEditableForm)
