import React from 'react'
import string from 'prop-types'
import styled from 'styled-components'

const StatusWrapper = styled.div`
  display: flex;
  float: right;
`
const StatusRadio = styled.div`
  background-color: ${props => props.status === 'Active' ? '#27AE60;' : '#FF5556;'}
  border-radius: 10px;
  width: 10px;
  height: 10px;
  align-self: center;
  margin-right: 5px;
`

const ProductStatus = props => (
  <StatusWrapper>
    <StatusRadio status={props.status}/>
    <span>{props.status}</span>
  </StatusWrapper>
)

ProductStatus.propTypes = {
  status: string
}
export default ProductStatus
