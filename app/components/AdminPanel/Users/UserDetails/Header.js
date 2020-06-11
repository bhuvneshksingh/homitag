import React from 'react'
import { Grid, Menu, MenuItem, withStyles, Dialog, Box } from '@material-ui/core'
import { Link } from 'react-router-dom'
import MoreIcon from 'assets/images/icons/more-purple.png'
import CloseCircle from 'assets/images/icons/close-circle.svg'
import Reactivate from 'assets/images/icons/reactivate.svg'
import Flag from 'assets/images/icons/flag.svg'
import styled from 'styled-components'
import { string, func } from 'prop-types'
import { StyledHeading, StyledMore, TopSection } from './styles'
import ArrowBackButton from '../../../Common/ArrowBackButton'

const MoreGrid = styled(Grid)`
  && {
    text-align: right;
  }
`
const StyledMenuItem = styled(MenuItem)`
  && {
    padding: 0 26px;
  }
`
const StyledListItemText = styled.div`
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
const StyledLinkItem = styled(Link)`
  font-size: 14px;
  line-height: 17px;
  padding: 10px 0;
  display: block;
  color: #313334;
  text-decoration: none;
  &:hover {
    background: none;
  }
`
const StyledMoreButton = styled.button`
  && {
    cursor: pointer;
  }
`
const StyledH6 = styled(StyledListItemText)`
    && {
        font-weight: 600;
        font-size: 14px;
        margin-bottom: 8px;
        &:hover {
            cursor: default;
            background: none;

        }
    }
`
const StyledMenu = withStyles({
  paper: {
    boxShadow: '0px 4px 20px rgba(29, 29, 29, 0.35)',
    borderRadius: 10,
    marginTop: 24,
    marginLeft: 16,
    minWidth: 280,
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
const StyledDialogHeading = styled.h2`
  font-size: 20px;
  line-height: 24px;
  font-weight: 500
`
const StyledParagraph = styled.p`
  font-size: 16px;
  line-height: 22px;
  color: #969696;
  margin: 20px 0 40px;
`
const StyledButton = styled.button`
  height: 52px;
  font-family: Montserrat;
  border-radius: 10px;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  cursor: pointer;
  width: 100%;
  display: block;
  
  margin-top: 20px;
`
const StyledSubmitButton = styled(StyledButton)`
  && {
      color: white;
      background: #7471FF;
  }
`
const StyledCancelButton = styled(StyledButton)`
  && {
      color: #7471FF;
      background: #fff;
      border: 1px solid #7471FF;
  }
