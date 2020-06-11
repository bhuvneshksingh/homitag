import React from 'react'
import styled from 'styled-components'
import { func, string } from 'prop-types'

const BoldText = styled.p`
  font-weight: bold;
  font-size: 14px;
  color: #969696;
`
const LightText = styled.p`
  font-size: 14px;
  color: #969696;
`
const SliderContainer = styled.div`
  width: 100%;
`

const StyledInput = styled.input`
  -webkit-appearance: none;
  width: 100%;
  height: 35px;
  border-radius: 30px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
  &:hover {
    opacity: 1;
  }
  ::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 15px;
    height: 35px;
    border-radius: 30px;
    background: #00bdaa;
    cursor: pointer;

    ::-moz-range-thumb {
      width: 25px;
      height: 25px;
      border-radius: 50%;
      background: #4caf50;
      cursor: pointer;
    }
  }
`

const RangeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`
const Tag = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`

const PriceRange = ({ min, max, initialPrice, onChange, ...props }) => (
  <>
    <BoldText>Price Range</BoldText>
    <SliderContainer>
      <StyledInput
        type="range"
        min={min}
        max={max}
        onChange={onChange}
        {...props}
        value={initialPrice}
      />
    </SliderContainer>
    <RangeContainer>
      <Tag>
        <BoldText>Lowest Price</BoldText>
        <LightText>{`$ ${min}`}</LightText>
      </Tag>
      <Tag>
        <BoldText>YourProduct</BoldText>
        <LightText>{`$ ${initialPrice}`}</LightText>
      </Tag>
      <Tag>
        <BoldText>Highest Price</BoldText>
        <LightText>{`$ ${max}`}</LightText>
      </Tag>
    </RangeContainer>
  </>
)

PriceRange.propTypes = {
  onChange: func,
  initialPrice: string,
  min: string,
  max: string,
}

export default PriceRange
