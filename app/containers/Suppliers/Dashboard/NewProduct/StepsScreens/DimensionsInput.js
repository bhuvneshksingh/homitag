import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import InputNumber from '../../../../../components/Common/Form/Input/InputNumber'

const Main = styled.div`
  width: 80%;
`
const StyledText = styled.div`
  margin-bottom: 5px;
  color: black;
`

const DimensionsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  align-items: center;
`

const FormErrorSpan = styled.div`
  font-size: 12px;
  color: red;
`

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const DimensionsLabel = props => (
  <Main>
    <StyledText>{props.text}</StyledText>
    <DimensionsWrapper>
      <InputNumber
        id="length"
        value={props.values.length}
        style={{ width: 50 }}
        onChange={e => {
          const length = e.target.value
          if (length > -1) {
            const { height, width } = props.values
            props.setFieldValue('volume', height * width * length)
            props.handleChange(e)
          }
        }}
        placeholder="L"
      />
      <StyledText>x</StyledText>
      <InputNumber
        id="width"
        style={{ width: 50 }}
        value={props.values.width}
        onChange={e => {
          const width = e.target.value
          if (width > -1) {
            const { height, length } = props.values
            props.setFieldValue('volume', height * width * length)
            props.handleChange(e)
          }
        }}
        placeholder="W"
      />
      <StyledText>x</StyledText>
      <InputNumber
        id="height"
        style={{ width: 50 }}
        value={props.values.height}
        onChange={e => {
          const height = e.target.value
          if (height > -1) {
            const { width, length } = props.values
            props.setFieldValue('volume', height * width * length)
            props.handleChange(e)
          }
        }}
        placeholder="H"
      />
    </DimensionsWrapper>
    <ErrorContainer>
      <FormErrorSpan>{props.touched.width && props.errors.width}</FormErrorSpan>
      <FormErrorSpan>
        {props.touched.height && props.errors.height}
      </FormErrorSpan>
      <FormErrorSpan>
        {props.touched.length && props.errors.length}
      </FormErrorSpan>
    </ErrorContainer>
  </Main>
)

DimensionsLabel.propTypes = {
  errors: PropTypes.object,
  handleChange: PropTypes.func,
  setFieldValue: PropTypes.func,
  text: PropTypes.string,
  values: PropTypes.object,
  touched: PropTypes.object,
}
export default DimensionsLabel
