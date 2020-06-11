import React, { Fragment, useState, useEffect } from 'react'
import { injectIntl } from 'react-intl'
import styled from 'styled-components'
import Icon from 'components/Common/Icon'
import { object } from 'prop-types'
import { withRouter } from "react-router";
import Grid from '@material-ui/core/Grid';
import { getOrderDetail, getUserService, refundOrder } from '../../api'
import Loading from '../../../../../../components/Common/Loading'
import ProductDetailImages from '../../../../../../components/Suppliers/Dashboard/Orders/OrderDetail/ProductDetail/ProductDetailImages'
import messages from '../../messages'
import RefundForm from './RefundForm';
import MessageModal from '../../../../../../components/Suppliers/Dashboard/Modals/MessageModal'

const StyledIcon = styled(Icon).attrs(props => ({
  color: props.theme.colors.homiPrimary,
  width: '53px',
  height: '55px',
}))``

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
const StyledTitle = styled.div`
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 25px;
`
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
  font-weight: normal;
  margin-bottom: 20px;
  color: white;
  font-size: 16px;
  && strong {
    font-weight: 600;
  }
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


const Span = styled.span`
  font-size: 14px;
  margin-left: 15px;
  font-weight: ${props => props.data ? "bold" : "normal"};
`

const StyledHr = styled.hr`
 border: .5px solid #4D4A4A;
`

const OrderTransactionInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px
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



const IssueRefund = ({ intl, match, history}) => {

  const [errorMessage, setErrorMessage] = useState('')
  const [showError, setShowError] = useState(false)

  const [successMessage, setSuccessMessage] = useState({})
  const [showSuccess, setShowSuccess] = useState(false)

  const [modalOpen, setModalOpen] = useState(false)
  const [order, setOrder] = useState({})
  const [loading, setLoading] = useState(false)
  const orderId = match.params.id

  const [buyer, setBuyer] = useState(null)
  
  const handleSuccess = (message) => {
    setModalOpen(true)
    setShowSuccess(true)
    setSuccessMessage(message)
  }

  const handleError = (message) => {
    setModalOpen(true)
    setShowError(true)
    setErrorMessage(message)
  }
  const onCloseModal = () => {
    setModalOpen(false)
    if (showSuccess) {
      handleFinishProcess()
    }
    if (showError) {
      handleGoBack()
    }
  }

  const handleFinishProcess = () => {
    handleGoBack()
  }
  const handleGoBack  = () => {
    history.goBack()
  }

  const getUserBuyer = (buyerId) => {
    getUserService(buyerId)
      .then(
        (res) => { 
          setBuyer({
            name: res.data.name
          })
        }
      )
      .catch((e) => {
        handleError(e.response.data.result.content ? `${e.response.data.result.content.message  } - ${  e.response.data.result.content.fields.join(' ')}` : "ERROR")
      })
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
    setLoading(true)
    getList()
  }, [])

  useEffect(() => {
    if(order && order.id ) {
      getUserBuyer( order.buyerId)
    }
  }, [order])




  // DOING//
  const refund = (values) => {
    const RefundBody = {
      "refundReason": values.refundReason,
      "refundedComment": values.explanation,
      "refundPartial": true,
      "refundValue": values.refundAmount
    }
    // showConfirmationModal(true)
    refundOrder(order.id, RefundBody)
      .then(() => {
        // console.log(res)
        // showConfirmationModal(true)
        handleSuccess({title: "Refund Issued", text: `You\`ve successfully issued ${  buyer.name  } a refund`})
      }
      )
      .catch((e) => {
        handleError(e.response.data.result.content ? `${e.response.data.result.content.message  }` : "ERROR")
      })
      .finally(
      ) 
  }
  // /DOING

  if (loading) return <Loading pageLoading transparent size={60} />
  
  // if(order && order.id  && order.orderStatus === 'pendingbuyerconfirmation' ) {


  let IssueRefundForm = ''


  let IssueRefundContent = ''
  if(order && order.id && buyer) {
    
    IssueRefundForm = 
    <Grid item xs={6}> 
      <RefundForm buttonNext={{label: ""}} handleSuccess={handleSuccess} handleError={handleError} handleRefund={refund}/>
    </Grid>

    IssueRefundContent = 
          <Grid item xs={6}> 
            <StyledSubTitle>Order Details</StyledSubTitle>
            <OrderContainer>
              <StyledProductID> {order.productInfo.id} </StyledProductID>
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
                <OrderTransactionInfo>
                  <OrderTransactionInfoData>
                    <OrderTransactionRow><StyledText>Purchase Price</StyledText><StyledText>$ {order.totalPaid}</StyledText></OrderTransactionRow>
                    <OrderTransactionRow><StyledText>Buyer Paid Shipping</StyledText> <StyledText>$ {order.shippingValue}</StyledText></OrderTransactionRow>
                    <OrderTransactionRow><StyledText>Tax </StyledText><StyledText>$ XX.XX</StyledText></OrderTransactionRow>
                    <OrderTransactionRow><StyledText><strong>Total Paid by Buyer</strong> </StyledText><StyledText>$ XX.XX</StyledText></OrderTransactionRow>
                    <OrderTransactionRow><StyledText><strong>Transaction ID:</strong></StyledText> <StyledText> - </StyledText></OrderTransactionRow>
                    <OrderTransactionRow><StyledText><strong>Date Purchased:</strong> </StyledText><StyledText> -</StyledText></OrderTransactionRow>
                  </OrderTransactionInfoData>
                </OrderTransactionInfo>
              </OrderDetailBody>
            </OrderContainer>
          </Grid>
  }
  return <Fragment>
    <CloseButton onClick={handleGoBack}>
      <StyledIcon icon="cancellationsPurple" width={50} height={50} />
    </CloseButton>
    <StyledTitle>Issue Refund</StyledTitle>
    <Grid container spacing={3}>
      {IssueRefundContent}
      {IssueRefundForm}
    </Grid>
    <MessageModal
      isOpen={modalOpen}
      errorMessage={errorMessage}
      showError={showError}
      successMessage={successMessage}
      showSuccess={showSuccess}
      onClose={onCloseModal}
    />
  </Fragment>
  

}

IssueRefund.propTypes = {
  match: object,
  history: object,
  intl: object
}
export default injectIntl(withRouter(IssueRefund))
