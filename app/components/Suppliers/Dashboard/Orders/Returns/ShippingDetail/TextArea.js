import React from 'react'
import { string, func, number } from 'prop-types'
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
const StyledInput = styled.textarea`
  box-sizing: border-box;
  width: 100%;
  color: #969696;
  border: 1px solid rgba(150, 150, 150, 0.2);
  border-radius: 4px;
  && {
    font-family: Montserrat, sans-serif;
    height: ${props => props.height};
    font-weight: 400;
    font-size: 16px;
    line-height: 16px;
    padding: 5px 10px;
    align-self: baseline;
    background-color: none;
    color: ${({ theme }) => theme.colors.homiBlack};
  }
  .MuiInputBase-input {
    align-self: baseline;
  }
`
const TextArea = props => (
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
      name={props.name}
      placeholder={props.placeholder}
      type={props.type}
      height={props.height || '35px'}
      value={props.value}
      maxLength={props.maxLength}
      {...props}
      onChange={props.onChange}
    />
  </WhiteLabelWrapper>
)

TextArea.propTypes = {
  text: string,
  value: string,
  name: string,
  type: string,
  placeholder: string,
  height: string,
  onChange: func,
  maxLength: number,
  error: string,
}
export default TextArea
