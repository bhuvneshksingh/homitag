import React, { useState, useEffect } from 'react'
import { Grid, Container, Box, Dialog } from '@material-ui/core'
import { object } from 'prop-types'
import styled from 'styled-components'
import Cookies from 'universal-cookie'

// get user details api
import TickIcon from 'assets/images/icons/tick.svg'
import FlagIcon from 'assets/images/icons/flag.svg'
import { changeUserStatus, getUserDetails, ReportUser } from '../api'
// page header component
import Header from '../../../../../components/AdminPanel/Users/UserDetails/Header'
// user info head component
import UserInfoHead from '../../../../../components/AdminPanel/Users/UserDetails/UserInfoHead'
// user info component
import UserInfo from '../../../../../components/AdminPanel/Users/UserDetails/UserInfo'
// user notes component
import UserNotes from '../../../../../components/AdminPanel/Users/UserDetails/UserNotes'
// user contracts component
import UserContract from '../../../../../components/AdminPanel/Users/UserDetails/UserContract'
// supplier agreement
import UserSupplier from '../../../../../components/AdminPanel/Users/UserDetails/UserSupplier'
// user metrics component
import UserMetrics from '../../../../../components/AdminPanel/Users/UserDetails/UserMetrics'
// user reviews component
import UserReviews from '../../../../../components/AdminPanel/Users/UserDetails/UserReviews'
// history
import history from '../../../../../utils/history'
// loading
import Loading from '../../../../../components/Common/Loading'
import UserIcon from '../../../../../components/AdminPanel/Users/Icons'

const StyledBox = styled(Box)`
  && {
    background: #313334;
    border: 1px solid #4D4A4A;
    border-radius: 10px;
  }
`
const StyledBoxLeft = styled.div`
    width: 270px;
    
    img {
      width: 270px;
      height: 270px;
      border-radius: 10px;
    }
`
const StyledWhiteBox = styled(Box)`
  && {
    h1{
      font-weight: bold;
      font-size: 20px;
      color: #313334;
    }
    h2 {
      font-weight: bold;
      font-size: 18px;
      color: #969696;
    }
  }
`
const UserInfoBody = styled(Box)`
  && {
    color: #fff;
    p {
      font-size: 16px;
      span {
        padding-left: 8px;
      }
    }
    strong {
      font-weight: 500;
    }
  }
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
const UserDetails = ({ match }) => {
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(false)
  const userId = match.params.id
  const [successDialog, setSuccessDialog] = useState(false)
  const [successMsg, setSuccessMsg] = useState({
    title: null,
    msg: null,
    icon: null
  })

  const handleSuccessDialogClose = () => {
    getUser()
    setSuccessDialog(false)
  }

  const getUser = () => {
    setLoading(true)
    getUserDetails(userId)
      .then(res => {
        setUser(res.data)
      }).catch((e) => {
        if (e.response.data.error) {
          history.push('/admin-panel/users/accounts')
        }
      },
      ).finally(() => setLoading(false))
  }
  useEffect(() => {
    getUser()
  }, [userId])

  const userStatusChange = (status) => {
    if(status === 'report') {
      const cookies = new Cookies();
      const byUserId = cookies.get('userId')
      ReportUser(userId, byUserId, 'Other')
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
      changeUserStatus(userId, status)
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

  if (loading) return <Loading pageLoading transparent size={60}/>
  if (user && user.id) {
    return (
      <>
        <Container>
          <Header status={user.status} user={user.id} onStatusChange={(status) => userStatusChange(status)}/>
          <Grid container spacing={0}>
            <Grid item md={3}>
              <StyledBoxLeft>
                <img src={user.profilepictureurl} alt=""/>
              </StyledBoxLeft>
              <UserReviews user={user.id}/>
            </Grid>
            <Grid item md={9}>
              {user.kindsUser.supplier &&
              <StyledBox px={3} py={2} mb={2}>
                <UserInfoBody>
                  <Box display="flex" alignItems="center">
                    <Box mr={2} style={{ height: 27 }}>
                      <UserIcon icon="notice" color="#fff"/>
                    </Box>
                    <Box flexGrow={1}>
                      <p>
                        This is supplier account
                      </p>
                    </Box>
                  </Box>
                </UserInfoBody>
              </StyledBox>
              }
              <StyledBox>
                <UserInfoHead name={user.name} id={user.userId} status={user.status}/>
                <UserInfoBody p={3}>
                  <UserInfo user={user}/>
                </UserInfoBody>
              </StyledBox>
              <StyledBox mt={3}>
                <UserInfoHead name="Internal Notes"/>
                <UserInfoBody p={3}>
                  <UserNotes/>
                </UserInfoBody>
              </StyledBox>
              <StyledBox mt={3}>
                <UserInfoBody px={3} py={2}>
                  <UserContract/>
                </UserInfoBody>
              </StyledBox>
              {user.kindsUser.supplier &&
              <StyledBox mt={3}>
                <UserInfoBody px={3} py={2}>
                  <UserSupplier/>
                </UserInfoBody>
              </StyledBox>
              }
              <StyledWhiteBox mt={4}>
                <UserInfoBody p={3}>
                  <UserMetrics/>
                </UserInfoBody>
              </StyledWhiteBox>
            </Grid>
          </Grid>
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
        </Container>
      </>
    )
  }
  return (<></>)
}

UserDetails.propTypes = {
  match: object,
}
export default UserDetails
