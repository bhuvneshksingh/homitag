import React, { Fragment, useState, useEffect } from 'react'
import { injectIntl } from 'react-intl'
import styled from 'styled-components'
import Icon from 'components/Common/Icon'
import { object } from 'prop-types'
import { format, parseISO } from 'date-fns'
import { withRouter } from "react-router";
import { Link } from 'react-router-dom'
import { getOrderDetail } from '../api'
import Loading from '../../../../../components/Common/Loading'
import ArrowBackButton from '../../../../../components/Common/ArrowBackButton'
import ActionButton from '../../../../../components/Suppliers/Dashboard/Orders/ActionButton';
import ProductDetailImages from '../../../../../components/Suppliers/Dashboard/Orders/OrderDetail/ProductDetail/ProductDetailImages'

const ArrowIcon = styled(Icon).attrs(props => ({
  color: props.theme.colors.homiPrimary,
  width: 10,
  height: 15,
}))``

const ButtonWrapper = styled.div`
  display: flex;
`

const StyledLink = styled(Link)`
  font-size 20px;
  font-weight: 600;
  text-decoration: none;
  color: black;
`

const Path = styled.h1`
  margin-left: 10px;
`

const ArrowLeft = () => (
  <div style={{ transform: 'rotate(-180deg)' }}>
    <ArrowIcon icon="arrow" />
  </div>
)

const StyledTitle = styled.div`
  text-align: center;
  font-size: 20px;
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
const QuantityOrdered = styled(StyledText)`
  text-align: center;
`
const Sku = styled(StyledText)`
  text-align: left;
`


const ProductTitle = styled(StyledText)`
   text-align: center;
`
const StyledProductDetailImages = styled(ProductDetailImages)`
  margin-bottom: 20px;
  margin-left: -20px;
`
const OrderDetailBody = styled.div`
  display: grid;
  justify-items: center;
  margin-top: 20px;
`
const OrderDates = styled.div`
  
  display: flex;
  flex-direction: row
  justify-items: center;
  justify-content: space-around;
  margin-top: 20px;
  width: 50%;
  line-height: 20px;
  && div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: center;
  }
  && span {
    display: block;
    padding: 10px;
    border: 1px solid #969696;
    border-radius: 4px;
    font-size: 16px;
    line-height: 20px;
    color: ${({ theme }) => theme.colors.homiWhite};
    margin: 0px;
  }
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


const OrderTransactionInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px
`

const OrderTransactionInfoTitle = styled.div`
width: 100%;
`

const OrderTransactionInfoData = styled.div`
display: flex;
flex-direction: column;
width: 100%;
`
const OrderTransactionRow = styled(StyledText)` 
  display: flex;
  flex-direction: row;
  width: 100%;
  text-align: right;
  justify-content: space-between;
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
const OrderNoteTitle = styled.div`
width: 100%;
`
const Span = styled.span`
  font-size: 14px;
  margin-left: 15px;
  font-weight: ${props => props.data ? "bold" : "normal"};
`
const DottedButton= styled(StyledText)`
  grid-column: 3 / span 2;
  grid-row-start: 1;
  grid-row-end: 1;
  justify-self: end;
  margin-top: 0px;
  margin-bottom: auto;
`

const StyledHr = styled.hr`
 border: .5px solid #4D4A4A;
`

const OrderDetail = ({ match, history }) => {
  const [order, setOrder] = useState({})
  const [loading, setLoading] = useState(false)
  const orderId = match.params.id
 
  const handleGoBack  = () => {
    history.goBack()
  }

  const handleClose = () => {
    getList()
  }

  const getList = () => {
    setLoading(true)
    getOrderDetail(orderId)
      .then(
        res => setOrder(res.data)
      )
      .finally(() => setLoading(false))
  }
  useEffect(() => {
    getList()
  }, [])
  if (loading) return <Loading pageLoading transparent size={60} />
  if(order && order.id){
    const shippedOrder = !!order.shippedAt

    const SkuShow = order.sku ? <Sku>SKU: <Span>{order.sku}</Span></Sku> : <Sku></Sku>

    return ( 
      <Fragment>
        <StyledLink onClick={handleGoBack}>
          <ButtonWrapper>
            {ArrowLeft()}
            <Path>Orders</Path>
          </ButtonWrapper>
        </StyledLink>
        <StyledTitle>{order.orderID}</StyledTitle>
        <OrderContainer>
          <OrderDetailHeader>
            <StyledText>PRODUCT ID: <Span> {order.productInfo.id} </Span></StyledText>
            <ProductTitle>
              {order.productInfo.title}
            </ProductTitle>
            <DottedButton>
              <ActionButton
                id={order.id} 
                shipped={shippedOrder}
                type="Order"
                status={order.orderStatus}
                onClose={() => handleClose()}
                deliveryMethod={order.deliveryMethod}
                from="OrderDetail"
              />
            </DottedButton>
            {SkuShow}
            <QuantityOrdered>QUANTITY ORDERED: <Span>{order.quantity}</Span></QuantityOrdered>
          </OrderDetailHeader>
          
          <StyledHr /> 
          <OrderDetailBody>
            <StyledProductDetailImages product={order.productInfo} width={140} height={140}/>
            <OrderDates>
              <StyledText>Ordered <Span>  {order.createdAt ? format(parseISO(order.createdAt), 'MM/dd/yy') : '-'} </Span></StyledText>
              <StyledText>Ship by <Span>  {order.shippedAt ? format(parseISO(order.shippedAt), 'MM/dd/yy') : '-'} </Span></StyledText>
              <StyledText>Deliver by <Span> {order.deliveredAt ? format(parseISO(order.deliveredAt), 'MM/dd/yy') : '-'} </Span></StyledText>
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
            <OrderTransactionInfo>
              <OrderTransactionInfoTitle>
                <StyledText>Transaction Info</StyledText>
              </OrderTransactionInfoTitle>
              <OrderTransactionInfoData>
                <OrderTransactionRow><StyledText>Purchase Price</StyledText><StyledText>$ {order.totalPaid}</StyledText></OrderTransactionRow>
                <OrderTransactionRow><StyledText>Buyer Paid Shipping</StyledText> <StyledText>$ {order.shippingValue}</StyledText></OrderTransactionRow>
                <OrderTransactionRow><StyledText>Tax </StyledText><StyledText>$ 0</StyledText></OrderTransactionRow>
                <OrderTransactionRow><StyledText>Homitag Fee</StyledText> <StyledText> $ {order.paymentFee}</StyledText></OrderTransactionRow>
                <OrderTransactionRow><StyledText>Total You Earn </StyledText><StyledText>$ {order.sellerShare}</StyledText></OrderTransactionRow>
              </OrderTransactionInfoData>
            </OrderTransactionInfo>
            <OrderNote>
              <OrderNoteTitle>
                <StyledText>Order Note</StyledText>
              </OrderNoteTitle>
              <OrderNoteData>
                {order.internalNote}
              </OrderNoteData>
            </OrderNote>
          </OrderDetailBody>
        </OrderContainer>
      </Fragment>
    )
  }
  return (<Fragment>
    <ArrowBackButton title='Orders' backRoute='/suppliers/orders'/>
  </Fragment>)
  

}

OrderDetail.propTypes = {
  match: object,
  history: object
}
export default injectIntl(withRouter(OrderDetail))
