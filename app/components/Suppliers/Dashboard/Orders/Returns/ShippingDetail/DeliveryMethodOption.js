import React, { useState } from 'react'
import styled from 'styled-components'
import { object, string, func, bool, array } from 'prop-types'
import { Link } from 'react-router-dom'
import Icon from 'components/Common/Icon'
import { Typography } from '@material-ui/core'
import { StyledCheckbox } from '../../../../../Common/Form/Checkbox'
import PriceInput from '../../../PriceInput'
import whiteAdd from '../../../../../../assets/images/icons/plus.svg'
import WeightCard from './WeightCard'
import YesNoSwitch from './YesNoSwitch'
import Addresses from '../../../Addresses'
import AddLabelDetails from '../../AddLabelDetails'
// const StyledYesNoSwitch = styled
const StyledSubTitleRadios = styled(Typography)`
  && {
    font-weight: bold;
    font-size: 16px;
    line-height: 20px;
    color: ${({ theme }) => theme.colors.homiBlack};
    margin: 20px 0px 0px 0px;
  }
`
const OptionWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-top: 10px;
`
const ShippingMethodsWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: auto 10%;
`
const CustomDetailsWrapper = styled.div`
  padding: 20px;
`
const SmallLightText = styled.p`
  font-size: 13px;
  color: #969696;
`
const LightText = styled.p`
  font-size: 16px;
  color: #969696;
  margin-bottom: 10px;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
`

const BoldText = styled(LightText)`
  font-weight: bold;
  font-size: 14px;
  color: #969696;
`
const AddressLabel = styled.div`
  height: 80px;
  background: ${props => (props.selected ? '#7471FF' : '#E8E8E8')};
  color: ${props => (props.selected ? '#E8E8E8' : '#7471FF')};
  border-radius: 10px;
  margin-bottom: 20px;
`
const LightAddressText = styled(LightText)`
  margin-left: 20px;
  color: inherit;
  font-size: 16px;
`
const LightSmallText = styled(LightText)`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  margin-top: 50px;
`
const BoldAddressText = styled(LightText)`
  color: inherit;
  margin-left: 20px;
  margin-top: 15px;
  font-weight: 600;
`
const EditAddressText = styled(BoldAddressText)`
  margin-top: 20px;
  color: inherit;
  margin-right: 20px;
  font-size: 14px;
  text-decoration: underline;
  &&:hover {
    cursor: pointer;
  }
`
const AddAddressLabel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  border: 1px solid #00bdaa;
  background: #00bdaa;
  border-radius: 10px;
  &:hover {
    cursor: pointer;
    background: #05b09f;
  }
`
const AddIcon = styled.img`
  width: 20px;
  height: 20px;
`
const AddAddressText = styled.p`
  color: #ffffff;
  margin-right: 20px;
  font-size: 16px;
  font-weight: 600;
`
const StyledTitle = styled.div`
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 25px;
`
const StyledSubtitle = styled(StyledTitle)`
  margin-top: 20px;
  text-align: start;
  font-size: 16px;
`
const WeightWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: no-wrap;
  overflow-x: auto;
  overflow-y: hidden;
`
const CarrierWrapper = styled.div`
  display: flex;
  width: 33%;
  margin-top: 10px;
  justify-content: space-between;
`
const FreeShippingWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`

const ShippingCostWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`

