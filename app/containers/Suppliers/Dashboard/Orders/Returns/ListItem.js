import React from 'react'
import propTypes from 'prop-types'
import styled from 'styled-components'
import { Grid, Button } from '@material-ui/core'
import { injectIntl } from 'react-intl'
import { format, parseISO } from 'date-fns'
import { Link } from 'react-router-dom'
import ActionButton from 'components/Suppliers/Dashboard/Orders/ActionButton';
import ProductDetailImages from 'components/Suppliers/Dashboard/Orders/OrderDetail/ProductDetail/ProductDetailImages'
import Routes from '../../../Router/Routes.json'
import messages from '../messages'

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

const StyledStatus = styled(StyledText)`
  width: 80px;
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


const ListItem = ({ intl, item , shipped, onClose, type}) => {
  const refundOrder = <StyledLink 
    key="refundOrder"
    to={`${Routes.Suppliers}/orders/order/refund-order/${item.id}`}>
    <StyledItemPrimaryButton>
  Refund Order
    </StyledItemPrimaryButton> 
  </StyledLink>

  const createLabel = <StyledLink 
    key="createLabel"
    to={`${Routes.Suppliers}/orders/order/create-label/${item.id}`}>
    <StyledItemPrimaryButton>
  Create Label
    </StyledItemPrimaryButton> 
  </StyledLink>
 
  const viewRequest = <StyledLink
    key="viewRequest"
    to={{
      pathname: `${Routes.Suppliers}/orders/order/view-request/${item.id}`
    }}  orderType={type}>
    <StyledItemPrimaryButton color="secondary" >
    View Request
    </StyledItemPrimaryButton>
  </StyledLink>
  const viewRequestTesting = <StyledLink
    key="viewRequest"
    to={{
      pathname: `${Routes.Suppliers}/orders/order/view-request/${item.id}`
    }}  orderType={type}>
    <StyledItemPrimaryButton color="secondary" >
  View Request (testing)
    </StyledItemPrimaryButton>
  </StyledLink>

  const trackItems = <StyledLink 
    key="trackItems"
    to={`${Routes.Suppliers}/orders/order/track-items/${item.id}`}>
    <StyledItemSecondaryButton color="secondary">
  Track Items
    </StyledItemSecondaryButton>
  </StyledLink>

  const viewDetails = <StyledLink
    key="viewDetails"
    to={{
      pathname: `${Routes.Suppliers}/orders/order/${item.id}`
    }} ordertype={type}>
    <StyledItemSecondaryButton color="secondary" >
    View Details
    </StyledItemSecondaryButton>
  </StyledLink>


  const itemsOptions = []
 
  if (!shipped && item.ReturnRequests.returnStatus==='returnRequested') {
    itemsOptions.push(viewRequest) 
  }
  if (!shipped && item.ReturnRequests.returnStatus==='returnRequested') {
    itemsOptions.push(refundOrder) 
  }
  if (!shipped && item.ReturnRequests.returnStatus==='returnAccepted') {
    itemsOptions.push(createLabel) 
  }
  
  if (shipped) {
    itemsOptions.push(trackItems) 
  }
  itemsOptions.push(viewRequestTesting) 
  itemsOptions.push(viewDetails)

  if (item.ReturnRequests.length === 0 ) {return null}
  const order = item.ReturnRequests[item.ReturnRequests.length - 1]

  const orders = 
    <ItemWrapper key={order.id}>
      <StyledStatus>{messages[`returnStatus_${order.returnStatus}`] ? intl.formatMessage(messages[`returnStatus_${order.returnStatus}`]) : order.returnStatus}</StyledStatus>
      <ProductDetailImages product={item.productInfo} width={46} height={46}/>
      <StyledText>{format(parseISO(order.createdAt), 'MM/dd/yyyy HH:mm:ss')}</StyledText>
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
        status={order.returnStatus}
        onClose={() => onClose()} />
    </ItemWrapper>

  return [orders]
  

}

ListItem.propTypes = {
  item: propTypes.object,
  shipped: propTypes.bool,
  intl: propTypes.object,
  onClose: propTypes.func

}
export default injectIntl(ListItem)
