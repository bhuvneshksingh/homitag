import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Dialog, Box } from '@material-ui/core'
import { object, array, number, func } from 'prop-types'
import styled from 'styled-components'
import Cookies from 'universal-cookie'
import { format, parseISO } from 'date-fns'
import idx from 'idx'

import TickIcon from 'assets/images/icons/tick.svg'
import FlagIcon from 'assets/images/icons/flag.svg'

import ListItemActions from '../../../../components/AdminPanel/Users/ListItemAction'
import Stars from '../../../../components/Common/Stars';
import { changeUserStatus, ReportUser } from './api'

const FlexTable = styled.div`
  display: flex;
  width: 100%;
  padding: 0 32px;
  flex-flow: row;
  > div {
    align-items: center;
    display: flex;
    width: calc(100% / 10.5);
    text-align: left;
  }
`
const ItemWrapper = styled.div`
  background: ${({ theme }) => theme.colors.homiBlack};
  border-radius: 10px;
  height: 112px;
  display: flex;
  align-items: center;
  && {
    margin-bottom: 15px;
  }
`
const ImgWrapper = styled.div`
  width: 46px;
  height: 46px;
  background: ${({ theme }) => theme.colors.homiGrey};
  border-radius: 10px;
  overflow: hidden;
  ::before {
    content: '';
  }
  img {
    width: 46px;
    height: 46px;
    object-fit: cover;
  }
`
const StyledText = styled.p`
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  word-wrap: break-word;
  white-space: pre-wrap;
  color: white;
`
const StyledLink = styled(Link)`
  text-decoration: none;
  `
const StyledDialogHeading = styled.h2`
  font-size: 20px;
  line-height: 24px;
  font-weight: 500
`
const StyledParagraph = styled.p`
  font-size: 16px;
  line-height: 22px;
  color: #969696;
  margin: 20px auto;
  width: 355px;
`
const StyledDoneButton = styled.button`
  height: 52px;
  font-family: Montserrat;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  cursor: pointer;
  width: 100%;
  display: block;
  color: white;
  background: #7471FF;
`

const ListItem = ({ user, columns, tableWidth, onActionDone }) => {

  const [successDialog, setSuccessDialog] = useState(false)
  const [successMsg, setSuccessMsg] = useState({
    title: null,
    msg: null,
    icon: null
  })

  const handleSuccessDialogClose = () => {
    setSuccessDialog(false)
    onActionDone()
  }

  const userStatusChange = (status) => {
    if(status === 'report') {
      const cookies = new Cookies();
      const byUserId = cookies.get('userId')
      ReportUser(user.id, byUserId, 'Other')
        .then(() => {
          setSuccessDialog(true)
          setSuccessMsg({
            title: 'User Reported',
            msg: 'This user has been reported and is pending\n' +
              'an investigation by the Homitag team.',
            icon: FlagIcon
          })
        })
    }
    else {
      changeUserStatus(user.id, status)
        .then(() => {
          setSuccessDialog(true)
          switch (status) {
            case 'active':
              setSuccessMsg({
                title: 'User Reactivated',
                msg: 'This user has been successfully reactivated and notified.',
              })
              break
            case 'delete':
              setSuccessMsg({
                title: 'User Deleted',
                msg: 'This user has been successfully deleted and notified.',
              })
              break
            default:
              setSuccessMsg({
                title: 'User Deactivated',
                msg: 'This user has been successfully deactivated and notified.',
              })
              break;
          }
        })
    }
  }

  return (
    <>
      <ItemWrapper style={{ marginRight: tableWidth > 1440 ? 40: 0 }}>
        <FlexTable>
          {
            columns.map(column => (
              <>
                { column.field ==='img' &&
                <Link style={{ width: column.width }} key={column.id} to={`/admin-panel/users/accounts/${user.id}`}>
                  <ImgWrapper>
                    {user[column.id] && user[column.id].length > 0 && <img
                      src={idx(user, column.accessor)}
                      alt={user.firstName}
                    />}
                  </ImgWrapper>
                </Link>
                }
                { column.field ==='star' &&
                <div style={{ width: column.width }} key={column.id}>
                  <Stars initialCount={idx(user, column.accessor)} />
                </div>
                }
                { column.field ==='date' &&
                <div style={{ width: column.width }} key={column.id}>
                  <StyledText>
                    {format(parseISO(idx(user, column.accessor)), 'dd/MM/yyyy')}
                  </StyledText>
                </div>
                }
                { !column.field &&
                <div style={{ width: column.width }} key={column.id}>
                  <StyledLink to={`/admin-panel/users/accounts/${user.id}`}>
                    <StyledText>
                      {idx(user, column.accessor)}
                    </StyledText>
                  </StyledLink>
                </div>
                }
                { column.field ==='button' &&
                <div
                  style={{
                    width: column.width,
                    position: 'absolute',
                    top: '50%',
                    right: tableWidth > 1440 ? 60: 20,
                    transform: 'translateY(-50%)'
                  }} key={column.id}>
                  <ListItemActions
                    user={user.id}
                    status={user.status}
                    onStatusChange={(status) => userStatusChange(status, )}
                  />
                </div>
                }
              </>
            ))
          }

        </FlexTable>
      </ItemWrapper>
      <Dialog
        onClose={handleSuccessDialogClose}
        maxWidth="sm"
        fullWidth
        open={successDialog}>
        <Box p={4} style={{ textAlign: 'center' }}>
          <img src={successMsg.icon || TickIcon} alt={successMsg.title}/>
          <Box mt={3}>
            <StyledDialogHeading>{successMsg.title}</StyledDialogHeading>
            <StyledParagraph>
              {successMsg.msg}
            </StyledParagraph>
          </Box>
        </Box>
        <StyledDoneButton onClick={handleSuccessDialogClose}>
          Done
        </StyledDoneButton>
      </Dialog>
    </>
  )
}

ListItem.propTypes = {
  user: object,
  columns: array,
  tableWidth: number,
  onActionDone: func
}
ListItem.defaultProps = {}
export default ListItem
