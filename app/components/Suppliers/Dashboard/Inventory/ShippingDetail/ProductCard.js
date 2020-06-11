import React from 'react'
import styled from 'styled-components'
import { string, array} from 'prop-types'

const ProductCardContainer = styled.div`
  float: left;
  background: ${({ theme }) => theme.colors.homiBlack};
  padding-bottom: 40px;
  border-radius: 10px;
  height: 180px;
`
const ProductName = styled.div`
  color: #FFFFFF;
  font-weight: 600;
  font-size: 12px;
  padding: 20px;
`

const ProductImage = styled.div`
  margin-left: 20px;
  width: 80px;
  height: 80px;
  background: ${({ theme }) => theme.colors.homiGrey};
  border-radius: 10px;
  overflow: hidden;
  ::before {
    content: '';
  }
  img {
    width: 80px;
    height: 80px;
    object-fit: cover;
  }
`

const ProductCard = props =>{
  const displayImg = props.images && props.images.length > 0 ? <img src={props.images[0].urlImage} alt={props.name} /> : ''
  return(
    <ProductCardContainer>
      <ProductName>{props.name}</ProductName>
      <ProductImage>{displayImg}</ProductImage>
    </ProductCardContainer>
  )
}
ProductCard.propTypes = {
  name: string,
  images: array
}

export default ProductCard
