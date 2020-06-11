import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Formik } from 'formik'
import { Link } from 'react-router-dom'
import closeCircle from '../../../../../assets/images/icons/closeCircle.svg'
import WhiteLabel from '../../../../../components/Suppliers/Dashboard/Inventory/ShippingDetail/WhiteLabel'
import DimensionsInput from './DimensionsInput'
import {
  PrimaryButton,
  OutlinePrimaryButton,
} from '../../../../../components/Common/Button'
import BackButton from './BackButton'
import InputNumber from '../../../../../components/Common/Form/Input/InputNumber'
import TextArea from '../../../../../components/Suppliers/Dashboard/Inventory/ShippingDetail/TextArea'

const StyledTitle = styled.div`
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 25px;
`

const CloseButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`

const CloseButton = styled.img`
  &:hover {
    cursor: pointer;
  }
`
const ProductInformationContainer = styled.div`
  width: 80%;
  margin: auto;
`

const ProductMetaData = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 50%);
  grid-template-rows: repeat(2, 50%);
  grid-row-gap: 20px;
  grid-column-gap: 20px;
  padding-right: 20px;
`

const ProductInformation = ({ handleGoBack, onSubmit, product }) => {
  const requiredFields = ['name', 'description', 'weight']

  function validateInputs(values) {
    const errors = {}
    requiredFields.forEach(field => {
      if (
        values[field] === undefined ||
        values[field] === null ||
        values[field] === ''
      ) {
        errors[field] = `*${field} is required`
      }
    })
    const fieldsThatShouldBeMoreThanZero = [
      'weight',
      'volume',
      'length',
      'width',
      'height',
    ]
    fieldsThatShouldBeMoreThanZero.forEach(field => {
      if (values[field] < 0) {
        errors[field] = `*${field} should be more than 0`
      }
    })
    return errors
  }

  function isObjectEmpty(obj) {
    if (!obj) return true
    return Object.keys(obj).length === 0
  }

  function areSomePropertiesEmpty(obj, properties) {
    if (isObjectEmpty(obj)) return true
    return properties.some(
      prop => obj[prop] === null || obj[prop] === undefined || obj[prop] === ""
    );
  }


  return (
    <>
      <CloseButtonContainer>
        <Link to="/suppliers/new-product">
          <CloseButton src={closeCircle} alt="" />
        </Link>
      </CloseButtonContainer>
      <BackButton title="List New Item" onClick={handleGoBack} />
      <StyledTitle>Product Information</StyledTitle>
      <Formik
        validate={validateInputs}
        onSubmit={onSubmit}
        initialValues={{
          name: product && product.title,
          description: product && product.description,
          weight:
            product &&
            product.customProperties &&
            product.customProperties.weight,
          handledTime:
            product &&
            product.customProperties &&
            product.customProperties.handledTime,
          length:
            product &&
            product.customProperties &&
            product.customProperties.length,
          width:
            product &&
            product.customProperties &&
            product.customProperties.width,
          height:
            product &&
            product.customProperties &&
            product.customProperties.height,
          volume:
            product &&
            product.customProperties &&
            product.customProperties.volume,
        }}
      >
        {({
          values,
          handleSubmit,
          handleChange,
          errors,
          touched,
          setFieldValue,
        }) => (
          <ProductInformationContainer>
            <form onSubmit={handleSubmit}>
              <WhiteLabel
                error={touched.name && errors.name}
                text="Product Name"
                maxLength={40}
                placeholder="Name"
                id="name"
                value={values.name}
                onChange={handleChange}
              />
              <TextArea
                text="Product Description"
                placeholder="Description"
                maxLength={1500}
                height="200px"
                id="description"
                error={touched.description && errors.description}
                value={values.description}
                onChange={handleChange}
              />
              <ProductMetaData>
                <InputNumber
                  text="Item Weight"
                  placeholder="Weight"
                  id="weight"
                  value={values.weight}
                  error={touched.weight && errors.weight}
                  onChange={handleChange}
                />
                <DimensionsInput
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                  values={values}
                  touched={touched}
                  text="Item Dimensions"
                  errors={errors}
                />
                <InputNumber
                  id="volume"
                  name="volume"
                  value={values.volume || 'Volume'}
                  error={touched.volume && errors.volume}
                  disabled
                  text="Item Volume"
                  onChange={handleChange}
                  placeholder="Volume"
                />
                <InputNumber
                  id="handledTime"
                  value={values.handledTime}
                  error={touched.handledTime && errors.handledTime}
                  onChange={handleChange}
                  text="Handling time in days"
                  placeholder="Time in days"
                />
              </ProductMetaData>
              {Object.keys(errors).length > 0 || areSomePropertiesEmpty(values, requiredFields) ? (
                <OutlinePrimaryButton
                  disabled
                  type="submit"
                  subtitle="Price + Quantity"
                >
                  Next
                </OutlinePrimaryButton>
              ) : (
                <PrimaryButton type="submit" subtitle="Price + Quantity">
                  Next
                </PrimaryButton>
              )}
            </form>
          </ProductInformationContainer>
        )}
      </Formik>
    </>
  )
}
ProductInformation.propTypes = {
  handleGoBack: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  product: PropTypes.object,
}

export default ProductInformation
