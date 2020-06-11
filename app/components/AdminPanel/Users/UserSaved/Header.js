import React from 'react'
import { Grid, Box } from '@material-ui/core'
import { object } from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { TopSection } from '../UserDetails/styles'
import ArrowBackButton from '../../../Common/ArrowBackButton'

const StyledLinkButton = styled(Link)`
    text-decoration: none;
    border: 1px solid ${({ theme }) => theme.colors.homiPrimary};
    background: #fff;
    color: ${({ theme }) => theme.colors.homiPrimary};
    border-radius: 60px;
    font-weight: 500;
    width: 100%;
    padding: 13px 20px;
    &:hover {
      background: ${({ theme }) => theme.colors.homiPrimary};
      color: white;
    }
`


const Header = ({ user }) => {
  const name = `${user.firstName} ${user.lastName}\`s Saved`
  return (
    <TopSection>
      <Grid item md={8}>
        <ArrowBackButton title={name} backRoute={`/admin-panel/users/accounts/${user.id}`}/>
      </Grid>
      <Grid item md={4}>
        <Box display="flex" justifyContent="flex-end">
          <Box mr={1}>
            <StyledLinkButton
              to={`/admin-panel/users/accounts/${user.id}/saved`}
              style={{ background: '#7471FF', color: '#fff' }}>
              Items ( 0 )
            </StyledLinkButton>
          </Box>
          <Box>
            <StyledLinkButton to={`/admin-panel/users/accounts/${user.id}/albums`}>
              Albums ( 0 )
            </StyledLinkButton>
          </Box>
        </Box>
      </Grid>
    </TopSection>
  )
}
Header.propTypes = {
  user: object,
}
export default Header
