import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core'
import { PrimaryButton, OutlinePrimaryButton } from 'components/Common/Button'
import closeIcon from '../../../../../assets/images/icons/close.png'
import PriceRange from '../../NewProduct/StepsScreens/PriceRange'
import { getProductPriceRange } from '../api'
import Loading from '../../../../../components/Common/Loading'
const StyledDialog = styled(Dialog)`
  margin: auto;
  .MuiPaper-rounded {
    border-radius: 10px;
    width: 600px;
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
const CloseButton = styled.div`
  width: 20px;
  height: 20px;
  float: right;
  align-self: flex-end;
  margin: 20px;
  &:hover {
    cursor: pointer;
  }
`
const SaveChangesButton = styled(PrimaryButton)`
  width: 100%;
`
const LightText = styled.p`
  font-size: 14px;
  color: #969696;
`

const ProductRangeModal = ({ isOpen, onClose, product, onSubmit }) => {
  const [selectedPrice, setSelectedPrice] = useState(product.initialPrice)
  const [productRange, setProductRange] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  async function getPriceRanges(id) {
    setLoading(true)
    const res = await getProductPriceRange(id).catch(setError)
    setLoading(false)
    setProductRange(res.data)
  }
  useEffect(() => {
    getPriceRanges(product.Product.id)
  }, [])

  if (loading) {
    return <Loading />
  }

  if (error) {
    return ''
  }

  return (
    <StyledDialog open={isOpen}>
      <CloseButton onClick={onClose}>
        <img src={closeIcon} alt="" />
      </CloseButton>
      <DialogContent>
        <DialogTitle>Product Range</DialogTitle>
        {productRange.maxPrice && productRange.minPrice ? (
          <PriceRange
            min={productRange.minPrice}
            max={productRange.maxPrice}
            onChange={e => {
              setSelectedPrice(e.target.value)
            }}
            initialPrice={selectedPrice}
          />
        ) : (
          <LightText style={{ color: 'red' }}>
            The product does not have minimum or maximum price
          </LightText>
        )}
        {product.initialPrice <= productRange.minPrice ? (
          <>
            <OutlinePrimaryButton disabled>
              Lowest the price
            </OutlinePrimaryButton>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <LightText>Your price is already the lowest</LightText>
            </div>
          </>
        ) : (
          <SaveChangesButton onClick={() => onSubmit(productRange.minPrice)}>
            Match Lowest Price
          </SaveChangesButton>
        )}
      </DialogContent>
    </StyledDialog>
  )
}

ProductRangeModal.propTypes = {
  isOpen: PropTypes.string,
  onClose: PropTypes.func,
  product: PropTypes.object.isRequired,
  onSubmit: PropTypes.object,
}

export default ProductRangeModal
