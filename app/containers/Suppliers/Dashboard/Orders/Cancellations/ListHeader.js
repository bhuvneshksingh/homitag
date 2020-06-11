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
    <div style={{ width: '100px' }}>
      <p> STATUS </p>
    </div>
    <div style={{ width: '100px' }}>
      <p> IMAGE </p>
    </div>
    <div style={{ width: '140px' }}>
      <p> ORDER DATE </p>
    </div>
    <div style={{ width: '100px' }}>
      <p> ORDER ID </p>
    </div>
    <div style={{ width: '160px' }}>
      <p>
        PRODUCT NAME
      </p>
    </div>
    <div style={{ width: '90px' }}>
      <p>
        QUANTITY
      </p>
    </div>
    <div style={{ width: '70px' }}>
      <p> PRICE </p>
    </div>
    <div style={{ width: '220px' }}>
      <p> COMMENTS </p>
    </div>
    <div style={{ width: '100px' }}>
      <p> ACTIONS </p>
    </div>
  </HeaderWrapper>
)

export default ListHeader
