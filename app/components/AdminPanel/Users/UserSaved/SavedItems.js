import React, { useEffect, useState } from 'react'
import { Box, Grid } from '@material-ui/core'
import styled from 'styled-components'
import { func, number, string } from 'prop-types'
import Pagination from 'components/Common/Pagination'
// api
import { getUserSavedItems } from './api'
import Loading from '../../../Common/Loading'

const StyledBox = styled(Box)`
  && {
      background: #313334;
      border: 1px solid #4D4A4A;
      border-radius: 10px;
      height: 257px;
      position: relative;
  }
`
const StyledContent = styled(Box)`
  && {
    position: absolute;
    right: 24px;
    left: 24px;
    bottom: 24px;
    
    h4{
      color: white;
      font-size: 14px;
      font-weight: 500;
    }
  }
`
const SavedItems = ({ userId, searchText, perPage, onPageChange }) => {

  const [items, setItems] = useState({
    data: [],
    total: 0,
  })
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)

  const getUserSaved = () => {
    setLoading(true)
    getUserSavedItems(userId, {
      page,
      perPage,
      searchText
    })
      .then(res => {
        setItems({
          data: res.data.data,
          total: res.data.total,
        })
      })
      .finally(() => setLoading(false))
  }
  useEffect(() => {
    getUserSaved()
    onPageChange(page)
  }, [page, searchText])


  if (loading) return <Loading pageLoading transparent size={60}/>

  if (items && items.data.length > 0) {
    return (
      <>
        <Grid container style={{ marginTop: 30 }} spacing={3}>
          {
            items.data.map(item => (
              <Grid item md={3} key={item.id}>
                <StyledBox>
                  <StyledContent>
                    <h4>{item.name}</h4>
                  </StyledContent>
                </StyledBox>
              </Grid>
            ))
          }
        </Grid>
        <Box mt={5}>
          <Pagination
            totalCount={items.total}
            onPageChange={newPage => setPage(newPage)}
            perPage={perPage}
            currentPage={page}
          />
        </Box>
      </>
    )
  }

  return (<></>)
}
SavedItems.propTypes = {
  userId: string,
  searchText: string,
  onPageChange: func,
  perPage: number
}
export default SavedItems
