import React, { useEffect, useRef, useState } from 'react'
import { string, object } from 'prop-types'
import { Box, Grid } from '@material-ui/core'
import { format, parseISO } from 'date-fns'
// pagination
import Pagination from '../../../Common/Pagination'
// api
import { getUserReviews } from '../../../../containers/AdminPanel/Dashboard/Users/api'
// more icon
import MoreIcon from '../../../../assets/images/icons/more-purple.png'
// star rating
import Stars from '../../../Common/Stars'
// styles
import {
  StyledMore,
  StyledLinkButton,
  ReviewBox,
  ReviewHead,
  ReviewBody,
  ReviewUser,
  ImgWrapper,
} from './styles'
import Loading from '../../../Common/Loading'

const perPage = 6

const Reviews = ({ user, filters }) => {

  const [reviews, setReviews] = useState({
    total: 1,
    list: [],
  })
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)

  // console.log(filters)

  const getReviews = () => {
    const searchText = filters.searchText || null
    const rating = parseInt(filters.rating, 10) || null
    const direction = filters.direction || null
    setLoading(true)
    getUserReviews(user, { perPage, page, searchText, rating, direction })
      .then(res =>
        setReviews({
          total: res.data.total,
          list: res.data.data,
        }),
      )
      .finally(() => setLoading(false))
  }
  useEffect(() => {
    if(prevFilterRef.current !== filters) {
      setPage(1)
    }
    getReviews()

  }, [filters, page])

  const prevFilterRef = useRef();
  useEffect(() => {
    prevFilterRef.current = filters;
  });

  if (loading) return <Loading pageLoading transparent size={60}/>
  return (
    <>
      <Grid container spacing={2} alignItems="stretch">
        {
          reviews.list.map(review => (
            <Grid item md={4} xs key={review.id}>
              <ReviewBox>
                <ReviewHead display="flex" justifyContent="space-between" alignItems="center">
                  <Box>
                    <h3>{review.reviewData.experience}</h3>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <Box style={{ height: 16 }}>
                      <Stars initialCount={parseInt(review.reviewData.rating, 10)}/>
                    </Box>
                    <Box ml={2}>
                      <StyledMore style={{ width: 26, height: 6 }} src={MoreIcon}/>
                    </Box>
                  </Box>
                </ReviewHead>
                <ReviewBody>
                  <Box>
                    <p>{review.reviewData.comment}</p>
                  </Box>
                </ReviewBody>
                <ReviewUser display="flex" alignItems="top" justifyContent="space-between">
                  <Box display="flex" alignItems="center">
                    <Box mr={2}>
                      <ImgWrapper>
                        <img src={review.profilepictureurl} alt={review.firstName}/>
                      </ImgWrapper>
                    </Box>
                    <Box>
                      <h6>{`${review.firstName} ${review.lastName}`}</h6>
                      <StyledLinkButton to={`/admin-panel/users/accounts/${review.reviewData.reviewingUserId}`}>
                        { review.prettyUserId }
                      </StyledLinkButton>
                    </Box>
                  </Box>
                  <Box>
                    <p>{format(parseISO(review.createdAt), 'MM / dd / yyyy')}</p>
                  </Box>
                </ReviewUser>
              </ReviewBox>
            </Grid>
          ))}
      </Grid>
      <Box display="flex" justifyContent="center" mt={3}>
        <Pagination
          totalCount={reviews.total}
          onPageChange={newPage => setPage(newPage)}
          perPage={perPage}
          currentPage={page}
        />
      </Box>
    </>
  )
}
Reviews.propTypes = {
  user: string,
  filters: object,
}
export default Reviews
