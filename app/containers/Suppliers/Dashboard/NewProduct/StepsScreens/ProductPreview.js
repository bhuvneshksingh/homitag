import React, { Fragment } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { func, object, array } from 'prop-types'
import { getShippingCost } from '../../Inventory/Controllers/shippingCost'
import ProductDetailImages from '../../../../../components/Suppliers/Dashboard/Inventory/ProductDetail/ProductDetailImages'
import Label from '../../../../../components/Suppliers/Dashboard/Inventory/ProductDetail/Label'
import DimensionsLabel from '../../../../../components/Suppliers/Dashboard/Inventory/ProductDetail/DimensionsLabel'
import { PrimaryButton } from '../../../../../components/Common/Button'
import ProductStatus from '../../../../../components/Suppliers/Dashboard/Inventory/ProductDetail/ProductStatus'
import BackButton from './BackButton'
import closeCircle from '../../../../../assets/images/icons/closeCircle.svg'
import YesNoSwitch from '../../../../../components/Common/YesNoSwitch'
import PriceInput from '../../../../../components/Suppliers/Dashboard/PriceInput'
import InputNumber from '../../../../../components/Common/Form/Input/InputNumber'

const StyledTitle = styled.div`
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 25px;
`

const ProductContainer = styled.div`
  background: ${({ theme }) => theme.colors.homiBlack};
  padding-bottom: 40px;
  border-radius: 10px;
`

const CloseButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

const CloseButton = styled.div`
  &:hover {
    cursor: pointer;
  }
`

const ProductDetailHeader = styled.div`
  grid-row-gap: 5px;
  padding: 20px;
  padding-bottom: 0px;
`

const StyledText = styled.div`
  font-weight: 600;
  margin-bottom: 20px;
  color: white;
  font-size: 16px;
`

const ProductTitle = styled(StyledText)`
   text-align: center;
`
const Span = styled.span`
  font-weight: normal;
  font-size: 14px;
  margin-left: 15px;
`

const StyledHr = styled.hr`
 border: .5px solid #4D4A4A;
`
const ProductDetailBody = styled.div`
  display: grid;
  justify-items: center;
  margin-top: 20px;
`

const ProductDescriptionWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 50%);
  grid-row-gap: 20px;
  grid-column-gap: 20px;
  width: 50%;
`

const ProductDescriptionArea= styled.div`
  grid-column: 1 / span 2;
  justify-self: start;
  width: 100%;
`
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
  grid-column-gap: 20px;
`

const TaxWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 50%;
  margin-top: 20px;
`

const LightStyledText = styled(StyledText)`
  font-weight: normal;
`
const PriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const BoldText = styled.div`
    color: white;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: -15px;
`

const ProductPreview = ({
  handleGoBack,
  handleSubmit,
  product,
  productImages,
}) => (
  <Fragment>
    <CloseButtonContainer>
      <Link to="/suppliers/new-product">
        <CloseButton src={closeCircle} alt="" />
      </Link>
    </CloseButtonContainer>
    <BackButton title="Price + Quantity" onClick={handleGoBack} />
    <StyledTitle>Product Preview</StyledTitle>
    <ProductContainer>
      {product.id &&
        <ProductTitle style={{ textAlign: 'left', padding: 16, paddingBottom: 0, marginBottom: 0 }}>
          PRODUCT ID: <span style={{fontWeight: 'normal'}}>{product.Product.id}</span>
        </ProductTitle>
      }
      <ProductDetailHeader>
        <ProductTitle>{product.Product.title}</ProductTitle>
      </ProductDetailHeader>
      <StyledHr />
      <ProductDetailBody>
        <StyledText>
          STATUS:
          <Span>
            <ProductStatus status="Active" />
          </Span>
        </StyledText>
        <ProductDetailImages
          productImages={productImages}
          alt={product.Product.title}
        />
        <Wrapper>
          <PriceWrapper>
            <BoldText>Price</BoldText>
            <PriceInput
              type=''
              isWhite
              name='initialPrice'
              id="initialPrice"
              value={product.initialPrice}
              disabled
            />
          </PriceWrapper>
          <PriceWrapper>
            <BoldText>Shipping</BoldText>
            <InputNumber
              disabled
              isWhite
              id='availableQuantity'
              name='availableQuantity'
              value={getShippingCost(product)}
            />
          </PriceWrapper>
          <PriceWrapper>
            <BoldText>Quantity</BoldText>
            <InputNumber
              disabled
              isWhite
              id='availableQuantity'
              name='availableQuantity'
              value={product.availableQuantity}
            />
          </PriceWrapper>
        </Wrapper>
        <TaxWrapper>
          <LightStyledText>Tax Exempt Item</LightStyledText>
          <YesNoSwitch value={product.taxExempt} isWhite disabled/>
        </TaxWrapper>
        <ProductDescriptionWrapper>
          <Label text="Product Name" value={product.Product.title} disabled />
          <Label
            text="Product Conditions"
            value={product.ItemCondition.name}
            disabled
          />
          <ProductDescriptionArea>
            <Label
              text="Product Description"
              height="200px"
              value={product.Product.description}
              disabled
            />
          </ProductDescriptionArea>
          <Label
            text="Item Weight"
            value={product.Product.customProperties.weight}
            disabled
          />
          <DimensionsLabel
            text="Item Dimensions"
            length={product.Product.customProperties.length}
            width={product.Product.customProperties.width}
            height={product.Product.customProperties.height}
          />
          <Label
            text="Item Volume"
            value={product.Product.customProperties.volume}
            disabled
          />
          <Label
            text="Handling time in days"
            value={product.Product.customProperties.handledTime}
            disabled
          />
        </ProductDescriptionWrapper>
      </ProductDetailBody>
    </ProductContainer>
    <PrimaryButton type="submit" onClick={handleSubmit}>
      Post Product
    </PrimaryButton>
  </Fragment>
)

ProductPreview.propTypes = {
  handleGoBack: func,
  handleSubmit: func,
  product: object,
  productImages: array,
}
export default ProductPreview

