import React from 'react'
import { string } from 'prop-types'
import styled from 'styled-components'

const Text = styled.p`
  font-size: 16px;
  line-height: 20px;
  color: #969696;
  margin-bottom: 10px;
  margin-top: 10px;
 `

export const LightText = (props) => (
  <Text>
    {props.text}
  </Text>
)

LightText.propTypes = {
  text: string
}
