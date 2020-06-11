import React, { Fragment, useState, useEffect } from 'react'
import { injectIntl } from 'react-intl'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Icon from 'components/Common/Icon'
import { object } from 'prop-types'
import { withRouter } from 'react-router'
import {  Button } from '@material-ui/core'
import { getOrderDetail } from '../../api'
import Loading from '../../../../../../components/Common/Loading'
import ArrowBackButton from '../../../../../../components/Common/ArrowBackButton'
import ActionButton from '../../../../../../components/Suppliers/Dashboard/Orders/ActionButton'
import ProductDetailImages from '../../../../../../components/Suppliers/Dashboard/Orders/OrderDetail/ProductDetail/ProductDetailImages'
import messages from '../../messages'
// import MessageModal from '../../../../../../components/Suppliers/Dashboard/Modals/MessageModal'
import Routes from '../../../../Router/Routes.json'


const StyledSubTitle = styled.div`
  text-align: center;
  font-size: 16px;
  font-weight: normal;
  margin-bottom: 25px;
`
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
  margin: 0px 20px;
  &:hover {
    cursor: pointer;
   }
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

const StyledTextOrderID = styled(StyledText)`
  color: #00bdaa;
  padding: 0px;
  text-decoration: underline;
  font-weight: 600;
  margin-bottom: 20px;
  font-size: 16px;
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


const StyledProductQuantity = styled(StyledText)`
  text-align: right;
  margin-bottom: 0px;
`
const StyledProductPrice = styled(StyledText)`
  text-align: right;
  margin-bottom: 0px;
`

const StyledTitle = styled.div`
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 25px;
`

const OrderContainer = styled.div`
  background: ${({ theme }) => theme.colors.homiBlack};
  padding-bottom: 10px;
  border-radius: 10px;
`

const OrderDetailHeader = styled.div`
  display: grid;
  grid-template-columns: 10% auto 10%;
  grid-row-gap: 5px;
  padding: 20px;
  padding-bottom: 0px;
`

const ProductTitle = styled(StyledText)`
  text-align: center;
`

const StyledProductDetailImages = styled(ProductDetailImages)`

    margin-right: 100px;

`
const OrderPhoto = styled.div`

  margin-right: 20px;
  margin-bottom: 20px;

`


const OrderDetailBody = styled.div`
  display: grid;
  justify-items: left;
  margin-top: 20px;
`


const OrderReturnDetails = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
`

const OrderReturnTitle = styled.div`
  width: 100%;
`

const OrderReturnData = styled.div`
  width: 100%;
  font-weight: normal;
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

const OrderPhotos = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0px 20px;
`

const OrderPhotosListing = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0px;
`

const Span = styled.span`
  font-size: 14px;
  margin-left: 15px;
  font-weight: ${props => (props.data ? 'bold' : 'normal')};
`

const DottedButton = styled(StyledText)`
  grid-column: 3 / span 2;
  grid-row-start: 1;
  grid-row-end: 1;
  justify-self: end;
  margin-top: 0px;
  margin-bottom: auto;
`

const StyledHr = styled.hr`
  border: 0.5px solid #4d4a4a;
`
const OrderButtons = styled.div`
  padding: 0px 20px;
  display: flex;
  flex-direction: row;
  width: 70%;
  justify-content: center
`

const StyledButton = styled(Button)`
  && {
    margin-right: 20px;
    background: ${({ theme }) => theme.colors.homiGrey};
    border-radius: 6px;
    color: #FFF;
    font-weight: 600;
    font-size: 15px;
    line-height: 15px;
    height: 45px;
    width: 100%;
    text-transform: none;
  }
  :hover {
    color: ${({ theme }) => theme.colors.homiWhite};
  }
`


const ButtonDecline = styled(StyledButton)`
  && {
    background-color: #FF5556;
  }
  && :hover {
    background-color: rgb(255, 85, 86 , 0.5)
  }
`
const ButtonAccept = styled(StyledButton)`
  && {
    background-color: #7471FF;
  }
  && :hover {
    background-color: rgb(116, 113, 255 , 0.5)
  }
`

const ButtonIssueRefund = styled(StyledButton)`
  && {
    background-color: #00BDAA;
  }
  && :hover {
    background-color: rgb(0, 189, 170 , 0.5)
  }
`

const StyledLink = styled(Link)`
  text-decoration: none;
  margin-right: 20px;
  width: 100%;
`

const ViewRequest = ({ intl, match, history }) => {
  /*
  const [errorMessage, setErrorMessage] = useState('')
  const [showError, setShowError] = useState(false)

  const [successMessage, setSuccessMessage] = useState({})
  const [showSuccess, setShowSuccess] = useState(false)

  const [modalOpen, setModalOpen] = useState(false) */
  const [order, setOrder] = useState({})
  const [loading, setLoading] = useState(false)
  const orderId = match.params.id

  const handleGoBack = () => {
    history.goBack()
  }
  /*
  const handleSuccess = (message) => {
    setShowError(false)
    setModalOpen(true)
    setShowSuccess(true)
    setSuccessMessage(message)
  }
  const handleError = (message) => {
    setShowSuccess(false)
    setModalOpen(true)
    setShowError(true)
    setErrorMessage(message)
  }

 
  const onCloseModal = () => {
    setModalOpen(false)
    if (showSuccess) {
      // handleFinishProcess()
    }
  } */
  /*
  const handleIssueRefund = () => {
    handleSuccess({title: "Refund Issued", text: "You`ve successfully ..."})
  }
  const handleAccept = () => {
    // handleSuccess({title: "Return Accepted", text: "You`ve successfully accepted the return."})
    handleError("Return can not be accepted")
  }
