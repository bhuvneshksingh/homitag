import React from 'react'
import { string, func, bool } from 'prop-types'
import styled from 'styled-components'
import { Input } from '@material-ui/core';

const StyledText = styled.div`
  font-weight: 600;
  margin-bottom: 5px;
  color: white;
  font-size: 16px;
`
const StyledInput = styled(Input)`
  box-sizing: border-box;
  width: 100%;
  color: white;
  border: 1px solid ${({ theme }) => theme.colors.text};
  border-radius: 4px;
  && {
    height: ${props =>props.height};
    font-weight: 400;
    font-size: 14px;
    line-height: 14px;
    padding: 5px 10px;
    align-self: baseline;
    background-color: none;
    color: ${({ theme }) => theme.colors.homiWhite};
  }
  .MuiInputBase-input {
    align-self: baseline;
  }
  .Mui-disabled{
  color: white
  }
`
const Label = props => (
  <div>
    <StyledText>{props.text}</StyledText>
    <StyledInput
      type={props.type}
      disabled={props.disabled}
      name={props.name}
      height={props.height || '35px'}
      value={props.value}
      onChange={(e) => props.onChange(e)}/>
  </div>
)

Label.propTypes = {
  text: string,
  value: string,
  name: string,
  disabled: bool,
  height: string,
  onChange: func,
  type: string
}
export default Label
