import React from 'react'
import { func, object } from 'prop-types'
import { injectIntl } from 'react-intl'
import styled from 'styled-components'

const StyledTabs = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  && {
    background: ${({ theme }) => theme.colors.homiBlack};
    color: white;
    border-radius: 10px;
    && .MuiTabs-indicator {
      display: none
    }
    && .MuiTab-root {
      text-transform: none;
    }
    && .MuiTab-wrapper {
      font-size: 16px;
    }
`
const StyledTab = styled.li`
  display: block;
  && {
    opacity: 1;
    display: block;
    width: 100%;
    text-align: center;
  }
`
const StyledTabButton = styled.button`
  background-color: ${props => props.active ? ({ theme }) => theme.colors.homiPrimary : "transparent"};
  text-decoration: none;
  display: block;
  width: 100%;
  font-size: 16px;
  font-weight: 500;
  padding: 20px;
  border-radius: 10px;
  cursor: pointer;
  font-family: Montserrat;
  transition: color ease 0.5s;
  color: ${({ theme }) => theme.colors.homiWhite};
  &:hover {
    color: ${props => props.active ? "white" : ({ theme }) => theme.colors.homiPrimary};
  }
`

const TabFilter = ({filters, onPositive, onNegative, onAllReviews}) => (
  <>
    <StyledTabs>
      <StyledTab>
        <StyledTabButton type="button" active={!filters.searchText && !filters.rating && !filters.direction} onClick={onAllReviews}>
          All Reviews
        </StyledTabButton>
      </StyledTab>
      <StyledTab>
        <StyledTabButton type="button" onClick={onPositive} active={filters.rating && filters.direction === 'above'}>
          Positive
        </StyledTabButton>
      </StyledTab>
      <StyledTab>
        <StyledTabButton type="button" onClick={onNegative} active={filters.rating && filters.direction === 'below'}>
          Negative
        </StyledTabButton>
      </StyledTab>
    </StyledTabs>
  </>
)

TabFilter.propTypes = {
  filters: object,
  onPositive: func,
  onNegative: func,
  onAllReviews: func
}

TabFilter.defaultProps = {
}
export default injectIntl(TabFilter)
