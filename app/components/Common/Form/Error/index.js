import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledError = styled.div`
  color: ${({ theme }) => theme.colors.homiCompTwo};
  font-size: 12px;
  margin: 5px 0;
  &::before {
    content: '';
    display: inline-block;
  }
`

const Input = ({ children, ...props }) => (
  <StyledError {...props}>{children}</StyledError>
)

Input.propTypes = {
  children: PropTypes.object,
}

export default Input
