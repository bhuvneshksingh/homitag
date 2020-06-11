import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { string, func} from 'prop-types'
import Icon from 'components/Common/Icon'
import { getDeliveryMethods } from '../../../../../containers/Suppliers/Dashboard/Inventory/api'

const LightText = styled.p`
  font-size: 13px;
  color: #969696;
`

const BoldText = styled(LightText)`
  font-weight: bold;
  font-size: 14px;
  color: #969696;
`

const ArrowIcon = styled(Icon).attrs(props => ({
  color: props.theme.colors.homiPrimary,
  width: 10,
  height: 15
}))``

const ArrowUp = () => (
  <div>
    <ArrowIcon icon="arrow" style={{ transform: 'rotate(90deg)' }}/>
  </div>
)

const ArrowDown = () => (
  <div>
    <ArrowIcon icon="arrow" style={{ transform: 'rotate(-90deg)' }}/>
  </div>
)

const DeliveryMethodsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  width: 70%;
  height: 5%;
  border: .1px solid #00000024;
`
const Option = styled.div`
  padding: 10px;
  width: 70%;
  height: 5%;
  &: hover{
    background: #00000024;
  }
`

const DeliveryMethodSelect = props => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [deliveries, setDeliveries] = useState([])
  const [selectedDelivery, setSelectedDelivery] = useState(deliveries[0])

  const handleClick = () => {
    setOpen(!open)
  }
  const getDeliveries = () => {
    setLoading(true)
    getDeliveryMethods({category: props.category})
      .then(res => {
        setDeliveries(res.data.data)
      }).catch((e) =>{
        console.log(`Error + ${e.response.data.error}`)
      })
      .finally(() => setLoading(false))
  }
  useEffect(() => {
    getDeliveries()
  }, [])

  useEffect(() => {
    setSelectedDelivery(deliveries[0])
  }, [deliveries])

  const handleSelected = (delivery) => {
    setSelectedDelivery(delivery)
    setOpen(!open)
    props.onSelect(selectedDelivery)
  }

  const options = deliveries.map(delivery =>
    <Option onClick={() =>handleSelected(delivery)} key={delivery.code}>
      <BoldText>{delivery.name}</BoldText>
      <LightText>{delivery.description}</LightText>
    </Option>
  )
  if(loading) return 'Loading...'
  return(
    <>
      <DeliveryMethodsContainer onClick={handleClick}>
        <BoldText>{deliveries && selectedDelivery && selectedDelivery.name}</BoldText>
        {open ? <ArrowDown /> : <ArrowUp />}
      </DeliveryMethodsContainer>
      {open ? options : ''}
    </>
  )
}

DeliveryMethodSelect.propTypes = {
  category: string,
  onSelect: func
}

export default DeliveryMethodSelect
