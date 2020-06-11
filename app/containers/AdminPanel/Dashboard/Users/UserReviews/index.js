import React, { useState, useEffect } from 'react'
import { Grid, Container, Box } from '@material-ui/core'
import { object } from 'prop-types'
import styled from 'styled-components'

import { StyledStars } from '../../../../../components/AdminPanel/Users/UserDetails/styles'
// get user details api
import { getUserDetails } from '../api'
// page header component
import Header from '../../../../../components/AdminPanel/Users/UserReviews/Header'
import history from '../../../../../utils/history'
import Loading from '../../../../../components/Common/Loading'
// user reviews component
import Reviews from '../../../../../components/AdminPanel/Users/UserReviews/Reviews'
// ratings
import Stars from '../../../../../components/Common/Stars'
// tab filter
import TabFilter from '../../../../../components/AdminPanel/Users/UserReviews/TabFilter'
// search
import SearchBox from '../../../../../components/AdminPanel/Users/SearchBox'

const StyledReviewText = styled.h4`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
`
const UserReviews = ({ match }) => {
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(false)
  // const [searchText, setSearchText] = useState('')

  // filter options
  const [filters, setFilters] = useState({
    searchText: '',
    rating: '',
    direction: '',
  })

  const handleSearch = (searchText) => {
    setFilters({
      searchText
    })
  }
  const handlePositive = () => {
    setFilters({
      rating: '3',
      direction: 'above',
      searchText: '',
    })
  }
  const handleNegative = () => {
    setFilters({
      rating: '3',
      direction: 'below',
      searchText: '',
    })
  }
  const handleAllReviews = () => {
    setFilters({
      searchText: '',
      rating: '',
      direction: ''
    })
  }

  const userId = match.params.id

  const getUser = () => {
    setLoading(true)
    getUserDetails(userId)
      .then(res => {
        setUser(res.data)
      }).catch((e) => {
        if (e.response.data.error) {
          history.push('/admin-panel/users/accounts')
        }
      })
      .finally(() => setLoading(false))
  }
  useEffect(() => {
    getUser()
  }, [])
  if (loading) return <Loading pageLoading transparent size={60}/>
  if (user && user.id) {
    return (
      <>
        <Container>
          <Header user={user}/>
          <Box mb={4}>
            <Grid container spacing={3} alignItems="center">
              <Grid item md={8}>
                <SearchBox placeholder="Search by user`s name reviews ..." onChange={value => handleSearch(value)}/>
              </Grid>
              <Grid item md={4}>
                <Box display="flex" alignItems="center">
                  <StyledStars ml={3}>
                    <Stars initialCount={parseInt(user.rating, 10)}/>
                  </StyledStars>
                  <Box ml={2}>
                    <StyledReviewText>{user.reviews} Reviews</StyledReviewText>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box mt={2} mb={3}>
            <TabFilter
              filters={filters}
              onPositive={() => handlePositive()}
              onNegative={() => handleNegative()}
              onAllReviews={() => handleAllReviews()}/>
          </Box>
          <Reviews user={user.id} filters={filters}/>
        </Container>
      </>
    )
  }
  return (<></>)
}

UserReviews.propTypes = {
  match: object,
}
export default UserReviews
