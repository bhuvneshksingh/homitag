import React, { Fragment, useState, useEffect } from 'react'
import { injectIntl } from 'react-intl'
import styled from 'styled-components'
import Icon from 'components/Common/Icon'
import { format, parseISO } from 'date-fns'
import { object } from 'prop-types'
import { getProductDetail, editPricePost } from '../api'
import Loading from '../../../../../components/Common/Loading'
import ArrowBackButton from '../../../../../components/Common/ArrowBackButton'
import ProductDetailImages from '../../../../../components/Suppliers/Dashboard/Inventory/ProductDetail/ProductDetailImages'
import Label from '../../../../../components/Suppliers/Dashboard/Inventory/ProductDetail/Label'
import DimensionsLabel from '../../../../../components/Suppliers/Dashboard/Inventory/ProductDetail/DimensionsLabel'
import { PrimaryButton } from '../../../../../components/Common/Button'
import messages from '../../Main/messages'
import ActionButton from '../../../../../components/Common/ActionButton'
import ProductStatus from '../../../../../components/Suppliers/Dashboard/Inventory/ProductDetail/ProductStatus'
import EditPhotosModal from '../../../../../components/Suppliers/Dashboard/Modals/EditPhotosModal'
import history from '../../../../../utils/history'
import ProductEditableForm from './ProductEditableForm'
import ProductRangeModal from './ProductRangeModal'
import MatchLowestPriceModal from '../../../../../components/Suppliers/Dashboard/Modals/MatchLowestPriceModal'

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

const ProductDetailHeader = styled.div`
  display: grid;
  grid-template-columns: 30% 40% auto;
  grid-template-rows: repeat(2, 50%);
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

const ProductSku = styled(StyledText)`
  text-align: start;
`
/* const LowestPrice = styled(StyledText)`
  text-align: center;
` */

const Span = styled.span`
  font-weight: normal;
  font-size: 14px;
  margin-left: 15px;
`
const DottedButton = styled(StyledText)`
  grid-column: 3 / span 2;
  grid-row-start: 1;
  grid-row-end: 3;
  justify-self: end;
  margin-top: auto;
  margin-bottom: auto;
`

const StyledHr = styled.hr`
  border: 0.5px solid #4d4a4a;
`
const ProductDetailBody = styled.div`
  display: grid;
  justify-items: center;
  margin-top: 20px;
`
const EditPhotosButton = styled(PrimaryButton)`
  width: 50%;
  margin-top: 20px;
`

const DateWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 50%);
  width: 50%;
  margin-top: 20px;
`
const LastUpdate = styled(StyledText)`
  justify-self: end;
`

const ProductDescriptionWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 50%);
  grid-row-gap: 20px;
  grid-column-gap: 20px;
  width: 50%;
`

const LowestPriceWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.homiCompOne};
  text-decoration: underline;
  cursor: pointer;
  text-align: center;
  font-weight: 600;
  font-size: 16px;
`

const ProductDescriptionArea = styled.div`
  grid-column: 1 / span 2;
  justify-self: start;
  width: 100%;
`
const StyledBadgeIcon = styled(Icon).attrs(props => ({
  color: props.theme.colors.homiCompOne,
}))``