const ShippingPolicy = styled(Link)`
  text-decoration: underline;
  font-weight: bold;
  color: #969696;
  &:hover {
    cursor: pointer;
  }
`
const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`
const ArrowIcon = styled(Icon).attrs(props => ({
  color: props.theme.colors.homiPrimary,
  width: 10,
  height: 15,
}))``

const ArrowUp = () => (
  <div>
    <ArrowIcon icon="arrow" style={{ transform: 'rotate(90deg)' }} />
  </div>
)

const ArrowDown = () => (
  <div>
    <ArrowIcon icon="arrow" style={{ transform: 'rotate(-90deg)' }} />
  </div>
)

const DeliveryMethodOption = props => {
  const [checked, setChecked] = useState(false)
  const [fullfillData, setFullfillData] = useState({
    address: {},
    shippedBy: {},
  })

  const [modalOpen, setModalOpen] = useState(false)
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSelectAddress = address2 => {
    console.log(address2)
    setFullfillData({ ...fullfillData, address: address2 })
  }

  const handleError = message => {
    setModalOpen(true)
    setShowError(true)
    setErrorMessage(message)
  }
  const handleSelect = () => {
    setChecked(!checked)
    const selected = props.method
    props.onSelectDeliveryMethod(selected)
  }

  const handleAddressSelect = address => {
    props.onAddressSelect(address)
  }

  const carrierOptions =
    props.method.deliveryCustomProperties.optionsAvailable &&
    props.method.deliveryCustomProperties.optionsAvailable.filter(
      option => option.weightRange === props.selectedItemWeight
    )

  const isSelected =
    (props.selectedMethod && props.selectedMethod.id) ===
    (props.method && props.method.id)

  return (
    <>
      <OptionWrapper>
        <StyledCheckbox checked={isSelected} onClick={handleSelect} />
        <ShippingMethodsWrapper>
          <div>
            <BoldText>{props.method.name}</BoldText>
            <SmallLightText>{props.method.description}</SmallLightText>
          </div>
          {isSelected ? <ArrowDown /> : <ArrowUp />}
        </ShippingMethodsWrapper>
      </OptionWrapper>
      {isSelected ? (
        <>
          {props.method.code === 'shipindependently' ? (
            <>
              <CustomDetailsWrapper>
                <StyledSubTitleRadios> Label Upload</StyledSubTitleRadios>
                <FreeShippingWrapper>
                  <LightText>
                    Please upload the label to share with the buyer
                  </LightText>
                </FreeShippingWrapper>
                <ShippingCostWrapper>
                  <AddLabelDetails
                    order={props.order}
                    setShippingIndData={props.setShippingIndData}
                  />
                </ShippingCostWrapper>
                <LightSmallText>
                  By selecting this option, you agree to comply with our{' '}
                  <ShippingPolicy to="/suppliers/shipping-policy">
                    Shipping Policy
                  </ShippingPolicy>{' '}
                  and provide tracking information
                </LightSmallText>
              </CustomDetailsWrapper>
            </>
          ) : (
            <CustomDetailsWrapper>
              <LightText>
                Please select a return address to generate your label{' '}
              </LightText>
              <Addresses
                addresses={props.addresses}
                order={props.order}
                handleSelectAddress={handleAddressSelect}
                handleError={handleError}
                product={props.product}
              />

              <StyledSubtitle>Select Item Weight</StyledSubtitle>
              <LightText>
                Please ship anything over 150lbs independently
              </LightText>
              <WeightWrapper>
                {props.method.deliveryCustomProperties.optionsAvailable &&
                  props.method.deliveryCustomProperties.optionsAvailable.map(
                    option => (
                      <WeightCard
                        text={option.weightRange}
                        onClick={() =>
                          props.onSelectItemWeight(option.weightRange)
                        }
                        selected={
                          props.selectedItemWeight === option.weightRange
                        }
                      />
                    )
                  )}
              </WeightWrapper>
            </CustomDetailsWrapper>
          )}
        </>
      ) : (
        ''
      )}
    </>
  )
}

DeliveryMethodOption.propTypes = {
  method: object,
  selectedMethod: object,
  order: object,
  onSelectDeliveryMethod: func,
  onAddressSelect: func,
  handleAddAddress: func,
  onSelectItemWeight: func,
  selectedItemWeight: string,
  onSelectCarrier: func,
  selectedCarrier: object,
  freeShipping: bool,
  setFreeShipping: func,
  onSelectAddress: func.isRequired,
  onShippingCostChange: func.isRequired,
  shippingCost: string,
  selectedAddress: object,
}
export default DeliveryMethodOption
