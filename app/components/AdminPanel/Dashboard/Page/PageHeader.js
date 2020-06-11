import React from 'react'
import { object, string } from 'prop-types'
import styled from 'styled-components'

const TopBar = styled.div`
  display: flex;
  margin-bottom: 24px;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  justify-content: space-between;
`
const Side = styled.div`
  display: flex;
  align-items: center;
`
const LeftSide = styled(Side)`
    && {
        width: 320px;
    }
`
export const PageHeader = ({ rightSide, pageTitle }) => (
  <TopBar>
    <LeftSide>{pageTitle}</LeftSide>
    <Side>{rightSide}</Side>
  </TopBar>
)

PageHeader.propTypes = {
  rightSide: object,
  pageTitle: string,
}

PageHeader.defaultProps = {
  rightSide: () => {},
  pageTitle: '',
}
