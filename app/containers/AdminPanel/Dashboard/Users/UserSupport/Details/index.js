import React, { useEffect, useState } from 'react'
import { injectIntl } from 'react-intl'
import { Grid, Container, Box } from '@material-ui/core'
import { object } from 'prop-types'

// import { object } from 'prop-types'
import styled from 'styled-components'

import Header from '../../../../../../components/AdminPanel/Users/UserSupport/Details/Header'
import Conversations from '../../../../../../components/AdminPanel/Users/UserSupport/Details/Conversations'
import ReplayForm from '../../../../../../components/AdminPanel/Users/UserSupport/Details/ReplayForm'
import ReviewBox from '../../../../../../components/AdminPanel/Users/UserSupport/Details/ReviewBox'
import InternalNotes from '../../../../../../components/AdminPanel/Users/UserSupport/Details/InternalNotes'
import { getUserSupportDetails } from '../api'
import history from '../../../../../../utils/history'
import Loading from '../../../../../../components/Common/Loading'
const StyledBox = styled(Box)`
  && {
    background: #313334;
    border: 1px solid #4D4A4A;
    border-radius: 10px;
    padding-bottom: 55px;
  }
`
const StyledHead = styled(Box)`
   && {
      font-size: 12px;
      line-height: 22px;
      color: #fff;
      padding: 20px 25px;
      font-weight: 500;
      border-bottom: 1px solid #4D4A4A;
   }
`
const UserInfoBody = styled(Box)`
  padding: 18px 25px;
  && {
    color: #fff;
  }
`

const UserSupportDetails = ({match}) => {

  const [support, setSupport] = useState({})
  const [loading, setLoading] = useState(false)
  const supportId = match.params.id

  const getConversations = () => {
    setLoading(true)
    getUserSupportDetails(supportId)
      .then(res => {
        setSupport(res.data)
      }).catch((e) => {
        if (e.response.data.error) {
          history.push('/admin-panel/users/support')
        }
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    getConversations()
  }, [supportId])

  if (loading) return <Loading pageLoading transparent size={60}/>
  if(support && support.id) {
    return (
      <>
        <Container>
          <Header/>
          <Grid container spacing={2}>
            <Grid item md={8}>
              <StyledBox>
                <StyledHead>
                  Thread
                </StyledHead>
                <UserInfoBody>
                  <Conversations support={support}/>
                </UserInfoBody>
                <ReplayForm/>
              </StyledBox>
            </Grid>
            <Grid item md={4}>
              <Box ml={3}>
                <InternalNotes note={support.internalNotes}/>
                <ReviewBox/>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </>
    )
  }
  return (<></>)
}
UserSupportDetails.propTypes = {
  match: object,
}
export default injectIntl(UserSupportDetails)
