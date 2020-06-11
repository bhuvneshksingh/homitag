import React from 'react'
import { object, func, string, array } from 'prop-types'
import { Menu, MenuItem } from '@material-ui/core'
import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'

const StyledMenu = styled(Menu)`
  ${({ theme }) =>
    css`
      .MuiPaper-root {
        background-color: ${theme.colors.homiWhite};
      }
      .MuiMenuItem-root {
        color: ${theme.colors.homiBlack};
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
  id
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
    >
      {title && <MenuTitle>{title}</MenuTitle>}
      {items.map( item => {
        if (item.actionType === 'page' && item.destination !== null) {
          return (
            <StyledLink to={item.destination} key={`${id  }_${  item.label}`}>
              <StyledMenuItem >
                {item.label}
              </StyledMenuItem>
            </StyledLink>
          )
        }
        if (item.actionType === 'none') {
          return (
            <StyledMenuItem key={`${id  }_${  item.label}`}>
              {item.label}
            </StyledMenuItem>
          )
        }
        if (item.actionType === 'modal') {
          return (
            <StyledMenuItem onClick={() => handleClick(item.value)} key={`${id  }_${  item.label}`}>
              {item.label}
            </StyledMenuItem> 
          )
        }
        return (<></>)
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
  id: string
}

Dropdown.defaultProps = {
  items: [],
  anchorEl: null,
}

export default Dropdown
