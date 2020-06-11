import React from 'react'
import styled from 'styled-components'
import { object, number, bool} from 'prop-types'

const ImagesDiv = styled.div`
   display: flex;
`

const ImgWrapper = styled.div`
  margin-left: 0px;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  background: ${({ theme }) => theme.colors.homiGrey};
  border-radius: ${props => props.rounded ? '50px' : "10px"};
  overflow: hidden;
  ::before {
    content: '';
  }
  img {
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    object-fit: cover;
  }
`
const ProductDetailImages = props => {
  const {product} = props
  let productImage
  if (product.ProductImages) {
    productImage = <ImgWrapper width={props.width} height={props.height} rounded={props.rounded}>
      {product.ProductImages.map(image =>
        <img src={image.urlImage} alt={product.title} key={toString(image.urlImage)}/>
      )}
    </ImgWrapper>
  }else{
    productImage = <ImgWrapper width={props.width} height={props.height}/>
  }
  return(
    <ImagesDiv style={props.style}>
      {productImage}
    </ImagesDiv>
  )
}


ProductDetailImages.propTypes = {
  product: object,
  width: number,
  height: number,
  rounded: bool,
  style: object
}

export default  ProductDetailImages
