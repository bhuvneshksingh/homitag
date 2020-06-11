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
  height: 40px;
  color: ${props => (props.isWhite ? '#ffffff' : props.theme.colors.homiBlack)};
  && {
    height: 100%;
    font-weight: 400;
    font-size: 14px;
    line-height: 14px;
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
  && {
    height: ${props => props.height};
    font-weight: 400;
    font-size: 14px;
    line-height: 14px;
    padding: 5px 10px;
    align-self: baseline;
    background-color: none;
    color: ${props =>
    props.isWhite ? '#ffffff' : props.theme.colors.homiBlack};
  }
`

const WhiteSpan = styled.span`
  color:#ffffff;
  font-size: 15px;
`

const WhiteLabelWrapper = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`
const defaultMaskOptions = {
  prefix: '',
  includeThousandsSeparator: false,
  thousandsSeparatorSymbol: ',',
  allowDecimal: true,
  decimalSymbol: '.',
  decimalLimit: 2, // how many digits allowed after the decimal
  integerLimit: 7, // limit length of integer numbers
  allowNegative: false,
  allowLeadingZeroes: false,
}

const PriceInput = ({ maskOptions, error, text, isWhite, ...inputProps }) => {
  const currencyMask = createNumberMask({
    ...defaultMaskOptions,
    ...maskOptions,
  })

  return (
    <WhiteLabelWrapper>
      {text && <StyledText>{text}</StyledText>}{' '}
      <FormErrorSpan>{error}</FormErrorSpan>
      <MaskedInput
        placeholder="XX.XX"
        mask={currencyMask}
        {...inputProps}
        render={(ref, props) => (
          <InputWrapper>
            {isWhite ? (
              <WhiteSpan>$</WhiteSpan>
            ) : (
              <span style={{ fontSize: 14 }}>$</span>
            )}
            <StyledInput
              ref={ref}
              {...props}
              // eslint-disable-next-line react/prop-types
              isWhite={isWhite}
            />
          </InputWrapper>
        )}
      />
    </WhiteLabelWrapper>
  )
}

PriceInput.propTypes = {
  inputmode: PropTypes.string,
  text: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  isWhite: PropTypes.bool,
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

export default PriceInput
