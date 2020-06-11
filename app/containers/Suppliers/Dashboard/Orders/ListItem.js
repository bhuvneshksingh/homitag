import React from 'react'
import propTypes from 'prop-types'
import styled from 'styled-components'
import { Grid, Button } from '@material-ui/core'
import { injectIntl } from 'react-intl'
import { format, parseISO } from 'date-fns'
import { Link } from 'react-router-dom'
import ActionButton from '../../../../components/Suppliers/Dashboard/Orders/ActionButton';
import ProductDetailImages from '../../../../components/Suppliers/Dashboard/Orders/OrderDetail/ProductDetail/ProductDetailImages'
import Routes from '../../Router/Routes.json'
import messages from './messages'

const ItemWrapper = styled(Grid).attrs({
  container: true,
  spacing: 1,
  alignItems: 'center',
  justify: 'space-between',
})`
  background: ${({ theme }) => theme.colors.homiBlack};
  border-radius: 10px;
  height: 112px;
  padding: 0 20px;
  && {
    color: ${({ theme }) => theme.colors.homiWhite};
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
    margin-bottom: 15px;
  }
`

const StyledText = styled.div`
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  width: 100px;
  max-height: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  white-space: nowrap;
  word-wrap: break-word;
  white-space: pre-wrap;
  color: white;
  text-decoration: none;
`
const StyledLink = styled(Link)`
&& {
  color: ${({ theme }) => theme.colors.homiBlack};
  text-decoration: none
} 
:hover {
  color: ${({ theme }) => theme.colors.homiWhite};
  text-decoration: none
}`

const StyledTrackingLink = styled.a`
&& {
  color: ${({ theme }) => theme.colors.homiBlack};
  text-decoration: none
} 
:hover {
  color: ${({ theme }) => theme.colors.homiWhite};
  text-decoration: none
}`

const StyledStatus = styled(StyledText)`
  width: 100px;
  overflow: auto;
  word-wrap: none;
  text-overflow: none;
`

const StyledGrid = styled(Grid)`
  && button {
    margin: 5px;
  }
`

const StyledItemPrimaryButton = styled(Button)`
  && {
    background: ${({ theme }) => theme.colors.homiPrimary};
    border-radius: 6px;
    color: ${({ theme }) => theme.colors.homiWhite};
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
    height: 35px;
    width: 100%;
    text-transform: none;
  }
  :hover {
    color: ${({ theme }) => theme.colors.homiWhite};
  }
`
const StyledItemSecondaryButton = styled(Button)`
  && {
    background: ${({ theme }) => theme.colors.homiGrey};
    border-radius: 6px;
    color: ${({ theme }) => theme.colors.homiBlack};
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
    height: 35px;
    width: 100%;
    text-transform: none;
  }
  :hover {
    color: ${({ theme }) => theme.colors.homiWhite};
  }
`