`
const Header = ({ user, status, onStatusChange }) => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const [DeactivateDialog, setDeactivateDialog] = React.useState(false)
  const [ReactivateDialog, setReactivateDialog] = React.useState(false)
  const [DeleteDialog, setDeleteDialog] = React.useState(false)
  const [ReportDialog, setReportDialog] = React.useState(false)

  const handleDeactivateDialogOpen = () => {
    setDeactivateDialog(true)
    setAnchorEl(false)
  }
  const handleDeactivateDialogClose = () => {
    setDeactivateDialog(false)
  }
  const handleReactivateDialogOpen = () => {
    setReactivateDialog(true)
    setAnchorEl(false)
  }
  const handleReactivateDialogClose = () => {
    setReactivateDialog(false)
  }
  const handleDeleteDialogOpen = () => {
    setDeleteDialog(true)
    setAnchorEl(false)
  }
  const handleDeleteDialogClose = () => {
    setDeleteDialog(false)
  }
  const handleReportDialogOpen = () => {
    setReportDialog(true)
    setAnchorEl(false)
  }
  const handleReportDialogClose = () => {
    setReportDialog(false)
  }

  return (
    <>
      <TopSection>
        <Grid item md={2}>
          <ArrowBackButton
            title="User Accounts"
            backRoute="/admin-panel/users/accounts"
          />
        </Grid>
        <Grid item md={8}>
          <StyledHeading>User Details</StyledHeading>
        </Grid>
        <MoreGrid item md={2}>
          <StyledMoreButton onClick={handleClick}>
            <StyledMore src={MoreIcon}/>
          </StyledMoreButton>
          <StyledMenu
            id="customized-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <StyledMenuItem>
              <StyledH6>User Actions</StyledH6>
            </StyledMenuItem>
            <StyledMenuItem>
              <StyledListItemText>View Order History</StyledListItemText>
            </StyledMenuItem>
            <StyledMenuItem>
              <StyledListItemText>View User&apos;s Listings</StyledListItemText>
            </StyledMenuItem>
            <StyledMenuItem>
              <StyledLinkItem to={`/admin-panel/users/support?user=${user}`}>View Cust Support History</StyledLinkItem>
            </StyledMenuItem>
            <StyledMenuItem>
              <StyledListItemText>View Chat History</StyledListItemText>
            </StyledMenuItem>
            <StyledMenuItem>
              <StyledListItemText>Contact User</StyledListItemText>
            </StyledMenuItem>
            <StyledMenuItem onClick={handleReportDialogOpen}>
              <StyledListItemText>Report User</StyledListItemText>
            </StyledMenuItem>
            {status && status === 'deactivated' &&
            <StyledMenuItem onClick={handleReactivateDialogOpen}>
              <StyledListItemText>Activate User</StyledListItemText>
            </StyledMenuItem>
            }
            {status && status === 'active' &&
            <StyledMenuItem onClick={handleDeactivateDialogOpen}>
              <StyledListItemText>Deactivate User</StyledListItemText>
            </StyledMenuItem>
            }
            <StyledMenuItem onClick={handleDeleteDialogOpen}>
              <StyledListItemText>Delete User</StyledListItemText>
            </StyledMenuItem>
          </StyledMenu>
        </MoreGrid>
      </TopSection>
      <Dialog
        onClose={handleDeactivateDialogClose}
        maxWidth="sm"
        fullWidth
        open={DeactivateDialog}>
        <Box p={4} style={{ textAlign: 'center' }}>
          <img src={CloseCircle} alt="deactivate"/>
          <Box mt={3}>
            <StyledDialogHeading>Deactivate User?</StyledDialogHeading>
            <StyledParagraph>
              Are you sure you want to deactivate this user?<br/>
              They`ll be notified as well.
            </StyledParagraph>
            <StyledSubmitButton
              onClick={() => {
                onStatusChange('deactivated')
                setDeactivateDialog(false)
              }}>
              Deactivate User
            </StyledSubmitButton>
            <StyledCancelButton onClick={handleDeactivateDialogClose}>
              Cancel
            </StyledCancelButton>
          </Box>
        </Box>
      </Dialog>
      <Dialog
        onClose={handleReactivateDialogClose}
        maxWidth="sm"
        fullWidth
        open={ReactivateDialog}>
        <Box p={4} style={{ textAlign: 'center' }}>
          <img src={Reactivate} alt="deactivate"/>
          <Box mt={3}>
            <StyledDialogHeading>Reactivate Account?</StyledDialogHeading>
            <StyledParagraph>
              Are you sure you want to reactivate<br/>
              this user account?
            </StyledParagraph>
            <StyledSubmitButton
              onClick={() => {
                onStatusChange('active')
                setReactivateDialog(false)
              }}>
              Reactivate Account
            </StyledSubmitButton>
            <StyledCancelButton onClick={handleReactivateDialogClose}>
              Cancel
            </StyledCancelButton>
          </Box>
        </Box>
      </Dialog>
      <Dialog
        onClose={handleDeleteDialogClose}
        maxWidth="sm"
        fullWidth
        open={DeleteDialog}>
        <Box p={4} style={{ textAlign: 'center' }}>
          <img src={CloseCircle} alt="deactivate"/>
          <Box mt={3}>
            <StyledDialogHeading>Delete User?</StyledDialogHeading>
            <StyledParagraph>
              Deleting an account is a permanent action.<br/>
              are you sure want to proceed?
            </StyledParagraph>
            <StyledSubmitButton
              onClick={() => {
                onStatusChange('delete')
                setDeleteDialog(false)
              }}>
              Delete User
            </StyledSubmitButton>
            <StyledCancelButton onClick={handleDeleteDialogClose}>
              Cancel
            </StyledCancelButton>
          </Box>
        </Box>
      </Dialog>
      <Dialog
        onClose={handleReportDialogClose}
        maxWidth="sm"
        fullWidth
        open={ReportDialog}>
        <Box p={4} style={{ textAlign: 'center' }}>
          <img src={Flag} alt="report"/>
          <Box mt={3}>
            <StyledDialogHeading>Report User?</StyledDialogHeading>
            <StyledParagraph>
              Are you sure you want to report this user? Their<br/>
              account will be investigated for abuse.
            </StyledParagraph>
            <StyledSubmitButton
              onClick={() => {
                onStatusChange('report')
                setReportDialog(false)
              }}>
              Report User
            </StyledSubmitButton>
            <StyledCancelButton onClick={handleReportDialogClose}>
              Cancel
            </StyledCancelButton>
          </Box>
        </Box>
      </Dialog>
    </>
  )
}
Header.propTypes = {
  status: string,
  user: string,
  onStatusChange: func
}
export default Header
