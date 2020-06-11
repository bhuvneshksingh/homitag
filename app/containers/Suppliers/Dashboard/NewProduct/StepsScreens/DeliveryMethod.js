import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import uuiidv1 from 'uuid/v1'
import Loading from 'components/Common/Loading'
import ProductCard from '../../../../../components/Suppliers/Dashboard/Inventory/ShippingDetail/ProductCard'
import { getDeliveryMethods } from '../../Inventory/api'
import DeliveryMethodOption from '../../../../../components/Suppliers/Dashboard/Inventory/ShippingDetail/DeliveryMethodOption'
import {
  PrimaryButton,
  OutlinePrimaryButton,
} from '../../../../../components/Common/Button'
import EditAddressForm from '../../../../../components/Suppliers/Dashboard/Inventory/ShippingDetail/EditAddressForm'
import closeIcon from '../../../../../assets/images/icons/close.svg'
import BackButton from './BackButton'

const StyledTitle = styled.div`
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 25px;
`

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 18% 70% 10%;
`
const DeliveryMethodWrapper = styled.div`
  padding-left: 40px;
`

const LightText = styled.p`
  font-size: 16px;
  line-height: 20px;
  color: #969696;
  margin-bottom: 10px;
  margin-top: 10px;
`

const CloseButton = styled.div`
  width: 20px;
  height: 20px;
  float: right;
  align-self: flex-end;
  margin: 20px;
  &:hover {
    cursor: pointer;
  }
