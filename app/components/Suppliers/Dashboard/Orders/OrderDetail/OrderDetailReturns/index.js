import React from 'react'
import { injectIntl } from 'react-intl'
import styled from 'styled-components'
import { object } from 'prop-types'
import { withRouter } from 'react-router'
import messages from 'containers/Suppliers/Dashboard/Orders/messages'
import ProductDetailImages from '../ProductDetail/ProductDetailImages'

const StyledSubTitle = styled.div`
  text-align: left;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 25px;
`

const OrderContainer = styled.div`
  background: ${({ theme }) => theme.colors.homiBlack};
  padding-bottom: 40px;
  border-radius: 10px;
`

const OrderDetailHeader = styled.div`
  display: grid;
  grid-template-columns: 15% auto auto;
  grid-template-rows: repeat(1);
  /* grid-row-gap: 5px; */
  padding: 20px;
  padding-bottom: 0px;
  grid-column-gap: 10px;
`

const StyledText = styled.div`
  font-weight: 600;
  margin-bottom: 20px;
  color: white;
  font-size: 16px;
`

const StyledProductID = styled(StyledText)`
  color: #00bdaa;
  padding: 20px 20px 0px 20px;
  text-decoration: underline;
`
const StyledProductQuantity = styled(StyledText)`
  text-align: right;
  margin-bottom: 0px;
`
const StyledProductPrice = styled(StyledText)`
  text-align: right;
  margin-bottom: 0px;
`
const ProductName = styled(StyledText)`
  text-align: left;
  margin-bottom: 0px;
`
const OrderStatus = styled(StyledText)`
  text-align: left;
  margin-bottom: 0px;
  font-weight: normal;
`
const ProductInfoPrice = styled.div`
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: repeat(1);
  grid-row-gap: 0px;
  padding: 0px;
  padding-bottom: 0px;
`

const ProductTitle = styled(StyledText)`
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: repeat(2);
  grid-row-gap: 0px;
  padding: 0px;
  padding-bottom: 0px;
  margin-bottom: 0px;
`
const OrderDetailBody = styled.div`
  display: grid;
  justify-items: center;
  margin-top: 20px;
`

const OrderNote = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
`
const OrderNoteData = styled.div`
  border: 1px solid #969696;
  box-sizing: border-box;
  border-radius: 4px;
  font-size: 16px;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.homiWhite};
  padding: 20px;
  min-height: 200px;
`

const Span = styled.span`
  font-size: 14px;
  margin-left: 15px;
  font-weight: ${props => (props.data ? 'bold' : 'normal')};
`

const StyledHr = styled.hr`
  border: 0.5px solid #4d4a4a;
`

const OrderDetailSmall = ({ intl, order }) => (
  <>
    <StyledSubTitle>Order Details</StyledSubTitle>
    <OrderContainer>
      <StyledProductID> {order.orderID} </StyledProductID>
      <OrderDetailHeader>
        <ProductDetailImages
          product={order.productInfo}
          width={50}
          height={50}
          rounded
        />
        <ProductTitle>
          <ProductName>{order.productInfo.title}</ProductName>
          <OrderStatus>
            {messages[`orderStatus_${order.orderStatus}`]
              ? intl.formatMessage(messages[`orderStatus_${order.orderStatus}`])
              : order.orderStatus}
          </OrderStatus>
        </ProductTitle>
        <ProductInfoPrice>
          <StyledProductPrice>$ {order.totalPaid}</StyledProductPrice>
          <StyledProductQuantity>
            <Span>Quantity: {order.quantity}</Span>
          </StyledProductQuantity>
        </ProductInfoPrice>
      </OrderDetailHeader>
      <StyledHr />
      <OrderDetailBody>
        <OrderNote>
          <OrderNoteData>
            {order.internalNote ? order.internalNote : ''}
          </OrderNoteData>
        </OrderNote>
      </OrderDetailBody>
    </OrderContainer>
  </>
)

OrderDetailSmall.propTypes = {
  order: object,
  intl: object,
}
export default injectIntl(withRouter(OrderDetailSmall))
