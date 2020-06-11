import React, { Fragment, useState, useEffect } from 'react'
import { injectIntl } from 'react-intl'
import Icon from 'components/Common/Icon'
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components'
import { object } from 'prop-types'
import { getOrderDetail } from '../api'
import Loading from '../../../../../components/Common/Loading'
import ArrowBackButton from '../../../../../components/Common/ArrowBackButton'
import OrderDetailSmall from '../../../../../components/Suppliers/Dashboard/Orders/OrderDetail/OrderDetailSmall'
import ShipIndependlyStep1 from '../FullfillOrder/ShipIndependlyStep1'
import ShipIndependlyStep2 from '../FullfillOrder/ShipIndependlyStep2'
import ShipIndependlyStep3 from '../FullfillOrder/ShipIndependlyStep3'
import HomitagShippingStep1 from '../FullfillOrder/HomitagShippingStep1';
import HomitagShippingStep2 from '../FullfillOrder/HomitagShippingStep2';
import HomitagShippingStep3 from '../FullfillOrder/HomitagShippingStep3';
import MessageModal from '../../../../../components/Suppliers/Dashboard/Modals/MessageModal'



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




const ViewLabel = ({ match, history }) => {
  const [errorMessage, setErrorMessage] = useState('')
  const [showError, setShowError] = useState(false)
  const [successMessage, setSuccessMessage] = useState({})
  const [showSuccess, setShowSuccess] = useState(false)
  const [shippingIndData, setShippingIndData] = useState({
    carrier: '',
    otherCarrier: '',
    trackingId: ''
  })

  const [fullfillData, setFullfillData] = useState({
    address: {},
    shippedBy: {},

  })
  const [modalOpen, setModalOpen] = useState(false)
  const [formStep, setFormStep] = useState(1)
  const [order, setOrder] = useState({})
  const [loading, setLoading] = useState(false)
  const orderId = match.params.id
  
  const handleSelectAddress = (address2) => {
    setFullfillData({ ...fullfillData, address: address2 })
  }

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
    setFormStep(0)
    if (showSuccess) {
      handleFinishProcess()
    }
  }

  const handleFinishProcess = () => {
    handleGoBack()
  }

  const handleNextStep = (value) => {
    setFormStep(value)
  }


  
  const stepsShow = (type, step) => {
    if (type === 'shipindependently') {
      if (step===1) { return (<ShipIndependlyStep1  order={order} handleNextStep={handleNextStep} setShippingIndData={setShippingIndData}/> ) }
      if (step===2) { return (<ShipIndependlyStep2  order={order} handleNextStep={handleNextStep} handleError={handleError} shippingIndData={shippingIndData}/> ) }
      if (step===3) { return (<ShipIndependlyStep3  order={order} handleSuccess={handleSuccess}/> ) }
    }  

    if (type === 'homitagshipping') {
      if (step===1) { return (<HomitagShippingStep1  order={order} handleNextStep={handleNextStep} handleSelectAddress={handleSelectAddress}  /> ) }  
      if (step===2) { return (<HomitagShippingStep2  order={order} handleNextStep={handleNextStep} fullfillData={fullfillData} handleError={handleError}/> ) } 
      if (step===3) { return (<HomitagShippingStep3  order={order} handleSuccess={handleSuccess}/> ) }   
    }
    return null 

  }

  

  if (loading) return <Loading pageLoading transparent size={60} />
  if(order && order.id){
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
        <StyledTitle>Shipping Label</StyledTitle>
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
    <StyledTitle>View Label</StyledTitle>
  </Fragment>)
  

  


}

ViewLabel.propTypes = {
  match: object,
  history: object
}
export default injectIntl(ViewLabel)
