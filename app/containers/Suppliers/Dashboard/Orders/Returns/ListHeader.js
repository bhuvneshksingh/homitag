import React from 'react'
import styled from 'styled-components'

const HeaderWrapper = styled.div`
  display: flex;
  padding-bottom: 20px;
  && {
    font-weight: 600;
    font-size: 13px;
    text-align: center;
  }
`

const ListHeader = () => (
  <HeaderWrapper>
    <div style={{ width: '110px' }}>
      <p> STATUS </p>
    </div>
    <div style={{ width: '100px' }}>
      <p> IMAGE </p>
    </div>
    <div style={{ width: '140px' }}>
      <p>  DATE REQUESTED </p>
    </div>
    <div style={{ width: '140px' }}>
      <p>
        ORDER ID
      </p>
    </div>
    <div style={{ width: '140px' }}>
      <p>
        PRODUCT NAME
      </p>
    </div>
    <div style={{ width: '140px' }}>
      <p>
        QUANTITY
      </p>
    </div>
    <div style={{ width: '140px' }}>
      <p> PRICE </p>
    </div>
    <div style={{ width: '140px' }}>
      <p> SHIP BY </p>
    </div>
    <div style={{ width: '220px' }}>
      <p> ACTION </p>
    </div>
  </HeaderWrapper>
)

export default ListHeader
