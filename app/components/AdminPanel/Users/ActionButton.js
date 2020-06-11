import React from 'react'
import { IconButton } from '@material-ui/core'
import styled from 'styled-components'
import { format } from 'date-fns'
import MoreDots from 'assets/images/icons/more-white.svg'
import { func, object, number } from 'prop-types'
import { getCSV } from '../../../containers/AdminPanel/Dashboard/Users/api'
import filter from '../../../containers/AdminPanel/Dashboard/Users/FilterController'
// styles
import {
  StyledMenu,
  StyledMenuItem,
  StyledH6,
  StyledListItemText,
} from './styles'

const StyledIconButton = styled(IconButton)`
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
const StyledImg = styled.img`
  width: 20px;
  height: 18px;
`
const ActionButton = ({ onDeactivate, onDelete, filters, page }) => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const userKind = filter.userKind(filters)
  const createdAtGreater = filters.createdAtGreater ? filters.createdAtGreater : null
  const createdAtLess = filters.createdAtLess ? filters.createdAtLess : null
  const ratingAtGreater = filters.ratingAtGreater ? filters.ratingAtGreater : null
  const ratingAtLess = filters.ratingAtLess ? filters.ratingAtLess : null
  const status = filters.status ? filters.status : null
  const perPage = 5

  const handleDownloadCSV = () => {
    getCSV({
      page,
      perPage,
      userKind,
      createdAtGreater,
      createdAtLess,
      ratingAtGreater,
      ratingAtLess,
      status,
    })
      .then(res => {
        const url = window.URL.createObjectURL(new Blob([res.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', `user_accounts_${format(new Date(), 'dd/MM/yyyy hh:mm:ss')}.csv`)
        document.body.appendChild(link)
        link.click()
      })
  }
  return (
    <>
      <StyledIconButton onClick={handleClick}>
        <StyledImg src={MoreDots}/>
      </StyledIconButton>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem>
          <StyledH6>User Account Actions</StyledH6>
        </StyledMenuItem>
        <StyledMenuItem onClick={() => handleDownloadCSV()}>
          <StyledListItemText>Download Current View as CSV</StyledListItemText>
        </StyledMenuItem>
        <StyledMenuItem>
          <StyledListItemText>Report Users</StyledListItemText>
        </StyledMenuItem>
        <StyledMenuItem onClick={onDeactivate}>
          <StyledListItemText>Deactivate Users</StyledListItemText>
        </StyledMenuItem>
        <StyledMenuItem onClick={onDelete}>
          <StyledListItemText>Delete Accounts</StyledListItemText>
        </StyledMenuItem>
      </StyledMenu>
    </>
  )
}
ActionButton.propTypes = {
  onDeactivate: func,
  onDelete: func,
  filters: object,
  page: number,
}
export default ActionButton
