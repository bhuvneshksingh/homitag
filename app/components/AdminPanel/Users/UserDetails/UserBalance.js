import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { object } from 'prop-types'
import idx from 'idx'
import { Box } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'

import UserIcon from '../Icons'
import {
  StyledLink,
} from './styles'

const styles = theme => ({
  root: {
    margin: 0,
    padding: '30px 0',
  },
  h5: {
    fontWeight: 600,
    fontSize: 20,
    lineHeight: '24px',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(2),
    top: theme.spacing(2),
  },
})
const BalanceDialog = styled(Dialog)`
  .MuiDialog-paper {
    border-radius: 10px;
    box-shadow: none;
    min-width: 611px
  }
`
const BalanceBox = styled(Box)`
  && {
    border: 1px solid #eaeaea;
    border-radius: 4px;
    padding: 12px 14px;
  }
`
const StyledPara = styled.p`
    color: #969696;
    font-size: 16px;
    line-height: 22px;
    font-style: normal;
`
const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h5" align="center" className={classes.h5}>{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <UserIcon icon="close" color="#7471FF" style={{ width: 21, height: 21 }}/>
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
})

const DialogContent = withStyles(() => ({
  root: {
    border: 'none',
    padding: '0 64px 40px',
  },
}))(MuiDialogContent)

const BalanceWithCurrency = balance => {
  const amount = idx(balance, _ => _.available[0].amount / 100) || 0
  const currency = idx(balance, _ => _.available[0].currency) || 'usd'
  return (
    <>
      <span>
        {amount.toLocaleString(undefined, { style: 'currency', currency })}
      </span>
    </>
  )
}

const UserBalance = ({ info }) => {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <StyledLink onClick={handleClickOpen}>
        <p>
          <strong>Account Balance: </strong>
          {BalanceWithCurrency(info.balance)}
        </p>
      </StyledLink>
      <BalanceDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Account Balance
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom variant="h6">
            Current Available Balance
          </Typography>
          <Box display="flex" alignItems="center" mt={2}>
            <Box
              mr={2}>{
                idx(info.balance, _ => _.available[0].currency) === 'usd' ? '$' : idx(info.balance, _ => _.available[0].currency)
                || '$'}</Box>
            <BalanceBox flexGrow={1}>{idx(info.balance, _ => _.available[0].amount / 100) || 0}</BalanceBox>
          </Box>
          <Box mt={5}>
            <Box display="flex" alignItems="center" mb={2} justifyContent="flex-end">
              <Box flexGrow={1}>
                <StyledPara>
                  Starting Balance
                </StyledPara>
              </Box>
              <Box>
                <StyledPara>
                  - $XX.XX
                </StyledPara>
              </Box>
            </Box>
            <Box display="flex" alignItems="center" mb={2} justifyContent="flex-end">
              <Box flexGrow={1}>
                <StyledPara>
                  Total Fees
                </StyledPara>
              </Box>
              <Box>
                <StyledPara>
                  - $XX.XX
                </StyledPara>
              </Box>
            </Box>
            <Box display="flex" alignItems="center" mb={2} justifyContent="flex-end">
              <Box flexGrow={1}>
                <StyledPara>
                  Claims on Hold
                </StyledPara>
              </Box>
              <Box>
                <StyledPara>
                  - $XX.XX
                </StyledPara>
              </Box>
            </Box>
            <Box display="flex" alignItems="center" mb={2} justifyContent="flex-end">
              <Box flexGrow={1}>
                <StyledPara>
                  Returns on Hold
                </StyledPara>
              </Box>
              <Box>
                <StyledPara>
                  - $XX.XX
                </StyledPara>
              </Box>
            </Box>
            <Box display="flex" alignItems="center" mb={4} justifyContent="flex-end">
              <Box flexGrow={1}>
                <StyledPara>
                  Cost of Labels
                </StyledPara>
              </Box>
              <Box>
                <StyledPara>
                  - $XX.XX
                </StyledPara>
              </Box>
            </Box>
            <Box display="flex" alignItems="center" justifyContent="flex-end">
              <Box flexGrow={1}>
                <Typography gutterBottom variant="h6">
                  Current Available Balance
                </Typography>
              </Box>
              <Box>
                <Typography gutterBottom variant="h6">
                  {BalanceWithCurrency(info.balance)}
                </Typography>
              </Box>
            </Box>
          </Box>

        </DialogContent>
      </BalanceDialog>
    </>
  )
}
UserBalance.propTypes = {
  info: object,
}
export default UserBalance