`

const DeliveryMethod = ({
  onSubmit,
  handleGoBack,
  productCategory,
  productImages,
  productTitle,
  product,
}) => {
  const [loading, setLoading] = useState(false)
  const deliveryMethod =
    (product && product.DeliveryMethods && product.DeliveryMethods[0]) || {}
  const customProperties =
    (deliveryMethod &&
      deliveryMethod.DeliveryMethodPerPost &&
      deliveryMethod.DeliveryMethodPerPost.customProperties) ||
    {}
  const selectedOptionAvailable =
    ((customProperties && customProperties.optionsAvailable) || []).find(
      option => option.selected
    ) || {}
  const selectedProvider =
    ((selectedOptionAvailable && selectedOptionAvailable.providers) || []).find(
      option => option.selected
    ) || {}
  const deliveryMethodAddresses =
    product.DeliveryMethods &&
    product.DeliveryMethods.reduce((_addresses, _product) => {
      const returnAddress =
        _product.DeliveryMethodPerPost.customProperties.returnAddresses
      if (returnAddress) {
        const notEmptyObjectEmpty = obj => Object.keys(obj).length > 0
        return _addresses.concat(returnAddress.filter(notEmptyObjectEmpty))
      }
      return _addresses
    }, []).map(_address => ({ ..._address, uuid: _address.uuid || uuiidv1() }))
  const [addresses, setAddresses] = useState(
    (
      (product &&
        product.DeliveryMethods &&
        product.DeliveryMethods.reduce((_addresses, _product) => {
          const returnAddress =
            _product.DeliveryMethodPerPost.customProperties.returnAddresses
          if (returnAddress) {
            return _addresses.concat(returnAddress)
          }
          return _addresses
        }, [])) ||
      []
    ).map(_address => ({ ..._address, uuid: _address.uuid || uuiidv1() }))
  )

  const [deliveryMethods, setDeliveryMethods] = useState([])
  const [selectedItemWeight, setSelectedItemWeight] = useState(
    selectedOptionAvailable && selectedOptionAvailable.weightRange
  )
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(
    deliveryMethod
  )
  const [selectedCarrier, setSelectedCarrier] = useState(selectedProvider)
  const [selectedAddress, setSelectedAddress] = useState(
    deliveryMethodAddresses && deliveryMethodAddresses[0]
  )
  const [shippingCost, setShippingCost] = useState(
    customProperties.shippingCost
  )

  const [freeShipping, setFreeShipping] = useState(
    customProperties.freeOption && customProperties.freeOption.valueSelected
  )

  // eslint-disable-next-line no-unused-vars
  const [addressToUpdate, setAddressToUpdate] = useState('')
  const [showAddressForm, setShowAddressForm] = useState(false)

  const [isNewAddress, setIsNewAddress] = useState(true)

  function fetchDeliveryMethods() {
    setLoading(true)
    getDeliveryMethods({ category: productCategory.id })
      .then(res => {
        setDeliveryMethods(res.data.data)
      })
      .catch(e => {
        console.log(`Error + ${e.response.data.error}`)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchDeliveryMethods()
  }, [])

  const onSubmitAddress = address => {
    if (isNewAddress) {
      setAddresses(_addresses => {
        const newAddress = { ...address, uuid: uuiidv1() }
        if (_addresses.length === 0) {
          // if there is no addresses we set the new one as the selected address
          setSelectedAddress(newAddress)
        }
        return _addresses.concat(newAddress)
      })
    } else {
      setAddresses(_addresses => {
        const addressWithoutUpdatedOne = _addresses.filter(
          a => a.uuid !== addressToUpdate.uuid
        )
        if (selectedAddress.uuid === address.uuid) {
          setSelectedAddress(address)
        }
        return [...addressWithoutUpdatedOne, address]
      })
    }
    setShowAddressForm(false)
    setAddressToUpdate(null)
    setIsNewAddress(null)
  }

  if (loading) {
    return <Loading pageLoading transparent size={60} />
  }

  const onSelectDeliveryMethod = method => {
    setSelectedDeliveryMethod(method)
  }

  const availableMethods = (deliveryMethods || []).filter(
    method => method.code !== 'pickup'
  )

  function isObjectEmpty(obj) {
    if (!obj) return true
    return Object.keys(obj).length === 0
  }

  function areObjectKeysEmpty(obj = {}) {
    if (isObjectEmpty(obj)) return true
    return Object.keys(obj).every(k => obj[k] === null || obj[k] === undefined || obj[k] === '')
  }

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
          providers: option.providers.map(provider => ({
            ...provider,
            selected: provider.code === selectedCarrier.code,
          })),
        })
      )

    // eslint-disable-next-line no-shadow
    const deliveryMethod = {
      ...mergedDeliveryMethod,
      DeliveryMethodPerPost: {
        customProperties: {
          optionsAvailable,
          freeOption: {
            ...mergedDeliveryMethod.deliveryCustomProperties.freeOption,
            valueSelected: freeShipping,
          },
          ...(selectedAddress && { returnAddresses: [selectedAddress] }),
          ...(mergedDeliveryMethod.code === 'shipindependently' && {
            shippingCost: shippingCost || 0,
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
    onSubmit(deliveryMethod)
  }

  function isFormInvalid() {
    if (areObjectKeysEmpty(selectedDeliveryMethod)) return true
    if (selectedDeliveryMethod.code !== 'shipindependently') {
      const isAddressEmpty = areObjectKeysEmpty(selectedAddress)
      const isItemWeightEmpty = !selectedItemWeight
      const isCarrierEmpty = areObjectKeysEmpty(selectedCarrier)
      if (isAddressEmpty || isItemWeightEmpty || isCarrierEmpty) return true
    }
    return false
  }

  if (loading) return <h2>Loading</h2>

  return (
    <>
      <BackButton onClick={handleGoBack} title="Price + Quantity" />
      {!showAddressForm ? (
        <>
          <StyledTitle>Delivery Method</StyledTitle>
          <ContentWrapper>
            <ProductCard images={productImages} name={productTitle} />
            <DeliveryMethodWrapper>
              <LightText>Please select a delivery method from below </LightText>
              {availableMethods.map(method => (
                <DeliveryMethodOption
                  key={method.id}
                  method={method}
                  addresses={addresses}
                  handleAddAddress={() => {
                    setShowAddressForm(true)
                    setIsNewAddress(true)
                    setAddressToUpdate(null)
                  }}
                  onAddressSelect={_address => {
                    setAddressToUpdate(_address)
                    setIsNewAddress(false)
                    setShowAddressForm(true)
                  }}
                  onSelectAddress={setSelectedAddress}
                  selectedAddress={selectedAddress}
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
              ))}
              {isFormInvalid() ? (
                <OutlinePrimaryButton subtitle="Product Preview" disabled>
                  Next
                </OutlinePrimaryButton>
              ) : (
                <PrimaryButton
                  type="submit"
                  subtitle="Product Preview"
                  onClick={() => handleShippingUpdate()}
                >
                  Next
                </PrimaryButton>
              )}
            </DeliveryMethodWrapper>
          </ContentWrapper>
        </>
      ) : (
        <>
          <StyledTitle>
            {isNewAddress ? 'Add Address' : 'Edit Address'}
          </StyledTitle>
          <ContentWrapper>
            <ProductCard images={productImages} name={productTitle} />
            <DeliveryMethodWrapper>
              <CloseButton onClick={() => setShowAddressForm(false)}>
                <img src={closeIcon} alt="" />
              </CloseButton>
              <EditAddressForm
                address={addressToUpdate}
                onSubmit={onSubmitAddress}
              />
            </DeliveryMethodWrapper>
          </ContentWrapper>
        </>
      )}
    </>
  )
}

DeliveryMethod.propTypes = {
  handleGoBack: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  productCategory: PropTypes.object.isRequired,
  productImages: PropTypes.arrayOf(PropTypes.object).isRequired,
  productTitle: PropTypes.string.isRequired,
  product: PropTypes.object,
}

export default DeliveryMethod
