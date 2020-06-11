import React, { useState } from 'react'
import { injectIntl } from 'react-intl'
import styled from 'styled-components'
import {object, func, bool} from 'prop-types'
import { Dialog, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'
import { PrimaryButton } from '../../../Common/Button'
import messages from '../../../../containers/Suppliers/Dashboard/Inventory/messages'
import closeIcon from '../../../../assets/images/icons/close.svg'
import whiteClose from '../../../../assets/images/icons/whiteClose.png'
import cloud from '../../../../assets/images/icons/cloud.png'
import { deleteProductPhotos, addProductPhotos } from '../../../../containers/Suppliers/Dashboard/Inventory/api'

const StyledDialog = styled(Dialog)`
  margin: auto;
  .MuiPaper-rounded {
    border-radius: 10px;
  }
  .MuiDialogContent-root:first-child {
    padding: 30px 60px 30px 60px;
}
  .MuiDialogTitle-root {
    text-align: center;
    margin-top: -30px;
  }
  .MuiTypography-body1 {
    color: #969696;
    font-size: 14px;
    line-height: 22px;
    padding: 20px;
  }
`

const SaveChangesButton = styled(PrimaryButton)`
  width: 100%;
`
const ImageWrapper = styled.div`
 display: flex;
 flex-direction: row;
 flex-wrap: wrap;
`
const ProductImageContainer = styled.div`
  width: 190px;
  height: 190px;
  background: ${({ theme }) => theme.colors.homiGrey};
  border-radius: 10px;
  margin: 20px;
  ::before {
    content: '';
  }
`
const ProductImage = styled.img`
  width: 190px;
  height: 190px;
  border-radius: 10px;
  object-fit: cover;
`
const CloseButton= styled.div`
  width: 20px;
  height: 20px;
  float: right;
  align-self: flex-end;
  margin: 20px;
  &:hover {
    cursor: pointer; 
   }
`
const DeleteButton = styled.div`
  display: grid;
  background: #7471FF;
  width: 40px;
  height: 40px;
  border-radius: 50px;
  padding: 12px 11px 0 12px;
  cursor: pointer;
`
const DeleteWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: -40px;
  position: relative;
  z-index: 1000;
`

const ImageUploader = styled.input`
  opacity: 0;
  position: absolute;
  pointer-events: none;
  width: 1px;
  height: 1px;
`

const CustomImageUploader= styled.label`
  border: 2px dashed #DADADA;
  height: 100px;
  width: 100%;
`

const ImageUploaderContent = styled.div`
    display: flex;
    justify-content: space-around;
    padding: 40px;
`

const ImageUploaderText = styled.p`
  font-weight: 600;
  font-size: 20px;
`

const Cloud = styled.img`
  margin-top: -25px;
`

const EditPhotosModal = ( {product, intl, isOpen, onClose, onSave}) => {
  const productImages = product.Product.ProductImages
  const [images, setImages] = useState(product.Product.ProductImages)
  const [imgFile, setImgFile] = useState(null)

  const deleteImage = image => {
    const editedImages = images.filter( img => img.urlImage !== image.urlImage )
    setImages(editedImages)
  }

  const handleClose = () => {
    setImages(product.Product.ProductImages)
    onClose()
  }

  const handleUpload = event => {
    const file = event.target.files[0]
    setImgFile(file)
    const uploadedImage = Object.assign(file, {
      urlImage: URL.createObjectURL(file)
    })
    setImages([ ...images, {urlImage : uploadedImage.urlImage, name: uploadedImage.name }])
    // target.value = null
  }


  const handleSave = event => {
    event.preventDefault()
    const postId = product.Product.id

    productImages.forEach( productImage => {
      const both = images.filter(image => image.urlImage === productImage.urlImage)
      if(both.length === 0){
        deleteProductPhotos(postId, productImage.id).then(res => {
          if(res.status === 200){
            alert('Image Deleted')
            onSave()
          }else(alert('Please try again something went wrong'))
        })
      }
    })

    images.forEach(image => {
      const both = productImages.filter(productImage => image.urlImage === productImage.urlImage)
      if(both.length === 0){
        const formData = new FormData()
        formData.append('productImage',imgFile)
        const config = {
          headers: {
            'content-type': 'multipart/form-data'
          }
        }
        addProductPhotos(postId, formData , config).then(res =>{
          if(res.status === 200 && res.data.data){
            alert('Image Uploaded')
            onSave()
          }else(alert('Please try again, we could not upload the image'))
        })
      }
    })
    onClose()
  }

  return(
    <StyledDialog open={isOpen}>
      <CloseButton onClick={() => handleClose()}><img src={closeIcon} alt=''/></CloseButton>
      <DialogContent>
        <DialogTitle>{intl.formatMessage(messages.editPhotos)}</DialogTitle>
        <DialogContentText>
          {intl.formatMessage(messages.editPhotosDesc)}
        </DialogContentText>
        <ImageWrapper>
          {images.length && images.map(image =>
            <div>
              <DeleteWrapper>
                <DeleteButton onClick={ () => deleteImage(image)}>
                  <img src={whiteClose} alt=''/>
                </DeleteButton>
              </DeleteWrapper>
              <ProductImageContainer>
                <ProductImage src={image.urlImage} alt={image.id} />
              </ProductImageContainer>
            </div>
          )}
        </ImageWrapper>
        <ImageUploader type='file' accept='image/png, image/jpeg' id='imageUploader' onChange={handleUpload} />
        <CustomImageUploader htmlFor='imageUploader'>
          <ImageUploaderContent>
            <ImageUploaderText>Upload New</ImageUploaderText>
            <Cloud src={cloud} alt=''/>
          </ImageUploaderContent>
        </CustomImageUploader>
        <form onSubmit={handleSave}>
          <SaveChangesButton type='submit' >{intl.formatMessage(messages.saveChanges)}</SaveChangesButton>
        </form>
      </DialogContent>
    </StyledDialog>
  )

}

EditPhotosModal.propTypes = {
  product: object,
  intl: object,
  isOpen: bool,
  onClose: func,
  onSave: func
}

export default injectIntl(EditPhotosModal)
