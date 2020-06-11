import React from 'react'
import { Grid } from '@material-ui/core'
import { object } from 'prop-types'

import { StyledHeading, TopSection } from '../UserDetails/styles'
import ArrowBackButton from '../../../Common/ArrowBackButton'

const Header = ({user}) => (
  <TopSection>
    <Grid item md={2}>
      <ArrowBackButton title='User Profile' backRoute={`/admin-panel/users/accounts/${user.id}`}/>
    </Grid>
    <Grid item md={8}>
      <StyledHeading>
        {user.firstName} {user.lastName}&#39;s - Reviews
      </StyledHeading>
    </Grid>
  </TopSection>
)

Header.propTypes = {
  user: object,
}
export default Header
