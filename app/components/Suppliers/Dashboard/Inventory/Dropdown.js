import React from 'react'
import { object, func, string, array, bool } from 'prop-types'
import { Menu, MenuItem } from '@material-ui/core'
import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom';

const StyledMenu = styled(Menu)`
  ${({ theme, primary }) =>
    primary &&
    css`
      .MuiPaper-root {
        background-color: ${theme.colors.homiPrimary};
      }
      .MuiMenuItem-root {
        color: ${theme.colors.homiWhite};
      }
    `}
`

const MenuTitle = styled(MenuItem)`
  && {
    cursor: unset;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    pointer-events: none;
    :hover {
      background-color: inherit;
    }
  }
`

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;  
`
const StyledMenuItem = styled(MenuItem)`
  && {
    font-weight: normal;
    font-size: 14px;
    line-height: 17px;
  }
`

const Dropdown = ({
  anchorEl,
  onClose,
  onItemClick,
  title,
  items,
  primary,
}) => {
  const handleClick = value => {
    onItemClick(value)
    onClose()
  }
  return (
    <StyledMenu
      id="simple-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={onClose}
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      primary={primary}
    >
      {title && <MenuTitle>{title}</MenuTitle>}
      {items.map( item => {
        if (item.actionType === 'page' && item.destination !== null) {
          return (
            <StyledLink to={item.destination} key={item.value}>
              <StyledMenuItem >
                {item.label}
              </StyledMenuItem>
            </StyledLink>
          )
        }
        return(
          <StyledMenuItem onClick={() => handleClick(item.value)}>
            {item.label}
          </StyledMenuItem>
        )
      })}
    </StyledMenu>
  )
}

Dropdown.propTypes = {
  anchorEl: object,
  onClose: func,
  onItemClick: func,
  title: string,
  items: array,
  primary: bool,
}

Dropdown.defaultProps = {
  items: [],
  primary: false,
}

export default Dropdown
