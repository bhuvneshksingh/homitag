import React from 'react'
import { Link } from 'react-router-dom'
import { object, bool, func } from 'prop-types'
import styled, { css } from 'styled-components'
import { Grid, Button } from '@material-ui/core'
import { injectIntl } from 'react-intl'
import { format, parseISO } from 'date-fns'
import idx from 'idx'
import Icon from 'components/Common/Icon'
import Routes from '../../Router/Routes.json'
import ActionButton from '../../../../components/Common/ActionButton'
import { getShippingCost } from './Controllers/shippingCost'
import ListEditableFields from '../../../../components/Suppliers/Dashboard/Inventory/ListEditableFields';

const CheckBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.colors.text};
  border-radius: 4px;
  width: 24px;
  height: 24px;
  font-size: 16px;
  cursor: pointer;
  ::before {
    content: '';
  }
  ${({ selected, theme }) =>
    selected &&
    css`
      border: none;
      background-color: ${theme.colors.homiPrimary};
      ::after {
        content: '✓';
      }
    `}
`

const ArrowIcon = styled(Icon).attrs(props => ({
  color: props.theme.colors.homiWhite,
  width: 6,
  height: 12,
}))``

const StyledBadgeIcon = styled(Icon).attrs(props => ({
  color: props.theme.colors.homiCompOne,
}))``

const ArrowRight = () => (
  <div style={{ marginLeft: '10px', marginTop: '3px' }}>
    <ArrowIcon icon="arrow" />
  </div>
)

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

const ImgWrapper = styled.div`
  width: 46px;
  height: 46px;
  background: ${({ theme }) => theme.colors.homiGrey};
  border-radius: 10px;
  overflow: hidden;
  ::before {
    content: '';
  }
  img {
    width: 46px;
    height: 46px;
    object-fit: cover;
  }
`

const StyledText = styled.div`
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  width: 100px;
  margin-bottom: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  white-space: nowrap;
  word-wrap: break-word;
  white-space: pre-wrap;
  color: white;
  text-decoration: none;
`
const StyledGreyText = styled(StyledText)`
  color: grey;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  position: relative;
  height: 100%;
  width: 10%;
`

const StyledStatus = styled(StyledText)`
  width: 80px;
`
const NoBadge = styled.div`
  width: 20px;
`
const DoubleLine = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 30%;
`
const DateDoubleLine = styled(DoubleLine)`
  top: 20%;
`
const LinkWrapper = styled.div`
  position: absolute;
  top: 45%;
`

const EditContainer = styled.div`
  position: relative;
  height: 100%;
  width: 10%;
`
const EditWrapper= styled.div`
    margin-top: 40px;
`
const ShippingLinkWrapper = styled(LinkWrapper)`
  top: 35%;
`
const StyledItemButton = styled(Button)`
  && {
    background: ${({ theme }) => theme.colors.homiPrimary};
    border-radius: 6px;
    color: ${({ theme }) => theme.colors.homiWhite};
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
    height: 35px;
  }
`

const ListItem = ({ item, selected, onSelect, getList, resetPage, isArchived, onSoldout, onNotify, onSuccess }) => {
  const title = item.title && item.title.length > 25 ?  item.title.substring(0,25) : item.title
  const shippingCost = getShippingCost(item)
  const quantity = item.availableQuantity;
  let statusName = item.PostStatus.name;
  if(item.PostStatus.name === 'Soldout'){
    statusName = 'Inactive (Sold out)';
  }
  else if(item.PostStatus.name === 'Blocked'){
    statusName = 'Inactive (Blocked)';
  }
  else if(item.PostStatus.name === 'Draft'){
    statusName = 'Inactive (Draft)';
  }

  return(
    <ItemWrapper>
      <CheckBox selected={selected} onClick={onSelect} />
      <StyledLink to={`${Routes.Suppliers}/inventory/${item.id}`}>
        <LinkWrapper>
          <StyledStatus>{statusName}</StyledStatus>
        </LinkWrapper>
      </StyledLink>
      <ImgWrapper>
        {item.Product.ProductImages && item.Product.ProductImages.length > 0 && <img
          src={idx(item, _ => _.Product.ProductImages[0].urlImage)}
          alt={item.title}
        />}
      </ImgWrapper>
      <StyledLink to={`${Routes.Suppliers}/inventory/${item.id}`}>
        <LinkWrapper>
          <StyledText>{item.sku}</StyledText>
        </LinkWrapper>
      </StyledLink>
      <StyledLink to={`${Routes.Suppliers}/inventory/${item.id}`}>
        <DoubleLine>
          <StyledText>{title}</StyledText>
          <StyledGreyText>{item.Product.id}</StyledGreyText>
        </DoubleLine>
      </StyledLink>
      <StyledLink to={`${Routes.Suppliers}/inventory/${item.id}`}>
        <DateDoubleLine>
          <StyledText>{format(parseISO(item.createdAt), 'dd/MM/yyyy hh:mm:ss')} </StyledText>
          <StyledGreyText>{format(parseISO(item.updatedAt), 'dd/MM/yyyy hh:mm:ss')}</StyledGreyText>
        </DateDoubleLine>
      </StyledLink>
      <EditContainer>
        <EditWrapper>
          <ListEditableFields
            value={quantity} id={item.id} type='quantity'
            onSoldout={() =>onSoldout()}
            onSuccess={() =>onSuccess()}
            onNotify={() =>onNotify()}/>
        </EditWrapper>
      </EditContainer>
      <EditContainer>
        <EditWrapper>
          <ListEditableFields
            value={item.initialPrice} id={item.id} type='price'
            onSuccess={() =>onSuccess()}
            onSoldout={() =>onSoldout()}
            onNotify={() => onNotify()}/>
        </EditWrapper>
      </EditContainer>
      <StyledLink to={`${Routes.Suppliers}/inventory/shipping/${item.id}`}>
        <ShippingLinkWrapper>
          <StyledItemButton>
            {`$ ${Number(shippingCost).toFixed(2)}`} <ArrowRight />
          </StyledItemButton>
        </ShippingLinkWrapper>
      </StyledLink>
      {item.lowerPrice ? <StyledBadgeIcon icon="percentBadge" /> : <NoBadge/>}
      {item.boost === '' || item.boost === null ? <NoBadge/> : <StyledBadgeIcon icon="boostBadge" /> }
      <ActionButton
        id={item.id}
        isBulk
        boost={item.boost}
        archived={isArchived}
        productStatus={item.PostStatus.name}
        onConfirmed={() => {
          getList()
          resetPage()
        }}/>
    </ItemWrapper>
  )
}

ListItem.propTypes = {
  item: object,
  selected: bool,
  isArchived: bool,
  onSelect: func,
  getList: func,
  resetPage: func,
  onNotify: func,
  onSoldout: func,
  onSuccess: func
}

export default injectIntl(ListItem)