*/
  

  const getList = () => {
    setLoading(true)
    getOrderDetail(orderId)
      .then(res => setOrder(res.data))
      .finally(() => setLoading(false))
  }
  useEffect(() => {
    getList()
  }, [])
  if (loading) return <Loading pageLoading transparent size={60} />
  if (order && order.id) {
    const shippedOrder = !!order.shippedAt

    return (
      <Fragment>
        <CloseButton onClick={handleGoBack}>
          <StyledIcon icon="cancellationsPurple" width={50} height={50} />
        </CloseButton>
        <StyledTitle>Return Request</StyledTitle>
        <StyledSubTitle>Please action on this request by Date to avoid an automatic refund</StyledSubTitle>
        <OrderContainer>
          <OrderDetailHeader>
            <StyledTextOrderID>{order.orderID}</StyledTextOrderID>
            <DottedButton>
              <ActionButton
                id={order.id}
                shipped={shippedOrder}
                type="Order"
                orderStatus={order.orderStatus}
              />
            </DottedButton>
          </OrderDetailHeader>

          <OrderContainer>
            <OrderDetailHeader>
              <StyledProductDetailImages
                product={order.productInfo}
                width={90}
                height={90}
                rounded={false}
              />
              <ProductTitle>
                <ProductName><strong>{order.productInfo.title}</strong></ProductName>
                <OrderStatus>
                  {messages[`orderStatus_${order.orderStatus}`]
                    ? intl.formatMessage(
                      messages[`orderStatus_${order.orderStatus}`]
                    )
                    : order.orderStatus}
                </OrderStatus>
              </ProductTitle>
              <ProductInfoPrice>
                <StyledProductPrice><strong>$ {order.totalPaid}</strong></StyledProductPrice>
                <StyledProductQuantity>
                  <Span>Quantity: {order.quantity}</Span>
                </StyledProductQuantity>
              </ProductInfoPrice>
            </OrderDetailHeader>
            <StyledHr />
            <OrderDetailBody>
              <OrderReturnDetails>
                <OrderReturnTitle>
                  <StyledText><strong>Return Details</strong></StyledText>
                </OrderReturnTitle>
                <OrderReturnData>
                  <StyledText> Item is missing parts</StyledText>
                </OrderReturnData>
              </OrderReturnDetails>
              <OrderNote>
                <OrderNoteData>
                  {order.internalNote ? order.internalNote : ''}
                </OrderNoteData>
              </OrderNote>
              <OrderPhotos>
                <StyledText><strong>Photos</strong></StyledText>
                <OrderPhotosListing>
                  <OrderPhoto>
                    <StyledProductDetailImages
                      product={order.productInfo}
                      width={90}
                      height={90}
                      rounded={false}
                    />
                  </OrderPhoto>
                  <OrderPhoto>
                    <StyledProductDetailImages
                      product={order.productInfo}
                      width={90}
                      height={90}
                      rounded={false}
                    />
                  </OrderPhoto>
                  <OrderPhoto>
                    <StyledProductDetailImages
                      product={order.productInfo}
                      width={90}
                      height={90}
                      rounded={false}
                    />
                  </OrderPhoto>
                  <OrderPhoto>
                    <StyledProductDetailImages
                      product={order.productInfo}
                      width={90}
                      height={90}
                      rounded={false}
                    />
                  </OrderPhoto>
                </OrderPhotosListing>
              </OrderPhotos>
              <OrderButtons>
                <StyledLink to={`${Routes.Suppliers}/orders/order/decline-return/${order.id}`}><ButtonDecline>Decline</ButtonDecline></StyledLink>
                <StyledLink to={`${Routes.Suppliers}/orders/order/issue-refund/${order.id}`}><ButtonIssueRefund>Issue Refund</ButtonIssueRefund></StyledLink>
                <StyledLink to={`${Routes.Suppliers}/orders/order/accept-return/${order.id}`}><ButtonAccept>Accept</ButtonAccept></StyledLink>
              </OrderButtons>
            </OrderDetailBody>
          </OrderContainer>
        </OrderContainer>
        {/* <MessageModal
          isOpen={modalOpen}
          errorMessage={errorMessage}
          showError={showError}
          successMessage={successMessage}
          showSuccess={showSuccess}
          onClose={onCloseModal}
        /> */}
      </Fragment>
    )
  }
  return (
    <Fragment>
      <ArrowBackButton title="Orders" backRoute="/suppliers/orders" />
    </Fragment>
  )
}

ViewRequest.propTypes = {
  match: object,
  history: object,
  intl: object,
}
export default injectIntl(withRouter(ViewRequest))
