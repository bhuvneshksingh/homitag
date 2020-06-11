import React, { useEffect, useState} from 'react'
import { injectIntl } from 'react-intl'
import styled from 'styled-components'
import { func, object} from 'prop-types'
import { withRouter } from "react-router";
import Grid from '@material-ui/core/Grid';
import { PrimaryButton } from '../../../../../components/Common/Button'
import whiteAdd from '../../../../../assets/images/icons/plus.svg'
import { getProductDetail } from '../api'
import Loading from '../../../../../components/Common/Loading'
import AddAddress from './AddAddress'

const StyledSubTitle = styled.div`
  text-align: left;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 25px;
`

const StyledText = styled.div`
  font-weight: 600;
  margin-bottom: 20px;
  color: white;
  font-size: 16px;
`

const FullfillSteps = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
`

const StyledStepText = styled(StyledText)`
  color: ${({ theme }) => theme.colors.homiBlack};
  font-weight: normal;
`

const SellerAddressBox = styled.div`
  background: ${({ theme }) => theme.colors.homiPrimary};
  background: ${props => props.selected ? ({ theme }) => theme.colors.homiPrimary : ({ theme }) => theme.colors.homiGrey};
  padding: 20px;
  border-radius: 10px;
  cursor:  ${props => props.selected ? 'auto' : 'pointer'};
  position: relative;
  margin-bottom: 20px;
  && span {
    display: ${props => props.selected ? 'block' : 'none'};
  }
  && div {
    color: ${props => props.selected ? ({ theme }) => theme.colors.homiWhite : '#b4b4b4'};
  }
`

const StyledEditLink = styled.span`
  position: absolute;
  text-decoration: underline;
  color: ${({ theme }) => theme.colors.homiWhite};
  top: 10px;
  right: 10px;
  cursor: pointer;
`

const StyledBoxText = styled(StyledText)`
  color: ${({ theme }) => theme.colors.homiWhite};
  color: #FFF;
  text-align: left;
  font-weight: ${props => props.strong ? "bold" : "normal"};
  margin-bottom: 0px;
`

const AddAddressLabel = styled.div`
  display: flex;
  justify-content: space-between;
  height: 60px;
  border: 1px solid #00BDAA;
  background: #00BDAA;
  border-radius: 10px;
  &:hover {
      cursor: pointer;
      background: #05b09f;
    }
`

const AddIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-top: 20px;
  margin-right: 15px;
`

const AddAddressText = styled.p`
  color: #FFFFFF;
  margin-left: 20px;
  margin-top: 15px;
  font-size: 16px;
  font-weight: 600;
`

const StyledPrimaryButton = styled(PrimaryButton)`
&& :disabled {
  color: #7471ff;
  /* opacity: 0.5; */
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.homiPrimary};
}
&& :disabled .MuiButton-label * {
  color: ${({ theme }) => theme.colors.homiPrimary};
}
`


const Steps = ({  handleNextStep, order, handleSelectAddress, handleError }) => {
  const [product, setProduct] = useState()
  const [isNewAddress, setIsNewAddress] = useState(true)
  const [selectedAddress, setSelectedAddress] = useState(null)
  const [selectedAddressData, setSelectedAddressData] = useState({})
  const [loading, setLoading] = useState(false)
  const [showAddressForm, setShowAddressForm] = useState(false)

  const [submitShow, setSubmitShow] = useState(false)
  
  const getList = () => {
    setLoading(true)
    getProductDetail(order.postId)
      .then(
        (res) => { 
          setProduct(res.data)
        }
      )
      .catch((e) => {
        handleError(e.response.data.error)
      })
      .finally(() => setLoading(false))
  }
  useEffect(() => {
    getList()
  }, [])
  useEffect(() => {
    setDefaultAddressAsSelected()
  }, [product])
  


  const handleAddAddress = () => {
    setSelectedAddressData({})
    setIsNewAddress(true)
    setShowAddressForm(true)
  }
  const handleEditAddress = (index) => {
    setIsNewAddress(false)
    setSelectedAddressData(product.data.DeliveryMethods[0].DeliveryMethodPerPost.customProperties.returnAddresses[index])
    setShowAddressForm(true)
  }
 
  const handleClickSelectAddress = (index, addressData) => {
    setSelectedAddress(index)
    handleAddress(addressData[index])
  }

  const handleAddress = (value) => {
    handleSelectAddress(value)
  }

  const setDefaultAddressAsSelected = () => {
    let foundDefault = false
    if (product && product.data.DeliveryMethods[0].DeliveryMethodPerPost.customProperties.returnAddresses) {
      product.data.DeliveryMethods[0].DeliveryMethodPerPost.customProperties.returnAddresses.forEach( (element, index) =>  {
        if (element.defaultAddress) {
          setSelectedAddress(index)
          handleAddress(product.data.DeliveryMethods[0].DeliveryMethodPerPost.customProperties.returnAddresses[index])
          setSubmitShow(true)
          foundDefault = true
        }
      })
      if (!foundDefault) {
        handleAddress(product.data.DeliveryMethods[0].DeliveryMethodPerPost.customProperties.returnAddresses[0])
        setSubmitShow(true)
        setSelectedAddress(0)
      }

    } 
  }

  const addressShowFunction = () => {
    let addressShow = ''

    if (product && product.data.id) {
      const addressData = product.data.DeliveryMethods[0].DeliveryMethodPerPost.customProperties.returnAddresses 
      if (addressData) {
        addressShow = addressData.map((item, index) => {
          const selected = index === selectedAddress
          return (<SellerAddressBox key={(index + item.city + item.addressLine1 + item.addressLine2).toString()} selected={selected}  onClick={() => handleClickSelectAddress(index, addressData)}>
            <StyledEditLink onClick={() => handleEditAddress(index)}>Edit</StyledEditLink>
            <StyledBoxText strong>{item.name}</StyledBoxText>
            <StyledBoxText>{item.number} {item.addressLine1} {item.addressLine2} {item.city}, {item.state} {item.zipCode}</StyledBoxText>
          </SellerAddressBox>)
        })
      }
   

    }
    return addressShow

  }

  
  if (loading) return <Loading pageLoading transparent size={60} />


  const  buttonShow = () => (<StyledPrimaryButton subtitle="Label Generator" onClick={() => handleNextStep(2)}  disabled={!submitShow}> Next</StyledPrimaryButton>)
  
  if (showAddressForm) return (<AddAddress handleError={handleError} setDefaultAddressAsSelected={setDefaultAddressAsSelected} addressShowFunction={addressShowFunction} isNewAddress={isNewAddress} setShowAddressForm={setShowAddressForm}  address={selectedAddressData} addressIndex={selectedAddress} product={product}/>)

  return ( 
     
    <FullfillSteps>
      <StyledSubTitle>Return Address</StyledSubTitle>
      <StyledStepText>Please select your return address to generate your label</StyledStepText>
      <Grid container spacing={3}>
        <Grid item xs={12}> 
          {addressShowFunction()}
        </Grid>
        <Grid item xs={12}> 
          <AddAddressLabel onClick={() => handleAddAddress()}>
            <AddAddressText>Add Address</AddAddressText>
            <AddIcon src={whiteAdd} />
          </AddAddressLabel>
        </Grid>
      </Grid>
      {buttonShow()}
    </FullfillSteps>



  )
}
  
Steps.propTypes = {
  handleNextStep: func,
  order: object,
  handleSelectAddress: func,
  handleError: func
}
export default injectIntl(withRouter(Steps))
