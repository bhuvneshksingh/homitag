import React, { useEffect, useState } from 'react'
import { string } from 'prop-types'
import { Box, CircularProgress } from '@material-ui/core'
import { format, parseISO } from 'date-fns'
// api
import { getUserReviews } from '../../../../containers/AdminPanel/Dashboard/Users/api'
// star rating
import Stars from '../../../Common/Stars'
// styles
import {
  ReviewHeading,
  StyledLinkButton,
  ReviewBox,
  ReviewHead,
  ReviewBody,
  ReviewUser,
  ImgWrapper,
  ReviewFooter,
  StyledRouteLink,
  StyledP
} from './styles'

const perPage = 5

const UserReviews = ({ user }) => {

  const [reviews, setReviews] = useState({
    list: [],
  })
  const [loading, setLoading] = useState(false)
  const [page] = useState(1)

  const getReviews = () => {
    setLoading(true)
    getUserReviews(user, {perPage, page})
      .then(res =>
        setReviews({
          list: res.data.data,
        })
      )
      .finally(() => setLoading(false))
  }
  useEffect(() => {
    getReviews()
  }, [])

  return (
    <div style={{ width: 270 }}>

      <ReviewHeading display="flex">
        <Box flexGrow={1}>
          <h2>Reviews</h2>
        </Box>
        {!loading && reviews.list.length > 0 &&
        <Box>
          <StyledRouteLink to={`/admin-panel/users/accounts/${user}/reviews`}>
            View All
          </StyledRouteLink>
        </Box>
        }
      </ReviewHeading>

      {
        reviews.list.map(review => (
          <ReviewBox key={review.id}>
            <ReviewHead display="flex" justifyContent="space-between" alignItems="center">
              <Box>
                <h3>{review.reviewData.experience}</h3>
              </Box>
              <Box display="flex" alignItems="center">
                <Box style={{ height: 13 }}>
                  <Stars initialCount={parseInt(review.reviewData.rating, 10)}/>
                </Box>
              </Box>
            </ReviewHead>
            <ReviewBody>
              <Box mb={3}>
                <p>{review.reviewData.comment}</p>
              </Box>
              <ReviewUser display="flex" alignItems="center">
                <Box mr={1}>
                  <ImgWrapper>
                    <img src={review.profilepictureurl} alt={review.firstName}/>
                  </ImgWrapper>
                </Box>
                <Box>
                  <h6>{`${review.firstName  } ${  review.lastName}`}</h6>
                  <StyledLinkButton to={`/admin-panel/users/accounts/${review.reviewData.reviewingUserId}`}>
                    { review.prettyUserId }
                  </StyledLinkButton>
                </Box>
              </ReviewUser>
            </ReviewBody>
            <ReviewFooter>
              <p>
                {format(parseISO(review.createdAt), 'MM / dd / yyyy')}
              </p>
            </ReviewFooter>
          </ReviewBox>
        ))}
      {loading &&
      <CircularProgress size={16}/>
      }
      { reviews.list.length === 0 && !loading &&
        <StyledP>The user have not reviews yet.</StyledP>
      }
    </div>
  )
}
UserReviews.propTypes = {
  user: string,
}
export default UserReviews
