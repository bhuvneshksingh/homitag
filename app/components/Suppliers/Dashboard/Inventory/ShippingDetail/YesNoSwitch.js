import React from 'react'
import { bool, func } from 'prop-types'
import styled from 'styled-components'

const SwitchWrapper = styled.div`
  justify-self: end;
`
const SwitchLabel = styled.span`
  color: ${props => (props.white ? 'white' : 'black')};
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
  transition: 0.4s;
  cursor: pointer;
  background-color: #fff;
  border: 2px solid #e8e8e8;

  ${Checkbox}:checked + & {
    background-color: #00bdaa;
  }

  ${Checkbox}:focus + & {
    box-shadow: 0 0 1px #3b97d3;
  }

  &:before {
    position: absolute;
    content: '';
    transition: 0.4s;
    height: 25px;
    width: 31px;
    background-color: white;
    background: #969696;
    border-radius: 20px;

    ${Checkbox}:checked + & {
      transform: translateX(35px);
      background: #FFF;
    }
  }
`

const YesNoSwitch = props => (
  <SwitchWrapper>
    <StyledSwitch>
      <Checkbox
        type="checkbox"
        checked={props.value}
        value={props.value}
        onClick={props.onChange}
      />
      <Slider />
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
}
export default YesNoSwitch
