import React from 'react'
import { injectIntl } from 'react-intl'
import styled from 'styled-components'
import { object } from 'prop-types'
import { format, parseISO } from 'date-fns'
import { withRouter } from "react-router";
import messages from 'containers/Suppliers/Dashboard/Orders/messages'
import ProductDetailImages from "../ProductDetail/ProductDetailImages"



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
`

const StyledText = styled.div`
  font-weight: 600;
  margin-bottom: 20px;
  color: white;
  font-size: 16px;
`

const StyledProductID = styled(StyledText)`
    color: #00BDAA;
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
    font-weight: normal
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
const StyledProductDetailImages = styled(ProductDetailImages)`
  margin-bottom: 20px;
  margin-left: -20px;
  border-radius: 50px;
  overflow: hidden
`
const OrderDetailBody = styled.div`
  display: grid;
  justify-items: center;
  margin-top: 20px;
`
const OrderDates = styled.div`
  
display: grid;
grid-template-columns: auto auto;
grid-template-rows: repeat(2);
grid-row-gap: 0px;
padding: 0px 20px;
padding-bottom: 0px;
margin-bottom: 0px;
width: 100%
`
const StyledShipBy = styled(StyledText)`
text-align: right;
margin-bottom: 0px;
`
const StyledDateOrdered = styled(StyledText)`
text-align: left;
margin-bottom: 0px;
`

const OrderShipTo = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 20px
`

const OrderShipToTitle = styled.div`
width: 100%;
`

const OrderShipToData = styled.div`
display: flex;
flex-direction: column;
width: 100%;
align-items: flex-end;
`


const OrderNote = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px
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
  font-weight: ${props => props.data ? "bold" : "normal"};
`



const StyledHr = styled.hr`
  border: .5px solid #4D4A4A;
`



const OrderDetailSmall = ({intl, order}) => ( 
    <>
  <StyledSubTitle>Order Details</StyledSubTitle>
  <OrderContainer>
    <StyledProductID> {order.orderID} </StyledProductID>
    <OrderDetailHeader>
      <StyledProductDetailImages product={order.productInfo} width={50} height={50} rounded/>
      <ProductTitle>
        <ProductName>{order.productInfo.title}</ProductName>
        <OrderStatus>{messages[`orderStatus_${order.orderStatus}`] ? intl.formatMessage(messages[`orderStatus_${order.orderStatus}`]) : order.orderStatus}</OrderStatus>
      </ProductTitle>
      <ProductInfoPrice>
        <StyledProductPrice>$ {order.totalPaid}</StyledProductPrice>
        <StyledProductQuantity><Span>Quantity: {order.quantity}</Span></StyledProductQuantity>
      </ProductInfoPrice>
    </OrderDetailHeader>
    <StyledHr /> 
    <OrderDetailBody>
      <OrderDates>
        <StyledDateOrdered>Date Ordered <Span>  {order.createdAt ? format(parseISO(order.createdAt), 'MM/dd/yy') : '-'} </Span></StyledDateOrdered>
        <StyledShipBy>Ship by <Span>  {order.shippedAt ? format(parseISO(order.shippedAt), 'MM/dd/yy') : '-'} </Span></StyledShipBy>
      </OrderDates>
      <OrderShipTo>
        <OrderShipToTitle>
          <StyledText>Ship To</StyledText>
        </OrderShipToTitle>
        <OrderShipToData>
          <StyledText>{order.deliveryMethod.buyerName ? order.deliveryMethod.buyerName : '-'}</StyledText>
          <StyledText>{order.deliveryMethod.addressline1 ? order.deliveryMethod.addressline1 : '-'}</StyledText>
          <StyledText>{order.deliveryMethod.city ? order.deliveryMethod.city : '-'}</StyledText>
        </OrderShipToData>
      </OrderShipTo>
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
  intl: object
}
export default injectIntl(withRouter(OrderDetailSmall))
  