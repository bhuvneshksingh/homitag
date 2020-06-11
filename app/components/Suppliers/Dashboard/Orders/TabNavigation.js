import React from 'react'
import { array } from 'prop-types'
import { injectIntl } from 'react-intl'
import styled from 'styled-components'
import {NavLink} from 'react-router-dom';

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
  background-color: ${props => props.active ? ({ theme }) => theme.colors.homiPrimary : "transparent"};
  && {
    border-radius: 10px;
    opacity: 1;
    display: block;
    width: 100%;
    text-align: center;
    a {
      text-decoration: none;
      display: block;
      width: 100%;
      padding: 20px;
    }
    div {
      color: ${({ theme }) => theme.colors.homiWhite};
    }
    && strong {
      color: ${props => props.active ? ({ theme }) => theme.colors.homiWhite : ({ theme }) => theme.colors.homiPrimary};
    }
  }
`

const TabNavigation = ({ tabItems }) => (
  <>
      <StyledTabs>
        {tabItems.map(item =>
          <StyledTab key={item.title.toString()} active={window.location.pathname === item.route}>
            <NavLink to={item.route}><div>{item.title} <strong>({item.count})</strong></div></NavLink>
          </StyledTab>
        )}
      </StyledTabs>
    </>
)

TabNavigation.propTypes = {
  tabItems: array,
}

TabNavigation.defaultProps = {
  tabItems: {
  }
}
export default injectIntl(TabNavigation)
