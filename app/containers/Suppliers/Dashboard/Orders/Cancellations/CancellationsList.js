import React, { useState, useEffect } from 'react'
import { object , string, bool} from 'prop-types'
import { injectIntl } from 'react-intl'
import { Grid } from '@material-ui/core'
import Loading from 'components/Common/Loading'
import Pagination from 'components/Common/Pagination'
import Cookies from 'universal-cookie'
import { getCancellationsList } from '../api'
import List from './List'
import { PageHeader } from '../../../../../components/Suppliers/Dashboard/Page'



const perPage = 5

const OrdersList = ({searchText, wasShipped, sortAndFilter, archived, showError}) => {

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({
    list: [],
    total: 0,
  })
  const [page, setPage] = useState(1)  
  const getList = () => {
    setLoading(true)
    const cookies = new Cookies()
    getCancellationsList({ wasShipped,  page, perPage, searchText, sort: sortAndFilter.sort, cancelStatus: sortAndFilter.status, sellerId: cookies.get('userId') })
      .then(res => {
        setData({
          list: res.data.data,
          total: res.data.total
        })
      }
      )
      .finally(() => setLoading(false))
  }
  useEffect(() => {
    setPage(1)
  }, [searchText,sortAndFilter ])
  useEffect(() => {
    getList()
  }, [searchText, page, sortAndFilter ])
  
  let ExpansionPanelShow = ''

  if (data.total > 0 ) { 
    ExpansionPanelShow = (
     
      <Grid item md={12}>
        <List perPage={perPage} data={data} page={page} shipped={wasShipped}  archived={archived} onClose={() => getList()} type="Cancellation"/>
        <Pagination
          totalCount={data.total}
          onPageChange={newPage => setPage(newPage)}
          perPage={perPage}
          currentPage={page}
        />
      </Grid>
    )
  }else if (showError) {
    ExpansionPanelShow = <PageHeader pageTitle="This filter has no results" />
  }
 
  
  if (loading) return <Loading pageLoading transparent size={60} />
  return (<>
        {ExpansionPanelShow}
      </>)
}

OrdersList.propTypes = {
  searchText: string,
  sortAndFilter: object,
  wasShipped: bool,
  archived: bool,
  showError: bool
}

OrdersList.defaultProps = {
  searchText: '',
  wasShipped: false,
  archived: false,
  showError: false,
  sortAndFilter: {
    sort: 'createdAt-desc',
    status: null
  }
}
export default injectIntl(OrdersList)
