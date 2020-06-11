import PropTypes from 'prop-types'
import React, { useState } from 'react'
import styled from 'styled-components'
import Icon from 'components/Common/Icon'

const HeaderWrapper = styled.div`
  display: flex;
  padding-bottom: 20px;
  && {
    font-weight: 600;
    font-size: 13px;
    text-align: center;
  }
`

const ArrowIcon = styled(Icon).attrs(props => ({
  color: props.theme.colors.homiPrimary,
  width: 10,
  height: 15,
}))``

const Column = styled.div`
  display: flex;
  flex-direction: column;
`

const ArrowUp = () => (
  <div style={{ transform: 'rotate(-90deg)' }}>
    <ArrowIcon icon="arrow" />
  </div>
)

const ArrowDown = () => (
  <div style={{ transform: 'rotate(90deg)' }}>
    <ArrowIcon icon="arrow" />
  </div>
)

const HeaderItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  cursor: pointer;
`

const ListHeader = ({ onHeaderItemClick, selectedSort }) => {
  const [sortBy, setSortBy] = useState(selectedSort)
  return (
    <HeaderWrapper>
      <div style={{ width: '4%' }}>
        <p> &nbsp; </p>
      </div>
      <div style={{ width: '9%' }}>
        <p> STATUS </p>
      </div>
      <div style={{ width: '10%' }}>
        <p> IMAGE </p>
      </div>
      <div style={{ width: '8%' }}>
        <p> SKU </p>
      </div>
      <div style={{ width: '12%' }}>
        <HeaderItemWrapper
          onClick={() => {
            let sort
            if (sortBy === 'product_name_a_z') {
              sort = 'product_name_z_a'
            } else {
              sort = 'product_name_a_z'
            }
            setSortBy(sort)
            onHeaderItemClick({sort})
          }}
        >
          <Column>
            <span>PRODUCT NAME </span>
            <span>PRODUCT ID</span>
          </Column>
          {sortBy === 'product_name_z_a' && <ArrowDown />}
          {sortBy === 'product_name_a_z' && <ArrowUp />}
        </HeaderItemWrapper>
      </div>
      <div
        style={{
          width: '15%',
        }}
      >
        <HeaderItemWrapper
          onClick={() => {
            let sort
            if (sortBy === 'last_update_asc') {
              sort = 'last_update_desc'
            } else {
              sort = 'last_update_asc'
            }
            setSortBy(sort)
            onHeaderItemClick({sort})
          }}
        >
          <Column>
            <span>DATE CREATED</span>
            <span>LAST UPDATED</span>
          </Column>
          {sortBy === 'last_update_desc' && <ArrowDown />}
          {sortBy === 'last_update_asc' && <ArrowUp />}
        </HeaderItemWrapper>
      </div>
      <div
        style={{
          width: '13%',
        }}
      >
        <HeaderItemWrapper
          onClick={() => {
            let sort
            if (sortBy === 'inventory_low_to_high') {
              sort = 'inventory_high_to_low'
            } else {
              sort = 'inventory_low_to_high'
            }
            setSortBy(sort)
            onHeaderItemClick({sort})
          }}
        >
          <span style={{marginRight: '50px'}}> QUANTITY </span>
          {sortBy === 'inventory_high_to_low' && <ArrowDown />}
          {sortBy === 'inventory_low_to_high' && <ArrowUp />}
        </HeaderItemWrapper>
      </div>
      <div
        style={{
          width: '8%',
        }}
      >
        <HeaderItemWrapper
          onClick={() => {
            let sort
            if (sortBy === 'price_low_to_high') {
              sort = 'price_high_to_low'
            } else {
              sort = 'price_low_to_high'
            }
            setSortBy(sort)
            onHeaderItemClick({sort})
          }}
        >
          <span style={{marginRight: '25px'}}> PRICE </span>
          {sortBy === 'price_high_to_low' && <ArrowDown />}
          {sortBy === 'price_low_to_high' && <ArrowUp />}
        </HeaderItemWrapper>
      </div>
      <div style={{ width: '8%' }}>
        <p style={{marginLeft: '15px'}}> SHIPPING </p>
      </div>
      <div style={{ width: '8%' }}>
        <p style={{marginLeft: '25px'}}> DETAILS</p>
      </div>
      <div style={{ width: '10%' }}>
        <p style={{marginLeft: '15px'}}> ACTION </p>
      </div>
    </HeaderWrapper>
  )
}

ListHeader.propTypes = {
  onHeaderItemClick: PropTypes.func,
  selectedSort: PropTypes.string,
}

export default ListHeader
