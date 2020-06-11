import React, { useEffect, useState } from 'react'
import { injectIntl } from 'react-intl'
import styled from 'styled-components'
import uuiidv1 from 'uuid/v1'
import { object, func } from 'prop-types'
import { withRouter } from 'react-router'
import { Typography } from '@material-ui/core'
import {
  PrimaryButton,
  OutlinePrimaryButton,
} from '../../../../../../components/Common/Button'
import { getProductDetail, getDeliveryMethods, getOrderDetail } from '../../api'
import Loading from '../../../../../../components/Common/Loading'

import DeliveryMethodOption from '../../../../../../components/Suppliers/Dashboard/Orders/Returns/ShippingDetail/DeliveryMethodOption'

const ShippingDetailsContext = React.createContext()

export function useShippingDetails() {
  const context = React.useContext(ShippingDetailsContext)
  if (context === undefined) {
    throw new Error(
      `useShippingDetails must be used within a ShippingDetailsContext`
    )
  }
  return context
}

const DeclineReturnForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
`

const StyledSubTitleRadios = styled(Typography)`
  && {
    font-weight: bold;
    font-size: 16px;
    line-height: 20px;
    color: ${({ theme }) => theme.colors.homiBlack};
    margin: 20px 0px 0px 0px;
  }
`

const DeliveryMethodWrapper = styled.div`
  padding-left: 0px;
`

const LightText = styled.p`
  font-size: 16px;
  line-height: 20px;
  color: #969696;
  margin-bottom: 10px;
  margin-top: 10px;
