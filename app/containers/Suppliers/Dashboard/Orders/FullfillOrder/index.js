import React, { Fragment, useState, useEffect } from 'react'
import styled from 'styled-components'
import Icon from 'components/Common/Icon'
import { object } from 'prop-types'
import { withRouter } from "react-router";
import Grid from '@material-ui/core/Grid';
import { getOrderDetail } from '../api'
import Loading from '../../../../../components/Common/Loading'
import ArrowBackButton from '../../../../../components/Common/ArrowBackButton'
import InitialStep from './InitialStep';
import ShipIndependlyStep1 from './ShipIndependlyStep1';
import ShipIndependlyStep2 from './ShipIndependlyStep2';
import ShipIndependlyStep3 from './ShipIndependlyStep3';
import HomitagShippingStep1 from './HomitagShippingStep1';
import HomitagShippingStep2 from './HomitagShippingStep2';
import HomitagShippingStep3 from './HomitagShippingStep3';
import MessageModal from '../../../../../components/Suppliers/Dashboard/Modals/MessageModal'
import OrderDetailSmall from '../../../../../components/Suppliers/Dashboard/Orders/OrderDetail/OrderDetailSmall'


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


const StyledTitle = styled.div`
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 45px;
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




const FullfillOrder = ({  match, history}) => {

  const [errorMessage, setErrorMessage] = useState('')
  const [showError, setShowError] = useState(false)

  const [successMessage, setSuccessMessage] = useState({})
  const [showSuccess, setShowSuccess] = useState(false)

  const [modalOpen, setModalOpen] = useState(false)
  const [order, setOrder] = useState({})
  const [fullfillData, setFullfillData] = useState({
    address: {},
    shippedBy: {},

  })
  const [shippingIndData, setShippingIndData] = useState({
    carrier: '',
    otherCarrier: '',
    trackingId: ''
  })
  const [loading, setLoading] = useState(false)
  const [formStep, setFormStep] = useState(0)
  const orderId = match.params.id
  
  const handleSelectAddress = (address2) => {
    setFullfillData({ ...fullfillData, address: address2 })
  }
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
    setFormStep(0)
    if (showSuccess) {
      handleFinishProcess()
    }
  }

  const stepsShow = (type, step) => {
    if (type === 'homitagshipping') {
      if (step===0) { return (<InitialStep  buttonNext={{label: "Label Generator"}} handleNextStep={handleNextStep}/>) }
      if (step===1) { return (<HomitagShippingStep1  order={order} handleNextStep={handleNextStep} handleSelectAddress={handleSelectAddress} handleError={handleError}/> ) }  
      if (step===2) { return (<HomitagShippingStep2  order={order} handleNextStep={handleNextStep} fullfillData={fullfillData} handleError={handleError}/> ) } 
      if (step===3) { return (<HomitagShippingStep3  order={order} handleSuccess={handleSuccess}/> ) }   
    }
    if (type === 'shipindependently') {
      if (step===0) { return (<InitialStep  buttonNext={{label: "Label Details"}} handleNextStep={handleNextStep}/>) }
      if (step===1) { return (<ShipIndependlyStep1  order={order} handleNextStep={handleNextStep} setShippingIndData={setShippingIndData} /> ) }
      if (step===2) { return (<ShipIndependlyStep2  order={order} handleNextStep={handleNextStep} handleError={handleError} shippingIndData={shippingIndData}/> ) }
      if (step===3) { return (<ShipIndependlyStep3  order={order} handleSuccess={handleSuccess}/> ) }
    }  
    return null 

  }

  const handleFinishProcess = () => {
    handleGoBack()
  }
  const handleGoBack  = () => {
    history.goBack()
  }

  const handleNextStep = (value) => {
    setFormStep(value)
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

  if(order && order.id  && order.orderStatus === 'pendingbuyerconfirmation' ) {
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
        <StyledTitle>Fulfill Order</StyledTitle>
        <Grid container spacing={3}>
          <Grid item xs={4}> 
            <OrderDetailSmall order={order}/>
          </Grid>
          <Grid item xs={1}>   </Grid>
          <Grid item xs={7}> 
            {stepsShow( order.deliveryMethod.type , formStep)}
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
  </Fragment>)
  

}

FullfillOrder.propTypes = {
  match: object,
  history: object
}
export default withRouter(FullfillOrder)
