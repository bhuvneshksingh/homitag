import React, { useState, useEffect } from 'react'
import { object , string, bool, func} from 'prop-types'
import { injectIntl } from 'react-intl'
import { Grid } from '@material-ui/core'
import Loading from 'components/Common/Loading'
import Pagination from 'components/Common/Pagination'
import Cookies from 'universal-cookie'
import { useLocationState } from 'react-router-use-location-state'
import { getOrdersList } from './api'
import List from './List'
import { PageHeader } from '../../../../components/Suppliers/Dashboard/Page'



const perPage = 5

const OrdersList = ({searchText, wasShipped, sortAndFilter, type, isArchived, showError, handleCount }) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({
    list: [],
    total: 0,
  })
  const [page, setPage] = useLocationState("page", 1)  

 
  const getList = () => {
    setLoading(true)
    const cookies = new Cookies()
    getOrdersList({ wasShipped,  page, perPage, searchText, sort: sortAndFilter.sort,  isArchived, status: sortAndFilter.status, sellerId: cookies.get('userId')  })
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
  
  const handleClose = () => {
    getList()
    handleCount()
  }

  

  let ExpansionPanelShow = ''

  if (data.total > 0 ) { 
    ExpansionPanelShow = (
      
      <Grid item md={12}>
        <List
          perPage={perPage} data={data} page={page} shipped={wasShipped}  type={type} isArchived={isArchived} 
          onClose={handleClose}/>
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
  type: string,
  isArchived: bool,
  showError: bool,
  handleCount: func
}

OrdersList.defaultProps = {
  searchText: '',
  type: 'Order',
  wasShipped: false,
  isArchived: false,
  showError: false,
  sortAndFilter: {
    sort: 'createdAt-desc',
    status: null
  }
}
export default injectIntl(OrdersList)
