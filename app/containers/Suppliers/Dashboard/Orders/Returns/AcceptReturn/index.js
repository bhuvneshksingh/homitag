import React, { Fragment, useState, useEffect } from 'react'
import { injectIntl } from 'react-intl'
import Icon from 'components/Common/Icon'
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components'
import { object } from 'prop-types'
import { getOrderDetail, getUserService, declineOrder } from '../../api'
import Loading from '../../../../../../components/Common/Loading'
import ArrowBackButton from '../../../../../../components/Common/ArrowBackButton'
import OrderDetailReturns from '../../../../../../components/Suppliers/Dashboard/Orders/OrderDetail/OrderDetailReturns'

import AcceptForm from './AcceptForm';
import MessageModal from '../../../../../../components/Suppliers/Dashboard/Modals/MessageModal'



const StyledTitle = styled.div`
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 25px;
`

const ArrowIcon = styled(Icon).attrs(props => ({
  color: props.theme.colors.homiPrimary,
  width: 10,
  height: 15,
}))``

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
const StyledTextLink = styled.div`
  font-weight: 600;
  margin-bottom: 20px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  float: left;
`
const ButtonWrapper = styled.div`
  display: flex;
`

const ArrowLeft = () => (
  <div style={{ transform: 'rotate(-180deg)' }}>
    <ArrowIcon icon="arrow" />
  </div>
)




const AcceptReturn = ({ match, history }) => {
  const [errorMessage, setErrorMessage] = useState('')
  const [showError, setShowError] = useState(false)
  const [successMessage, setSuccessMessage] = useState({})
  const [showSuccess, setShowSuccess] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [order, setOrder] = useState({})
  const [loading, setLoading] = useState(false)
  const [buyer, setBuyer] = useState(null)

  const orderId = match.params.id
  
  const handleGoBack  = () => {
    history.goBack()
  }
  const getList = () => {
    setLoading(true)
    getOrderDetail(orderId)
      .then(
        res => {
          setOrder(res.data)
        }
      )
      .finally(() => setLoading(false))
  }
  useEffect(() => {
    getList()
  }, [])


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
  }

  const handleFinishProcess = () => {
    handleGoBack()
  }

  // DOING//
  const decline = (values) => {
    const RefundBody = {
      "refundReason": values.refundReason,
      "refundedComment": values.explanation,
      "refundPartial": true,
      "refundValue": values.refundAmount
    }
    // showConfirmationModal(true)
    declineOrder(order.id, RefundBody)
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

  const getUserBuyer = (buyerId) => {
    getUserService(buyerId)
      .then(
        (res) => { 
          setBuyer({
            name: res.data.name
          })
        }
      )
      .catch(() => {
        // handleError(e.response.data.result.content ? `${e.response.data.result.content.message  } - ${  e.response.data.result.content.fields.join(' ')}` : "ERROR")
      })
  }

  useEffect(() => {
    if(order && order.id ) {
      getUserBuyer( order.buyerId)
    }
  }, [order])


  let AcceptReturnForm = ''

  if (loading) return <Loading pageLoading transparent size={60} />
  if(order && order.id){

    AcceptReturnForm = 
      <AcceptForm buttonNext={{label: ""}} handleSuccess={handleSuccess} handleError={handleError} handleDecline={decline}/>

    return ( 
      <Fragment>
        <StyledTextLink onClick={handleGoBack}>
          <ButtonWrapper>
            {ArrowLeft()}
          </ButtonWrapper>
        </StyledTextLink>
        <CloseButton onClick={handleGoBack}>
          <StyledIcon icon="cancellationsPurple" width={50} height={50} />
        </CloseButton>
        <StyledTitle>Accept Return</StyledTitle>
        <Grid container spacing={3}>
          <Grid item xs={4}> 
            <OrderDetailReturns order={order}/>
          </Grid>
          <Grid item xs={1}>   </Grid>
          <Grid item xs={7}> 
            {AcceptReturnForm}
          </Grid>
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
    )
  }
  return (<Fragment>
    <ArrowBackButton title='Orders' backRoute='/suppliers/orders'/>
    <StyledTitle>Accept Return</StyledTitle>
  </Fragment>)
  

  


}

AcceptReturn.propTypes = {
  match: object,
  history: object
}
export default injectIntl(AcceptReturn)
