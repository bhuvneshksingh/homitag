import React from 'react'
import styled from 'styled-components'
import { array, string } from 'prop-types'

const ImagesDiv = styled.div`
   display: flex;
   margin-bottom: 20px;
`

const ImgWrapper = styled.div`
  margin-left: 20px;
  width: 140px;
  height: 140px;
  background: ${({ theme }) => theme.colors.homiGrey};
  border-radius: 10px;
  overflow: hidden;
  ::before {
    content: '';
  }
  img {
    width: 140px;
    height: 140px;
    object-fit: cover;
  }
`
const ProductDetailImages = ({ productImages, alt = "" }) => (
  <ImagesDiv>
    {productImages && productImages.length > 0 ? (
      productImages.map(image => (
        <ImgWrapper key={image.urlImage}>
          <img src={image.urlImage} alt={alt} />
        </ImgWrapper>
      ))
    ) : (
      <ImgWrapper key="">
        <img alt="" />
      </ImgWrapper>
    )}
  </ImagesDiv>
)


ProductDetailImages.propTypes = {
  productImages: array,
  alt: string,
}

export default  ProductDetailImages
