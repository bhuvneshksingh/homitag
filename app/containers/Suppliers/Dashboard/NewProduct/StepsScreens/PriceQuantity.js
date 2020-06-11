import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { func, string, array } from 'prop-types'
import { Link } from 'react-router-dom'
import { Formik } from 'formik'
import ProductCard from '../../../../../components/Suppliers/Dashboard/Inventory/ShippingDetail/ProductCard'
import YesNoSwitch from '../../../../../components/Common/YesNoSwitch'
import {
  PrimaryButton,
  OutlinePrimaryButton,
} from '../../../../../components/Common/Button'
import BackButton from './BackButton'
import closeCircle from '../../../../../assets/images/icons/closeCircle.svg'
import { getProductPriceRange } from '../../Inventory/api'
import PriceRange from './PriceRange'
import InputNumber from '../../../../../components/Common/Form/Input/InputNumber'
import PriceInput from '../../../../../components/Suppliers/Dashboard/PriceInput'

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 18% 70% 10%;
`
const StyledTitle = styled.div`
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 25px;
`

const CloseButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

const LightText = styled.p`
  font-size: 16px;
  color: #969696;
  margin-bottom: 10px;
`

const CloseButton = styled.div`
  &:hover {
    cursor: pointer;
  }
`

const PriceQuantityContainer = styled.div`
  width: 80%;
  margin: auto;
`
const InputsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 50%);
  grid-column-gap: 20px;
`
const TaxWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

const PriceQuantity = ({
  handleGoBack,
  onSubmit,
  productId,
  productName,
  initialPrice,
  productImages,
  quantityForSale,
  taxExempt,
}) => {
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  function validateInputs(values) {
    const errors = {}
    const requiredFields = ['initialPrice', 'quantityForSale']
    requiredFields.forEach(field => {
      if (!values[field]) {
        errors[field] = `*${field} is required`
      }
    })
    return errors
  }

  const getProductRange = id => {
    getProductPriceRange(id)
      .then(res => {
        setMaxPrice(res.data.maxPrice)
        setMinPrice(res.data.minPrice)
      })
      .catch(e => {
        console.log(`Error + ${e.response.data.error}`)
      })
  }
  useEffect(() => {
    if (productId && productId !== undefined) {
      getProductRange(productId)
    }
  }, [productId])

  return (
    <>
      <CloseButtonContainer>
        <Link to="/suppliers/new-product">
          <CloseButton src={closeCircle} alt="" />
        </Link>
      </CloseButtonContainer>
      {!productId && (
        <BackButton title="Product Information" onClick={handleGoBack} />
      )}
      <StyledTitle>Price + Quantity</StyledTitle>
      <Formik
        validate={validateInputs}
        onSubmit={onSubmit}
        initialValues={{
          initialPrice,
          quantityForSale,
          taxExempt,
        }}
      >
        {({ values, handleSubmit, handleChange, errors, touched }) => (
          <ContentWrapper>
            <ProductCard name={productName} images={productImages} />
            <form onSubmit={handleSubmit}>
              <PriceQuantityContainer>
                <InputsWrapper>
                  <PriceInput
                    text="Price per item $"
                    id="initialPrice"
                    error={touched.initialPrice && errors.initialPrice}
                    value={values.initialPrice}
                    onChange={handleChange}
                    placeholder=""
                  />
                  <InputNumber
                    text="Quantity for sale"
                    id="quantityForSale"
                    name="quantityForSale"
                    error={touched.quantityForSale && errors.quantityForSale}
                    value={values.quantityForSale}
                    onChange={handleChange}
                    placeholder=""
                  />
                </InputsWrapper>
                <TaxWrapper>
                  <LightText>Tax Exempt Item</LightText>
                  <YesNoSwitch
                    value={values.taxExempt}
                    name="taxExempt"
                    id="taxExempt"
                    onChange={handleChange}
                  />
                </TaxWrapper>
                {productId && (
                  <PriceRange
                    initialPrice={values.initialPrice || ''}
                    min={minPrice}
                    max={maxPrice}
                    name="initialPrice"
                    id="initialPrice"
                    onChange={handleChange}
                  />
                )}
                {!values.initialPrice || !values.quantityForSale ? (
                  <OutlinePrimaryButton disabled subtitle="Product Details">
                    Next
                  </OutlinePrimaryButton>
                ) : (
                  <PrimaryButton type="submit" subtitle="Delivery Method">
                    Next
                  </PrimaryButton>
                )}
              </PriceQuantityContainer>
            </form>
          </ContentWrapper>
        )}
      </Formik>
    </>
  )
}

PriceQuantity.propTypes = {
  handleGoBack: func,
  onSubmit: func,
  initialPrice: string,
  productImages: array,
  productName: string,
  productId: string,
  quantityForSale: string,
  taxExempt: string,
}

export default PriceQuantity
