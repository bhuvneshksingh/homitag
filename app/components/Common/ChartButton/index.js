/* eslint-disable react/button-has-type */
import React from 'react'
import { string } from 'prop-types'
import styled from 'styled-components'
import { Button as MuiButton } from '@material-ui/core'

const StyledButton = styled(MuiButton)`
  && {
    margin: 0;
    text-transform: none;
    border-radius: 10px;
    font-weight: bold;
    font-size: 10px;
    line-height: 12px;
    font-family: 'Montserrat', 'sans-serif';
    color: ${({ theme }) => theme.colors.homiWhite};
    background-color: ${({ theme, active }) =>
    active ? theme.colors.homiCompOne : 'none'};
    padding: 12px 18px;
    &:hover {
      background-color: ${({ theme }) => theme.colors.homiCompOne};
      opacity: 0.9;
    }
  }
`

const ChartButton = ({ children, ...props }) => (
  <StyledButton {...props}>{children}</StyledButton>
)

ChartButton.propTypes = {
  children: string,
}

export default ChartButton
