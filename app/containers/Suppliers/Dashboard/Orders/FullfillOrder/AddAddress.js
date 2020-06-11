
import React from 'react'
import { injectIntl } from 'react-intl'
import styled from 'styled-components'
import { bool, func, object, number } from 'prop-types'
import closeIcon from '../../../../../assets/images/icons/closeWhite.svg'
import { postModify } from '../api'
import EditAddressForm from '../../../../../components/Suppliers/Dashboard/Orders/FullfillOrder/EditAddressForm'


const AddAdressWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
`

const StyledTitle = styled.div`
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 25px;
`


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

const AddAddress = ({isNewAddress, setShowAddressForm, address, addressIndex,  product, addressShowFunction, setDefaultAddressAsSelected}) => { 

  const handleDelete = () => { 
    setShowAddressForm(false)

    const body = product.data.DeliveryMethods[0]
    body.DeliveryMethodPerPost.customProperties.returnAddresses.splice(addressIndex, 1)

    const bodySend = { 'deliveryMethods': [body] }

    postModify(product.data.id, bodySend)
      .then(result => {
        if(result.status === 200){
          // showConfirmationModal(true)
          // console.log('OK!')
        }
      })
      .catch(() => {
        // console.log(`NOT OK!${  e.response.data.result.content.message}`)
        // showErrorModal(true)
        // showErrorMessage(e.response.data.result.content.message)
      })

    addressShowFunction()
    setDefaultAddressAsSelected()
  }

  const onSubmitAddress = addressFromForm => {

    const body = product.data.DeliveryMethods[0]


    if (addressFromForm.defaultAddress) {
      if (body.DeliveryMethodPerPost.customProperties.returnAddresses) {
        body.DeliveryMethodPerPost.customProperties.returnAddresses.forEach( (element, index) =>  {
          body.DeliveryMethodPerPost.customProperties.returnAddresses[index].defaultAddress = false
        })
      }
    }


    if (isNewAddress ) {
      if (body.DeliveryMethodPerPost.customProperties.returnAddresses) {
        body.DeliveryMethodPerPost.customProperties.returnAddresses.push(addressFromForm)
      }else{

        body.DeliveryMethodPerPost.customProperties.returnAddresses = []
        body.DeliveryMethodPerPost.customProperties.returnAddresses.push(addressFromForm)
      }

    }else{
      body.DeliveryMethodPerPost.customProperties.returnAddresses[addressIndex] = addressFromForm
    }

    const bodySend = { 'deliveryMethods': [body] }

    postModify(product.data.id, bodySend)
      .then(result => {
        if(result.status === 200){
          // showConfirmationModal(true)
          // console.log('OK!')
        }
      })
      .catch(() => {
        // console.log(`NOT OK!${  e.response.data.result.content.message}`)
        // showErrorModal(true)
        // showErrorMessage(e.response.data.result.content.message)
      })
    /**/
    addressShowFunction()
    setDefaultAddressAsSelected()
    setShowAddressForm(false)

  }




  return (<AddAdressWrapper>
    <StyledTitle>
      {isNewAddress ? 'Add Address' : 'Edit Address'}
    </StyledTitle>
    <CloseButton onClick={() => setShowAddressForm(false)}>
      <img src={closeIcon} alt="" />
    </CloseButton>
    <EditAddressForm
      address={address}
      onSubmit={onSubmitAddress}
      handleDelete={handleDelete}
    />
  </AddAdressWrapper>)
}



AddAddress.propTypes = {
  isNewAddress: bool,
  setShowAddressForm: func,
  address: object,
  addressIndex: number,
  product: object,
  addressShowFunction: func,
  setDefaultAddressAsSelected: func
}
export default injectIntl(AddAddress)

