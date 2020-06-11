import React from 'react'
import { Grid } from '@material-ui/core'
import MoreIcon from 'assets/images/icons/more-purple.png'
import styled from 'styled-components'

import { StyledHeading, StyledMore, TopSection } from '../../UserDetails/styles'
import ArrowBackButton from '../../../../Common/ArrowBackButton'

const MoreGrid = styled(Grid)`
  && {
    text-align: right;
  }
`
const Header = () => (
  <TopSection>
    <Grid item md={2}>
      <ArrowBackButton title='Support' backRoute='/admin-panel/users/support'/>
    </Grid>
    <Grid item md={8}>
      <StyledHeading>
        Thread With User Name
      </StyledHeading>
    </Grid>
    <MoreGrid item md={2}>
      <StyledMore src={MoreIcon} />
    </MoreGrid>
  </TopSection>
)

export default Header;
