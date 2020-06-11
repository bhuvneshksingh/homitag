import React, { useEffect, useState } from 'react'
import { Grid } from '@material-ui/core'
import { string } from 'prop-types'
import styled from 'styled-components'

import ArrowBackButton from '../../../Common/ArrowBackButton'
import { getUserDetails } from '../../../../containers/AdminPanel/Dashboard/Users/api'
// eslint-disable-next-line no-unused-vars
import history from '../../../../utils/history'
const TopSection = styled(Grid).attrs({
  container: true,
  spacing: 1,
})`
  && {
    margin-bottom: 24px;
  }
`
const StyledHeading = styled.h1`
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  font-weight: bold;
  color: #313334;
`
const UserHeader = ({ userId }) => {
  const [user, setUser] = useState({})
  const getUser = () => {
    getUserDetails(userId)
      .then(res => {
        setUser(res.data)
      })
  }
  useEffect(() => {
    getUser()
  }, [userId])
  return (
    <>
      <TopSection>
        <Grid item md={2}>
          <ArrowBackButton
            title="User Accounts"
            backRoute={`/admin-panel/users/accounts/${userId}`}
          />
        </Grid>
        <Grid item md={8}>
          <StyledHeading>
            {user.firstName} {user.lastName}&apos;s Customer Service History
          </StyledHeading>
        </Grid>
      </TopSection>
    </>
  )
}
UserHeader.propTypes = {
  userId: string
}
export default UserHeader