const ListItem = ({ intl,  item , shipped, type, onClose}) => {
  const itemsOptions = []
  const fullFillOrder = <StyledLink to={`${Routes.Suppliers}/orders/order/fullfill-order/${item.id}`} key="fullFillOrder">
    <StyledItemPrimaryButton>
    Fullfill Order
    </StyledItemPrimaryButton> 
  </StyledLink>

  const viewDetails = <StyledLink
    key="viewDetails"
    to={{
      pathname: `${Routes.Suppliers}/orders/order/${item.id}`
    }}  ordertype={type}>
    <StyledItemSecondaryButton color="secondary" >
    View Details
    </StyledItemSecondaryButton>
  </StyledLink>

  let trackItemLink = ''
  let trackItems = ''

  if (item.deliveryMethod.carrier === 'fedex') {
    trackItemLink = `https://www.fedex.com/apps/fedextrack/?action=track&trackingnumber=${  item.trackingId}`
  }
  if (item.deliveryMethod.carrier === 'dhl') {
    trackItemLink = `https://www.logistics.dhl/us-en/home/tracking/tracking-freight.html?submit=1&tracking-id=${  item.trackingId}`
  }  
  if (item.deliveryMethod.carrier === 'ups') {
    trackItemLink = `https://www.ups.com/track?loc=en_US&tracknum=${  item.trackingId}`
  } 
  if (item.deliveryMethod.carrier === 'usps') {
    trackItemLink = `https://tools.usps.com/go/TrackConfirmAction?qtc_tLabels1=${  item.trackingId}`
  }

  if (item.deliveryMethod.carrier !== 'Other Specify') {

    trackItems = <StyledTrackingLink  
      key="trackItems" 
      href={trackItemLink}
      target="_blank">
      <StyledItemSecondaryButton color="secondary">
        Track Items
      </StyledItemSecondaryButton>
    </StyledTrackingLink>

  }

  if (item.deliveryMethod.carrier === 'Other Specify' && item.deliveryMethod.otherCarrier !== ''  && item.trackingId !== '') {

    trackItems = <StyledLink 
      key="trackItems"
      to={`${Routes.Suppliers}/orders/order/track-items/${item.id}`}>
      <StyledItemSecondaryButton color="secondary">
        Track Items
      </StyledItemSecondaryButton>
    </StyledLink>

  }

  const viewLabel = <StyledLink 
    key="viewLabel" 
    to={`${Routes.Suppliers}/orders/order/view-label/${item.id}`}>
    <StyledItemPrimaryButton color="primary">
    View label
    </StyledItemPrimaryButton>
  </StyledLink>

  const editLabel = <StyledLink 
    key="editLabel" 
    to={`${Routes.Suppliers}/orders/order/edit-label/${item.id}`}>
    <StyledItemPrimaryButton color="primary">
Edit label
    </StyledItemPrimaryButton>
  </StyledLink>

  

  if (item.orderStatus === 'InTransit' || item.orderStatus === 'delivered') {
    itemsOptions.push(trackItems) 
  }
  if (!shipped && item.orderStatus === 'pendingbuyerconfirmation' ) {
    itemsOptions.push(fullFillOrder) 
  }
  if (item.orderStatus === 'buyAccepted' && item.deliveryMethod.type === 'homitagshipping') { 
    itemsOptions.push(viewLabel) 
  }
  if (item.orderStatus === 'buyAccepted' && item.deliveryMethod.type === 'shipindependently') { 
    itemsOptions.push(editLabel) 
  }

  itemsOptions.push(viewDetails)
  return (<ItemWrapper key={item.orderID}>
    <StyledStatus>{messages[`orderStatus_${item.orderStatus}`] ? intl.formatMessage(messages[`orderStatus_${item.orderStatus}`]) : item.orderStatus}</StyledStatus>
    <ProductDetailImages product={item.productInfo} width={46} height={46}/>
    <StyledText>{format(parseISO(item.createdAt), 'MM/dd/yyyy HH:mm:ss')}</StyledText>
    <StyledText>{item.orderID}</StyledText>
    <StyledText>{item.productInfo.title}</StyledText>
    <StyledText>{item.quantity}</StyledText>
    <StyledText>{item.totalPaid ? `$ ${item.totalPaid}` : '-'}</StyledText>
    <StyledText>{item.shippedAt ? format(parseISO(item.shippedAt), 'MM/dd/yyyy HH:mm:ss') : '-'}</StyledText>
    <StyledGrid item >
      <Grid container  direction="column"> {itemsOptions} </Grid>
    </StyledGrid>
    <ActionButton 
      id={item.id}
      shipped={shipped} 
      type={type}
      status={item.orderStatus}
      onClose={() => onClose()}
      deliveryMethod={item.deliveryMethod}
    />
  </ItemWrapper>
  )

}

ListItem.propTypes = {
  item: propTypes.object,
  shipped: propTypes.bool,
  type: propTypes.string,
  intl: propTypes.object,
  onClose: propTypes.func
}

export default injectIntl(ListItem)
