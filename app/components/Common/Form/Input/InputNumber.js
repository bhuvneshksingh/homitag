import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import MaskedInput from 'react-text-mask'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'

const StyledText = styled.div`
  margin-bottom: 5px;
  font-size: 14px;
`
const FormErrorSpan = styled.div`
  font-size: 12px;
  color: red;
`
const StyledInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 30px;
  margin-top: 5px;
  color: ${props => (props.isWhite ? '#ffffff' : props.theme.colors.homiBlack)};
  && {
    height: ${props => props.height};
    font-weight: 400;
    font-size: 14px;
    line-height: 14px;
    padding: 5px;
    align-self: baseline;
    background-color: none;
    color: ${props =>
    props.isWhite ? '#ffffff' : props.theme.colors.homiBlack};
  }
  .MuiInputBase-input {
    align-self: baseline;
  }
`

const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: baseline;
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  color: ${props => (props.isWhite ? '#ffffff' : props.theme.colors.homiBlack)};
  border: 1px solid #969696;
  border-radius: 4px;
`

const WhiteLabelWrapper = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`
const defaultMaskOptions = {
  prefix: '',
  includeThousandsSeparator: false,
  allowDecimal: false,
  allowNegative: false,
  allowLeadingZeroes: false,
}

const InputNumber = ({ maskOptions, error, text, wrapperStyle, ...inputProps }) => {
  const currencyMask = createNumberMask({
    ...defaultMaskOptions,
    ...maskOptions,
  })
  return (
    <WhiteLabelWrapper style={wrapperStyle}>
      {text && <StyledText>{text}</StyledText>}
      <FormErrorSpan>{error}</FormErrorSpan>
      <MaskedInput
        placeholder="$XX.XX"
        mask={currencyMask}
        {...inputProps}
        render={(ref, props) => (
          <InputWrapper>
            <StyledInput
              ref={ref}
              {...props}
              // eslint-disable-next-line react/prop-types
              isWhite={props.isWhite}
            />
          </InputWrapper>
        )}
      />
    </WhiteLabelWrapper>
  )
}

InputNumber.propTypes = {
  inputmode: PropTypes.string,
  text: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  wrapperStyle: PropTypes.object,
  maskOptions: PropTypes.shape({
    prefix: PropTypes.string,
    suffix: PropTypes.string,
    includeThousandsSeparator: PropTypes.bool,
    thousandsSeparatorSymbol: PropTypes.string,
    allowDecimal: PropTypes.bool,
    decimalSymbol: PropTypes.string,
    decimalLimit: PropTypes.string,
    requireDecimal: PropTypes.bool,
    allowNegative: PropTypes.bool,
    allowLeadingZeroes: PropTypes.bool,
    integerLimit: PropTypes.number,
  }),
}

export default InputNumber
