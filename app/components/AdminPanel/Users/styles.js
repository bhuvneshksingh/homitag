import styled from 'styled-components'
import { IconButton, Button, MenuItem, withStyles, Menu } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'

export const StyledActionButton = styled(Button)`
  && {
    background: ${({ theme }) => theme.colors.homiPrimary};
    border-radius: 10px;
    color: ${({ theme }) => theme.colors.homiWhite};
    font-weight: 600;
    font-size: 16px;
    padding: 16px 32px;
    text-transform: none;
    display: block;
    :disabled {
      background: ${({ theme }) => theme.colors.text};
      color: ${({ theme }) => theme.colors.homiWhite};
    }
    :hover {
      background: ${({ theme }) => theme.colors.homiGrey};
      color: ${({ theme }) => theme.colors.homiBlack};
    }
  }
`
export const StyledIconButton = styled(IconButton)`
  width: 66px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  && {
    background-color: ${({ theme }) => theme.colors.homiPrimary};
    border-radius: 10px;
    margin-left: 16px;
  }
`
// popover
export const PopOverTopCloseButton = styled(IconButton)`
    && {
      background: none;
      position: absolute;
      top: 46px;
      right: 30px;
`
export const StyledPopoverBody = styled.div`
    padding: 56px;
    position: relative;
    > h4 {
        font-weight: 600;
        font-size: 20px;
        line-height: 24px;
        text-align: center;
    }
`
export const StyledImg = styled.img`
  width: 20px;
`
// checkbox style
export const StyledCheckBox = makeStyles({
  root: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  icon: {
    borderRadius: 4,
    width: 24,
    height: 24,
    boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: '#fff',
  },
  icon_rounded: {
    width: 32,
    height: 32,
    borderRadius: 32,
    boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: '#fff',
  },
  checkedIcon: {
    backgroundColor: '#7471FF',
    '&:before': {
      display: 'block',
      width: 16,
      height: 11,
      top: '50%',
      position: 'absolute',
      transform: 'translate(-50%, -50%)',
      left: '50%',
      backgroundImage:
        'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 16 11\'%3E%3Cpath fill=\'%23fff\' d=\'M15.566.266a.908.908 0 00-1.283 0L6.268 8.28 2.05 4.061A.908.908 0 00.766 5.345l4.86 4.86a.905.905 0 001.284 0l8.656-8.656a.908.908 0 000-1.283z\'/%3E%3C/svg%3E")',
      content: '""',
    },
    'input:hover ~ &': {
      backgroundColor: '#106ba3',
    },
  },

})

export const StyledMenuItem = styled(MenuItem)`
  && {
    padding: 0 26px;
  }
`
export const StyledListItemText = styled.div`
  && {
      font-size: 14px;
      line-height: 17px;
      padding: 10px 0;

      color: #313334;
      &:hover {
        background: none;
      }
  }
`
export const StyledH6 = styled(StyledListItemText)`
    && {
        font-weight: 600;
        font-size: 14px;
        &:hover {
            cursor: default;
            background: none;
        
        }
    }
`
export const StyledMenu = withStyles({
  paper: {
    boxShadow: '0px 4px 20px rgba(29, 29, 29, 0.35)',
    borderRadius: 10,
    marginTop: 24,
    marginLeft: 16,
    overflow: 'visible',
    '&::after': {
      content: '""',
      right: 10,
      display: 'block',
      top: -16,
      position: 'absolute',
      width: 0,
      height: 0,
      borderTop: 0,
      borderBottom: '20px solid #fff',
      borderLeft: '10px solid transparent',
      borderRight: '10px solid transparent',
    },
  },
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))
export const StyledMenuTwo = withStyles({
  paper: {
    boxShadow: '0px 4px 20px rgba(29, 29, 29, 0.35)',
    borderRadius: 10,
    marginTop: 24,
    marginLeft: 16,
  },
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
))
