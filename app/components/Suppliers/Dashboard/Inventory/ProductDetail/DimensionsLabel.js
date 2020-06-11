import React from 'react'
import { string } from 'prop-types'
import styled from 'styled-components'
import { Input } from '@material-ui/core';

const StyledText = styled.div`
  font-weight: 600;
  margin-bottom: 5px;
  color: white;
  font-size: 16px;
`

const DimensionsWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 80%;
    align-items: center;
`

const StyledInput = styled(Input)`
  box-sizing: border-box;
  width: 40px;
  border: 1px solid ${({ theme }) => theme.colors.text};
  border-radius: 4px;
  && {
    height: ${props =>props.height};
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    padding: 5px 10px;
    background-color: none;
    color: ${({ theme }) => theme.colors.homiWhite};
  }
   .Mui-disabled{
    color: white;
  }
`



const DimensionsLabel = props => (
  <div>
    <StyledText>{props.text}</StyledText>
    <DimensionsWrapper>
      <StyledInput value={props.length} disabled/>
      <StyledText >x</StyledText>
      <StyledInput value={props.width} disabled/>
      <StyledText>x</StyledText>
      <StyledInput value={props.height} disabled/>
    </DimensionsWrapper>
  </div>
)

DimensionsLabel.propTypes = {
  text: string,
  length: string,
  width: string,
  height: string
}
export default DimensionsLabel
