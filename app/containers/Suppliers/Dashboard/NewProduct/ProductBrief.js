import React from 'react'
import styled from 'styled-components'
import {arr} from 'prop-types'
import { Link } from 'react-router-dom'
import ProductDetailImages
  from '../../../../components/Suppliers/Dashboard/Inventory/ProductDetail/ProductDetailImages'
import { PrimaryButton, OutlinePrimaryButton } from '../../../../components/Common/Button'

const ProductContainer = styled.div`
  background: ${({ theme }) => theme.colors.homiBlack};
  padding-bottom: 30px;
  border-radius: 10px;
  margin: auto;
  margin-top: 20px;
  width: 80%;
`
const ProductDetailHeader = styled.div`
  display: flex;
  flex-direction: column;
  grid-template-rows: repeat(2, 50%);
  grid-row-gap: 5px;
  padding: 20px;
  padding-bottom: 0px;
  border-bottom: 1px solid #4D4A4A;
  margin-bottom: 20px;
`

const ProductNameContainer = styled.div`
  width: 50%;
  margin: auto;
  text-align: center;
  padding: 20px;
  padding-bottom: 10px;
`
const StyledText = styled.div`
  font-weight: 600;
  margin-bottom: 20px;
  color: white;
  font-size: 16px;
`

const LightText = styled(StyledText)`
  font-weight: normal;
  padding: 20px 50px 20px 50px;
  margin-bottom: 0;
`
const Span = styled.span`
  font-weight: normal;
  font-size: 14px;
  margin-left: 15px;
`

const ImagesContainer = styled.div`
  display: grid;
  justify-items: center;
  margin-top: 10px;
  overflow-x: auto;
  overflow-y: hidden;
  width: 95%;
  margin: auto;
`
const ButtonsContainer = styled.div`
  display: grid;
  grid-template-columns: auto 5% auto;
  padding-bottom: 40px;
  border-radius: 10px;
  margin: auto;
  width: 80%;
`
const ButtonContainer = styled.div`
  margin-left: 0 !important;
`

const StyledLink = styled(Link)`
  width: 100%;
  text-decoration: none;
`
const LightTextDescription = styled(LightText)`
    padding-bottom: 0;
    margin-bottom: 10px;
    overflow: hidden;
`

const Title = styled(StyledText)`
    margin-bottom: 0;
`
const ProductBrief = (props) =>{
  const product = props.product[0] || props.product
  const productTitle = product.title ? product.title.toUpperCase() : 'No title'

  return (
    <>
      <ProductContainer>
        <ProductDetailHeader>
          <StyledText>
            PRODUCT ID: <Span>{` ${product.Product.id}`} </Span>
          </StyledText>
          <StyledText>
            SKU: <Span>{` ${product.Product.id}`} </Span>
          </StyledText>
        </ProductDetailHeader>
        <ProductNameContainer>
          <Title>{productTitle}</Title>
        </ProductNameContainer>
        <ImagesContainer>
          <ProductDetailImages productImages={product.Product.ProductImages} />
        </ImagesContainer>
        <LightTextDescription>{product.description}</LightTextDescription>
      </ProductContainer>
      <ButtonsContainer>
        <StyledLink to="new-product/add">
          <ButtonContainer style={{marginLeft: '20px'}}>
            <OutlinePrimaryButton>Not My Product</OutlinePrimaryButton>
          </ButtonContainer>
        </StyledLink>
        <div></div>
        <StyledLink to={`new-product/add/${props.product.id}`}>
          <ButtonContainer>
            <PrimaryButton>Add To Listing</PrimaryButton>
          </ButtonContainer>
        </StyledLink>
      </ButtonsContainer>
    </>
  )
}

ProductBrief.propTypes={
  product: arr
}
export default ProductBrief
