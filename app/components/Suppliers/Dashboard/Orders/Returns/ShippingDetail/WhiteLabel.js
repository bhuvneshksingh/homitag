import React from 'react'
import { string, func, number, bool } from 'prop-types'
import styled from 'styled-components'

const FormErrorSpan = styled.div`
  font-size: 12px;
  color: red;
`

const WhiteLabelWrapper = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`
const StyledText = styled.div`
  margin-bottom: 5px;
  font-size: 14px;
`
const StyledInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  color: #969696;
  border: 1px solid rgba(150, 150, 150, 0.2);
  border-radius: 4px;
  && {
    height: ${props =>props.height};
    font-weight: 400;
    font-size: 16px;
    line-height: 14px;
    padding: 5px 10px;
    align-self: baseline;
    background-color: none;
    color: ${props => props.isWhite ? '#ffffff' : '#000000' };
  }
  .MuiInputBase-input {
    align-self: baseline;
  }
`
const WhiteLabel = props => (
  <WhiteLabelWrapper>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      {props.text && <StyledText>{props.text}</StyledText>}{' '}
      {props.maxLength && (
        <StyledText>
          {(props.value && props.value.length) || 0}/{props.maxLength}
        </StyledText>
      )}
    </div>
    <FormErrorSpan>{props.error}</FormErrorSpan>
    <StyledInput
      isWhite={props.isWhite}
      name={props.name}
      placeholder={props.placeholder}
      type={props.type}
      height={props.height || '35px'}
      value={props.value}
      {...props}
      onChange={e => props.onChange(e)}
    />
  </WhiteLabelWrapper>
)

WhiteLabel.propTypes = {
  text: string,
  value: string,
  name: string,
  type: string,
  placeholder: string,
  height: string,
  onChange: func,
  isWhite: bool,
  error: string,
  maxLength: number
}
export default WhiteLabel