const ProductDetail = ({ intl, match }) => {
  const [showProductRangeModal, setShowProductRangeModal] = useState(false)
  const [showMatchLowestPriceModal, setShowMatchLowestPriceModal] = useState(
    false
  )
  const [product, setProduct] = useState({})
  const [loading, setLoading] = useState(false)
  const canEditPhotos = false
  const [openPhotosModal, setOpenPhotosModal] = useState(false)
  const productId = match.params.id
  const productTitle = product.title ? product.title.toUpperCase() : 'No title'

  const handlePhotosModal = () => {
    setOpenPhotosModal(false)
  }
  const getList = () => {
    setLoading(true)
    getProductDetail(productId)
      .then(res => {
        setProduct(res.data.data)
      })
      .catch(e => {
        // console.log(`Error + ${e.response.data.error}`)
        if (e.response.data.error === 'Post not found') {
          history.push('/suppliers/inventory')
        }
      })
      .finally(() => setLoading(false))
  }
  useEffect(() => {
    getList()
  }, [])

  if (loading) return <Loading pageLoading transparent size={60} />
  if (product && product.id) {
    const volume = product.Product.customProperties.length
      ? product.Product.customProperties.length *
        product.Product.customProperties.width *
        product.Product.customProperties.height
      : ''

    let statusName = product.PostStatus.name
    if (product.PostStatus.name === 'Soldout') {
      statusName = 'Inactive (Sold out)'
    } else if (product.PostStatus.name === 'Blocked') {
      statusName = 'Inactive (Blocked)'
    } else if (product.PostStatus.name === 'Draft') {
      statusName = 'Inactive (Draft)'
    }

    const closeProductRangeModal = () => setShowProductRangeModal(false)
    const openProductRangeModal = () => setShowProductRangeModal(true)
    const closeMatchLowestPriceModal = () => setShowMatchLowestPriceModal(false)
    const openMatchLowestPriceModal = () => setShowMatchLowestPriceModal(true)

    return (
      <Fragment>
        <ArrowBackButton title="Inventory" backRoute="/suppliers/inventory" />
        <StyledTitle>Product</StyledTitle>
        <ProductContainer>
          <ProductDetailHeader>
            <StyledText>
              PRODUCT ID: <Span>{` ${product.Product.id}`} </Span>
            </StyledText>
            <ProductTitle>{productTitle}</ProductTitle>
            <DottedButton>
              <ActionButton
                id={product.id}
                boost={product.boost}
                archived={product.archived}
                productStatus={product.PostStatus.name}
                onConfirmed={getList}
              />
            </DottedButton>
            <ProductSku>
              SKU: <Span>{` ${product.sku}`}</Span>
            </ProductSku>
            <LowestPriceWrapper onClick={openProductRangeModal}>
              {product.lowestPrice ? <StyledBadgeIcon icon="percentBadge" /> : null}
              <span style={{ marginRight: 8 }}>
                {product.lowestPrice ? 'Lowest Price' : 'See Price Range'}
              </span>
            </LowestPriceWrapper>
            <ProductRangeModal
              product={product}
              onClose={closeProductRangeModal}
              onSubmit={price => {
                editPricePost(product.id, price)
                  .then(closeProductRangeModal)
                  .then(getList)
                  .then(openMatchLowestPriceModal)
              }}
              isOpen={showProductRangeModal}
            />
            <MatchLowestPriceModal
              isOpen={showMatchLowestPriceModal}
              onClose={closeMatchLowestPriceModal}
            />
          </ProductDetailHeader>
          <StyledHr />
          <ProductDetailBody>
            <StyledText>
              STATUS:
              <Span>
                <ProductStatus status={statusName} />
              </Span>
            </StyledText>
            <ProductDetailImages productImages={product.Product.ProductImages} />
            {canEditPhotos && (
              <EditPhotosButton onClick={() => setOpenPhotosModal(true)}>
                {intl.formatMessage(messages.editPhotos)}
              </EditPhotosButton>
            )}
            <EditPhotosModal
              product={product}
              isOpen={openPhotosModal}
              onClose={handlePhotosModal}
              onSave={getList}
            />
            <DateWrapper>
              <StyledText>
                Date Posted:{' '}
                <Span>
                  {format(parseISO(product.createdAt), 'dd/MM/yy hh:mm:ss')}{' '}
                </Span>
              </StyledText>
              <LastUpdate>
                Last Update:{' '}
                <Span>
                  {' '}
                  {format(parseISO(product.updatedAt), 'dd/MM/yy hh:mm:ss')}
                </Span>
              </LastUpdate>
            </DateWrapper>
            <ProductEditableForm product={product} />
            <ProductDescriptionWrapper>
              <Label text="Product Name" value={product.title} disabled />
              <Label
                text="Product Conditions"
                value={product.ItemCondition.name}
                disabled
              />
              <ProductDescriptionArea>
                <Label
                  text="Product Description"
                  height="200px"
                  value={product.description}
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
              <Label text="Item Volume" value={volume} disabled />
            </ProductDescriptionWrapper>
          </ProductDetailBody>
        </ProductContainer>
      </Fragment>
    )
  }
  return <></>
}

ProductDetail.propTypes = {
  match: object,
  intl: object,
}
export default injectIntl(ProductDetail)
