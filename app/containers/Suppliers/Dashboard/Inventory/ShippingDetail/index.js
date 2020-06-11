import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import uuiidv1 from 'uuid/v1'
import { object } from 'prop-types'
import ArrowBackButton from '../../../../../components/Common/ArrowBackButton'
import ProductCard from '../../../../../components/Suppliers/Dashboard/Inventory/ShippingDetail/ProductCard'
import { getProductDetail, updateShipping, getDeliveryMethods } from '../api'
import history from '../../../../../utils/history'
import Loading from '../../../../../components/Common/Loading'
import closeIcon from '../../../../../assets/images/icons/close.png'
import EditAddressForm from '../../../../../components/Suppliers/Dashboard/Inventory/ShippingDetail/EditAddressForm'
import {
  PrimaryButton,
  OutlinePrimaryButton,
} from '../../../../../components/Common/Button'
import DeliveryMethodOption from '../../../../../components/Suppliers/Dashboard/Inventory/ShippingDetail/DeliveryMethodOption'

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

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
`

const ShippingDetail = props => {
  const [loadingProduct, setLoadingProduct] = useState(false)
  const [loadingDeliveryMethods, setLoadingDeliveryMethods] = useState(false)

  const [product, setProduct] = useState()
  const [deliveryMethods, setDeliveryMethods] = useState([])

  const [selectedItemWeight, setSelectedItemWeight] = useState()
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState()
  const [selectedCarrier, setSelectedCarrier] = useState()
  const [selectedAddress, setSelectedAddress] = useState()
  const [shippingCost, setShippingCost] = useState()
  const [freeShipping, setFreeShipping] = useState(true)

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
        if (!freeShipping && !shippingCost) {
          errors.shippingCost = 'Shipping cost is required'
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

  // eslint-disable-next-line no-unused-vars
  const [addressToUpdate, setAddressToUpdate] = useState('')
  const [showAddressForm, setShowAddressForm] = useState(false)
  const [addresses, setAddresses] = useState([])

  const [isNewAddress, setIsNewAddress] = useState(true)
  const productId = props.match.params.id

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
        console.log(e)
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
        console.log(e)
        // console.log(`Error + ${e.response.data.error}`)
      })
      .finally(() => setLoadingDeliveryMethods(false))
  }

  useEffect(() => {
    getList()
  }, [])

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
          providers: option.providers.map(provider => ({
            ...provider,
            selected: provider.code === selectedCarrier.code,
          })),
        })
      )

    const { uuid, ..._address } = selectedAddress || {}
    const deliveryMethod = {
      ...mergedDeliveryMethod,
      DeliveryMethodPerPost: {
        customProperties: {
          optionsAvailable,
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
    updateShipping(product.id, [deliveryMethod])
      .then(res => {
        history.push('/suppliers/inventory')
        console.log('Shipping update', res)
        return res
      })
      .catch(e => {
        console.log(e)
      })
  }

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

  if (loadingProduct || loadingDeliveryMethods)
    return <Loading pageLoading transparent size={60} />

  const onSelectDeliveryMethod = method => {
    setSelectedDeliveryMethod(method)
  }

  const availableMethods = (deliveryMethods || []).filter(
    method => method.code !== 'pickup'
  )

  if (product && product.id) {
    return (
      <>
        <ArrowBackButton
          title="Product"
          backRoute={`/suppliers/inventory/${product.id}`}
        />
        {!showAddressForm ? (
          <>
            <StyledTitle>Delivery Method</StyledTitle>
            <ContentWrapper>
              <ProductCard
                images={product.Product.ProductImages}
                name={product.title}
              />
              <DeliveryMethodWrapper>
                <LightText>
                  Please select a delivery method from below{' '}
                </LightText>
                {availableMethods.map(method => (
                  <>
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
                        if (
                          selectedDeliveryMethod.code === 'shipindependently'
                        ) {
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
                        if (
                          selectedDeliveryMethod.code === 'shipindependently'
                        ) {
                          setShippingCost()
                        }
                        setFreeShipping(value)
                      }}
                    />
                  </>
                ))}
                {validationErrors ? (
                  <>
                    {Object.keys(validationErrors).map(k => (
                      <ErrorMessage>{validationErrors[k]}</ErrorMessage>
                    ))}
                    <OutlinePrimaryButton
                      type="submit"
                      disabled
                      onClick={() => handleShippingUpdate()}
                    >
                      Update Shipping
                    </OutlinePrimaryButton>
                  </>
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
            </ContentWrapper>
          </>
        ) : (
          <>
            <StyledTitle>
              {isNewAddress ? 'Add Address' : 'Edit Address'}
            </StyledTitle>
            <ContentWrapper>
              <ProductCard
                images={product.Product.ProductImages}
                name={product.title}
              />
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
  return <></>
}

ShippingDetail.propTypes = {
  match: object,
}
export default ShippingDetail
