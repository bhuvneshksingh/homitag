import React from 'react'
import {bool, func, object}from 'prop-types'
import styled from 'styled-components'

const SwitchWrapper = styled.div`
  justify-self: end;
`
const SwitchLabel = styled.span`
  color: ${props => props.white ? 'white' : 'black'};
  font-weight: bold;
  font-size: 14px;
  `
const StyledSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 70px;
  height: 30px;
  margin-right: 10px;
`
const Checkbox = styled.input`
   display: none;
`

const Slider = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 20px;
  transition: .4s;
  cursor: pointer;
  background-color: #ccc;

  ${Checkbox}:checked + & {
    background-color: #00BDAA;
  }

  ${Checkbox}:focus + & {
    box-shadow: 0 0 1px #3B97D3;
  }

  &:before {
    position: absolute;
    content: "";
    left: 6px;
    bottom: 2px;
    transition: .4s;
    height: 25px;
    width: 25px;
    background-color: white;
    border-radius: 20px;

    ${Checkbox}:checked + & {
      transform: translateX(35px);
    }
  }
`;

const YesNoSwitch = props => (
  <SwitchWrapper>
    <StyledSwitch>
      <Checkbox
        type='checkbox'
        checked={props.value}
        value={props.value}
        onClick={props.onChange}
        {...props}
      />
      <Slider/>
    </StyledSwitch>
    <SwitchLabel white={props.isWhite}>
      {props.value ? 'Yes' : 'No'}
    </SwitchLabel>
  </SwitchWrapper>
)

YesNoSwitch.propTypes = {
  value: bool,
  onChange: func,
  isWhite: bool,
  checkbox: object
}
export default YesNoSwitch
