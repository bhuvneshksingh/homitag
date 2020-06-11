import React, { Fragment, useState, useEffect } from 'react'
import { injectIntl } from 'react-intl'
import styled from 'styled-components'
import { object } from 'prop-types'
import { getOrderDetail } from '../api'
import Loading from '../../../../../components/Common/Loading'
import ArrowBackButton from '../../../../../components/Common/ArrowBackButton'

const StyledTitle = styled.div`
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 25px;
`




const TrackItems = ({ match }) => {
  const [order, setOrder] = useState({})
  const [loading, setLoading] = useState(false)
  const orderId = match.params.id

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
  if(order && order.id){
    return ( 
      <Fragment>
        <ArrowBackButton title='Orders' backRoute='/suppliers/orders'/>
        <StyledTitle>Track Items</StyledTitle>
        <StyledTitle>{order.deliveryMethod.otherCarrier}</StyledTitle>
        <StyledTitle>{order.trackingId}</StyledTitle>
      </Fragment>
    )
  }
  return (<Fragment>
    <ArrowBackButton title='Orders' backRoute='/suppliers/orders'/>
    <StyledTitle>Track Items</StyledTitle>
    <StyledTitle>Track Items</StyledTitle>

  </Fragment>)
  

  


}

TrackItems.propTypes = {
  match: object,
}
export default injectIntl(TrackItems)
