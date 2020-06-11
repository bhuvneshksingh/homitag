import React from 'react'
import { func, string } from 'prop-types'
import styled from 'styled-components'

const TopBar = styled.div`
  display: flex;
  margin-bottom: 30px;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
`

const Side = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`

const Center = styled.div``

export const PageHeader = ({ leftSide, rightSide, pageTitle }) => (
  <TopBar>
    <Side>{leftSide()}</Side>
    <Center>{pageTitle}</Center>
    <Side>{rightSide()}</Side>
  </TopBar>
)

PageHeader.propTypes = {
  leftSide: func,
  rightSide: func,
  pageTitle: string,
}

PageHeader.defaultProps = {
  leftSide: () => {},
  rightSide: () => {},
  pageTitle: '',
}
