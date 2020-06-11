import React, { useEffect, useState } from 'react'
import { Container, Grid } from '@material-ui/core'
import { object } from 'prop-types'
import Header from '../../../../../components/AdminPanel/Users/UserSaved/Header'
import { getUserDetails } from '../api'
import history from '../../../../../utils/history'
import Loading from '../../../../../components/Common/Loading'
import SearchBox from '../../../../../components/AdminPanel/Users/SearchBox'
import SavedItems from '../../../../../components/AdminPanel/Users/UserSaved/SavedItems'
import DownloadCSV from '../../../../../components/AdminPanel/Users/UserSaved/DownloadCSV'
// pagination
const perPage = 5

const UserSaved = ({ match }) => {
  // search
  // eslint-disable-next-line no-unused-vars
  const [searchText, setSearchText] = useState('')
  const [savedUser, setSavedUser] = useState({})
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const userId = match.params.id

  const getUser = () => {
    setLoading(true)
    getUserDetails(userId)
      .then(res => {
        setSavedUser(res.data)
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
  if (savedUser && savedUser.id) {
    return (
      <>
        <Container>
          <Header user={savedUser}/>
          <Grid container>
            <Grid item md={10}>
              <SearchBox
                onChange={value => setSearchText(value)}
                placeholder="Search by product name, seller name, product ID  ..."/>
            </Grid>
            <Grid item md={2}>
              <DownloadCSV userId={savedUser.id} searchText={searchText} page={currentPage} perPage={perPage}/>
            </Grid>
          </Grid>
          <SavedItems userId={savedUser.id} searchText={searchText} perPage={perPage} onPageChange={(page) => setCurrentPage(page)}/>
        </Container>
      </>
    )
  }
  return (<></>)
}
UserSaved.propTypes = {
  match: object,
}
export default UserSaved
