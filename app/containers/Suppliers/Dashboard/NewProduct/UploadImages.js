import PropTypes from 'prop-types'
import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components'
import { useDropzone } from 'react-dropzone'
import { LightText } from 'components/Suppliers/Dashboard/LightText'
import PromptConfirmModal from 'components/Suppliers/Dashboard/Modals/PromptConfirmModal'
import closeCircle from '../../../../assets/images/icons/closeCircle.svg'
import media from '../../../../assets/images/icons/media.svg'


const ImageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: no-wrap;
  overflow-x: auto;
  overflow-y: hidden;
`
const ProductImageContainer = styled.div`
  width: 190px;
  height: 190px;
  background: ${({ theme }) => theme.colors.homiGrey};
  border-radius: 10px;
  margin: 20px;
  position: relative;
`
const ProductImage = styled.img`
  width: 190px;
  height: 190px;
  border-radius: 10px;
  object-fit: cover;
`
const DeleteButton = styled.div`
  display: grid;
  cursor: pointer;
  position: absolute;
  right: -35px;
  top: -30px;
`

const Text = styled(LightText)`
  color: #313334;
`

const CenterElements = styled.div`
  display: flex;
  justify-content: center;
  align-items: baseline;
`

const DropContainer = styled.div`
  margin-bottom: 15px;
  width: 370px;
  height: 400px;
  text-align: center;
  cursor: pointer;
  border: 2px solid #969696;
  border-radius: 10px;
`
const BoldText = styled.div`
  font-size: 20px;
  font-weight: bold;
`

const Span = styled.span`
  color: ${({ theme }) => theme.colors.homiPrimary};
  text-decoration: underline;
`

const Img = styled.img`
  margin: auto;
  margin-top: 50px;
  width: 180px;
  height: 180px;
`
const UploadImages = ({ images, onSelectImage, onDeleteImage }) => {
  const imageSelectorRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)

  const renderContent = () => {
    let icon
    return {
      confirmationTitle: 'Files not accepted',
      confirmationDesc: 'Please only use JPEG and PNG files and lower than 5mb.',
      icon,
      onClose: () => setIsOpen(false),
    }
  }
  const content = renderContent()

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/jpeg, image/png',
    maxSize: 5242880,
    onDropRejected: () =>{
      setIsOpen(true)
    },
    onDrop: acceptedFiles => {
      const uploadedImage = acceptedFiles.map(file =>
        Object.assign(file, {
          urlImage: URL.createObjectURL(file),
        })
      )
      onSelectImage(uploadedImage)
    },
  })

  const myOnClose = () => {
    setIsOpen(false)
  }

  useEffect(() => {
    if(imageSelectorRef && imageSelectorRef.current) {
      // scroll all the way to the right to show the latest image
      imageSelectorRef.current.scrollTo(window.outerWidth, 0)
    }
  }, [images])

  return (
    <>
      <CenterElements>
        <DropContainer {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <Img
            src={media} />
          <BoldText>Drag and Drop or <Span>Browse</Span></BoldText>
          <Text
            text="
            Upload up to 10 photos of what you are selling.
            Images must be in PNG or JPG format and under 5MB "
          />
        </DropContainer>
      </CenterElements>
      <ImageWrapper ref={imageSelectorRef}>
        {images.length > 0 &&
          images.map(image => (
            <React.Fragment key={image.urlImage}>
              <ProductImageContainer>
                <DeleteButton onClick={() => onDeleteImage(image)}>
                  <img src={closeCircle} alt="" />
                </DeleteButton>
                <ProductImage src={image.urlImage} alt={image.id} />
              </ProductImageContainer>
            </React.Fragment>
          ))}
      </ImageWrapper>
      <PromptConfirmModal
        showError
        isOpen={isOpen}
        onClose={myOnClose}
        errorMessage='Please only use JPEG and PNG files and lower than 5mb.'
        {...content}
      />
    </>
  )
}

UploadImages.propTypes = {
  images: PropTypes.array,
  onDeleteImage: PropTypes.func.isRequired,
  onSelectImage: PropTypes.func.isRequired,
}

export default UploadImages
