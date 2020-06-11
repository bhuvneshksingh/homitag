import React from 'react'
import { string, func, bool } from 'prop-types'
import styled from 'styled-components'
import { Input } from '@material-ui/core';

const WhiteLabelWrapper = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`
const StyledText = styled.div`
  margin-bottom: 5px;
  font-size: 14px;
`
const StyledTextP = styled.p`
  margin-bottom: 5px;
  font-size: 14px;
  color: red
`
const StyledInput = styled(Input)`
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  color: #969696;
  border: 1px solid #969696;
  border-radius: 4px;
  && {
    height: ${props =>props.height};
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    padding: 5px 10px;
    align-self: baseline;
    background-color: none;
    color: ${({ theme }) => theme.colors.homiBlack};
  }
  .MuiInputBase-input {
    align-self: baseline;
  }
`

const WhiteLabel = props => { 
  
  let errorMessageShow = ''
  if (props.error) {
    errorMessageShow = <StyledTextP>{props.errorMessage}</StyledTextP>
  }

  return (
    <WhiteLabelWrapper>
      {props.text && <StyledText>{props.text}</StyledText>}
      <StyledInput
        name={props.name}
        placeholder={props.placeholder}
        type={props.type}
        height={props.height || '135px'}
        value={props.value}
        {...props}
        onChange={e => props.onChange(e)}
      />
      {errorMessageShow}
    </WhiteLabelWrapper>
  )
}

WhiteLabel.propTypes = {
  text: string,
  value: string,
  name: string,
  type: string,
  placeholder: string,
  height: string,
  onChange: func,
  error: bool,
  errorMessage: string
}
export default WhiteLabel