`

const AcceptForm = ({ match, handleDecline }) => {
  const [loadingProduct, setLoadingProduct] = useState(false)
  const [loadingDeliveryMethods, setLoadingDeliveryMethods] = useState(false)

  const [loading, setLoading] = useState(false)
  const [product, setProduct] = useState()
  const [deliveryMethods, setDeliveryMethods] = useState([])

  const [selectedItemWeight, setSelectedItemWeight] = useState()
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState()
  const [selectedCarrier, setSelectedCarrier] = useState()
  const [selectedAddress, setSelectedAddress] = useState()
  const [shippingCost, setShippingCost] = useState()
  const [freeShipping, setFreeShipping] = useState(true)

  const [addressToUpdate, setAddressToUpdate] = useState('')
  const [showAddressForm, setShowAddressForm] = useState(false)
  const [addresses, setAddresses] = useState([])

  const [isNewAddress, setIsNewAddress] = useState(true)
  const [order, setOrder] = useState({})
  const [shippingIndData, setShippingIndData] = useState({
    carrier: '',
    otherCarrier: '',
    trackingId: '',
    labelData: '',
  })

  // const productId = props.match.params.id
  const productId = 'be61c8b5-32d2-4c8e-b67c-44aaeb14879f'

  const validationErrors = false
  /*
  const validationErrors = getValidationErrors()
  
  function getValidationErrors() {
    const errors = {}
    if (!selectedDeliveryMethod) {
      errors.selectedDeliveryMethod = 'You need to select the a delivery method'
    } else if (selectedDeliveryMethod) {
      if (selectedDeliveryMethod.code === 'shipindependently') {
        if (
          parseFloat(shippingCost) + parseFloat(product.initialPrice) >
          1500
        ) {
          errors.shippingCost = 'The price + shipping cannot be more than 1500'
        }
      } else if (selectedDeliveryMethod.code === 'homitagshipping') {
        if (!selectedItemWeight) {
          errors.selectedItemWeight = 'You need to select the Item Weight'
        }
        if (!selectedCarrier) {
          errors.selectedCarrier = 'You need to select the a carrier'
        }
        if (!selectedAddress) {
          errors.selectedAddress = 'You need to select the an address'
        }
        if (parseFloat(shippingCost) + parseFloat(product.initialPrice) > 500) {
          errors.shippingCost = 'The price + shipping cannot be more than 500'
        }
      }
    }
    const thereIsErrors = Object.keys(errors).length > 0
    return thereIsErrors ? errors : null
  }
  */

  const orderId = match.params.id

  const getOrder = () => {
    setLoading(true)
    getOrderDetail(orderId)
      .then(res => setOrder(res.data))
      .finally(() => setLoading(false))
  }
  useEffect(() => {
    getOrder()
  }, [])

  const getList = () => {
    setLoadingProduct(true)
    getProductDetail(productId)
      .then(res => {
        const fetchedProduct = res.data.data
        fetchDeliveryMethods(fetchedProduct.Product.Category.id)
        setProduct(fetchedProduct)
        const deliveryMethod =
          (fetchedProduct.DeliveryMethods &&
            fetchedProduct.DeliveryMethods[0]) ||
          {}
        setSelectedDeliveryMethod(deliveryMethod)

        const { customProperties } =
          (deliveryMethod && deliveryMethod.DeliveryMethodPerPost) || {}

        setFreeShipping(
          customProperties.freeOption &&
            customProperties.freeOption.valueSelected
        )

        const selectedOptionAvailable =
          (customProperties.optionsAvailable || []).find(
            option => option.selected
          ) || {}

        setSelectedItemWeight(
          selectedOptionAvailable && selectedOptionAvailable.weightRange
        )

        const selectedProvider =
          (
            (selectedOptionAvailable && selectedOptionAvailable.providers) ||
            []
          ).find(option => option.selected) || {}

        setSelectedCarrier(selectedProvider)

        setShippingCost(customProperties.shippingCost)
        const deliveryMethodAddresses = fetchedProduct.DeliveryMethods.reduce(
          (_addresses, _product) => {
            const returnAddress =
              _product.DeliveryMethodPerPost.customProperties.returnAddresses
            if (returnAddress) {
              const notEmptyObjectEmpty = obj => Object.keys(obj).length > 0
              return _addresses.concat(
                returnAddress.filter(notEmptyObjectEmpty)
              )
            }
            return _addresses
          },
          []
        ).map(_address => ({ ..._address, uuid: uuiidv1() }))
        setSelectedAddress(
          deliveryMethodAddresses && deliveryMethodAddresses[0]
        )
        setAddresses(deliveryMethodAddresses)
      })
      .catch(e => {
        // console.log(e)
        // if (e.response.data.error === 'Post not found') {
        //   history.push('/suppliers/inventory')
        // }
      })
      .finally(() => setLoadingProduct(false))
  }

  // console.log('delivery methods', deliveryMethods)
  // console.log('selected delivery method', selectedDeliveryMethod)
  const fetchDeliveryMethods = category => {
    setLoadingDeliveryMethods(true)
    getDeliveryMethods({ category })
      .then(res => {
        const fetchedDeliveryMethods = res.data.data
        setDeliveryMethods(fetchedDeliveryMethods)
      })
      .catch(e => {
        // console.log(e)
        // console.log(`Error + ${e.response.data.error}`)
      })
      .finally(() => setLoadingDeliveryMethods(false))
  }

  useEffect(() => {
    getList()
  }, [])

  const onAddressSelect = value => {
    setSelectedAddress(value)
  }

  // console.log(deliveryMethod)
  const handleShippingUpdate = () => {
    const selectedDeliveryMethodMatch = deliveryMethods.find(
      method => method.id === selectedDeliveryMethod.id
    )

    const mergedDeliveryMethod = {
      ...selectedDeliveryMethodMatch,
      ...selectedDeliveryMethod,
    }
    const optionsAvailable =
      mergedDeliveryMethod.deliveryCustomProperties.optionsAvailable &&
      mergedDeliveryMethod.deliveryCustomProperties.optionsAvailable.map(
        option => ({
          ...option,
          selected: selectedItemWeight === option.weightRange,
        })
      )

    const { uuid, ..._address } = selectedAddress || {}
    const deliveryMethod = {
      ...mergedDeliveryMethod,
      DeliveryMethodPerPost: {
        customProperties: {
          freeOption: {
            valueSelected: freeShipping,
          },
          ...(_address && { returnAddresses: [_address] }),
          ...(mergedDeliveryMethod.code === 'shipindependently' && {
            shippingCost,
          }),
        },
      },
      deliveryCustomProperties: {
        ...mergedDeliveryMethod.deliveryCustomProperties,
        freeOption: {
          ...mergedDeliveryMethod.deliveryCustomProperties.freeOption,
          valueSelected: freeShipping,
        },
        optionsAvailable,
      },
    }
    /*
    updateShipping(product.id, [deliveryMethod])
      .then(res => {
        history.push('/suppliers/inventory')
        console.log('Shipping update', res)
        return res
      })
      .catch(e => {
        console.log(e)
      })
      */
    /*
    console.log('selectedDeliveryMethod?')
    console.log(selectedDeliveryMethod)
    console.log('SUBMITTING Address?')
    console.log(selectedAddress)
    console.log('Item Weight?')
    console.log(selectedItemWeight)
    console.log('shippingIndData')
    console.log(shippingIndData)
    */
  }

  function validateInputs(values) {
    const errors = {}
    const requiredFields = ['comment']

    const fieldFormat = {
      comment: 'Comment',
    }
    requiredFields.forEach(field => {
      if (
        values[field] === undefined ||
        values[field] === null ||
        values[field] === ''
      ) {
        errors[field] = `* ${fieldFormat[field]} is required`
      }
    })

    return errors
  }

  const handleValidation = values => {
    if (Object.keys(validateInputs(values)).length === 0) {
      return true
    }
    return false
  }

  const handleSubmit = values => {
    if (handleValidation(values)) {
      handleDecline(values)
    }
  }

  if (loadingProduct || loadingDeliveryMethods)
    return <Loading pageLoading transparent size={60} />

  const onSelectDeliveryMethod = method => {
    setSelectedDeliveryMethod(method)
  }

  const availableMethods = (deliveryMethods || []).filter(
    method => method.code !== 'pickup'
  )

  if (loading) return <Loading pageLoading transparent size={60} />
  if (order && order.id && product && product.id) {
    return (
      <DeclineReturnForm>
        <StyledSubTitleRadios> Return Label</StyledSubTitleRadios>

        <DeliveryMethodWrapper>
          <LightText>Please select a delivery method from below </LightText>
          {availableMethods.map(method => (
            <>
              <DeliveryMethodOption
                order={order}
                key={method.id}
                method={method}
                product={product}
                setShippingIndData={setShippingIndData}
                onAddressSelect={onAddressSelect}
                selectedMethod={selectedDeliveryMethod}
                shippingCost={shippingCost}
                onShippingCostChange={shipping => {
                  const parsedShippingCost = parseInt(shipping, 10)
                  if (selectedDeliveryMethod.code === 'shipindependently') {
                    if (parsedShippingCost) {
                      setFreeShipping(false)
                    } else {
                      setFreeShipping(true)
                    }
                  }
                  setShippingCost(shipping)
                }}
                onSelectItemWeight={itemWeight => {
                  setSelectedItemWeight(itemWeight)
                  setSelectedCarrier()
                }}
                selectedItemWeight={selectedItemWeight}
                onSelectCarrier={carrier => {
                  setSelectedCarrier(carrier)
                }}
                selectedCarrier={selectedCarrier}
                onSelectDeliveryMethod={onSelectDeliveryMethod}
                freeShipping={freeShipping}
                setFreeShipping={value => {
                  if (selectedDeliveryMethod.code === 'shipindependently') {
                    setShippingCost()
                  }
                  setFreeShipping(value)
                }}
              />
            </>
          ))}
          {validationErrors ? (
            <OutlinePrimaryButton
              style={{ marginTop: 36 }}
              type="submit"
              disabled
              onClick={() => handleShippingUpdate()}
            >
              Update Shipping
            </OutlinePrimaryButton>
          ) : (
            <PrimaryButton
              style={{ marginTop: 36 }}
              type="submit"
              onClick={() => handleShippingUpdate()}
            >
              Update Shipping
            </PrimaryButton>
          )}
        </DeliveryMethodWrapper>
      </DeclineReturnForm>
    )
  }
  return null
}
AcceptForm.propTypes = {
  intl: object,
  handleDecline: func,
  match: object,
  history: object,
}
export default injectIntl(withRouter(AcceptForm))
