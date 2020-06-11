import React from 'react'
import propTypes from 'prop-types'
import styled from 'styled-components'
import { Grid, Button } from '@material-ui/core'
import { injectIntl } from 'react-intl'
import { format, parseISO } from 'date-fns'
import { Link } from 'react-router-dom'
import ActionButton from '../../../../../components/Suppliers/Dashboard/Orders/ActionButton';
import ProductDetailImages from '../../../../../components/Suppliers/Dashboard/Orders/OrderDetail/ProductDetail/ProductDetailImages'
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

const StyledComment = styled.div`
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  white-space: nowrap;
  word-wrap: break-word;
  white-space: pre-wrap;
  color: white;
  text-decoration: none;
  max-height: 60px
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

const ListItem = ({intl,  item , shipped, type, onClose}) => {

  const itemsOptions  = 
  <Grid container  direction="column">
    <StyledLink to={`${Routes.Suppliers}/orders/order/cancellation-request/${item.id}`}>
      <StyledItemPrimaryButton color="secondary">
        View Request
      </StyledItemPrimaryButton>
    </StyledLink>
  </Grid>
  if (item.OrderCancels.length === 0 ) {return null}
  const order = item.OrderCancels[item.OrderCancels.length - 1]
  const orderItem = <ItemWrapper key={item.id}>
    <StyledStatus>{messages[`cancellationStatus_${order.status}`] ? intl.formatMessage(messages[`cancellationStatus_${order.status}`]) : order.status}</StyledStatus>
    <ProductDetailImages style={{ width: '100px' }} product={item.productInfo} width={46} height={46}/>
    <StyledText style={{ width: '100px' }}>{format(parseISO(item.createdAt), 'MM/dd/yyyy HH:mm:ss')}</StyledText>
    <StyledText style={{ width: '100px' }}>{item.orderID}</StyledText>
    <StyledText>{item.productInfo.title}</StyledText>
    <StyledText style={{ textAlign: 'center', width: '90px'}}>{item.quantity}</StyledText>
    <StyledText>{item.totalPaid ? `$ ${item.totalPaid}` : '-'}</StyledText>
    <StyledComment style={{ width: '160px' }}> {order.comment ? `${order.comment.substring(0, 60)  }...` : 'NO COMMENT'}</StyledComment>
    
    <StyledGrid item >
      {itemsOptions}
    </StyledGrid>
    <ActionButton 
      id={item.orderID}
      shipped={shipped} 
      type={type}
      status={order.status}
      onClose={() => onClose()}
    />
  </ItemWrapper>

  return [orderItem]
  
}

ListItem.propTypes = {
  item: propTypes.object,
  shipped: propTypes.bool,
  type: propTypes.string,
  intl: propTypes.object,
  onClose: propTypes.func
}

export default injectIntl(ListItem)
