import React, { useState, useEffect } from 'react'
import { object , string, bool} from 'prop-types'
import { injectIntl } from 'react-intl'
import styled from 'styled-components'
import { Grid, Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Loading from 'components/Common/Loading'
import Pagination from 'components/Common/Pagination'
import { getOrdersList } from './api'
import List from './List'

const StyledExpansionPanel = styled(ExpansionPanel)`
&& {
  background-color: transparent;
  box-shadow: none;
  color: black
 }
`

const perPage = 5

const ExpansionList = ({searchText, wasShipped, sortAndFilter, defaultExpanded}) => {

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({
    list: [],
    total: 0,
  })
  const [page, setPage] = useState(1)  
  const getList = () => {
    setLoading(true)
    getOrdersList({ wasShipped,  page, perPage, searchText, sort: sortAndFilter.sort, status: sortAndFilter.status  })
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
    getList()
  }, [searchText, page, sortAndFilter ])
  
  let ExpansionPanelShow = ''

  if (data.total > 0 ) { 
    ExpansionPanelShow = (
      <StyledExpansionPanel defaultExpanded={defaultExpanded}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{ wasShipped ? 'SHIPPED' : 'NOT SHIPPED' } ( {data.total} )</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid item md={12}>
            <List perPage={perPage} data={data} page={page} shipped={wasShipped}/>
            <Pagination
              totalCount={data.total}
              onPageChange={newPage => setPage(newPage)}
              perPage={perPage}
              currentPage={page}
            />
          </Grid>
        </ExpansionPanelDetails>
      </StyledExpansionPanel>
    )
  }
 
  
  if (loading) return <Loading pageLoading transparent size={60} />
  return (<>
        {ExpansionPanelShow}
      </>)
}

ExpansionList.propTypes = {
  searchText: string,
  sortAndFilter: object,
  wasShipped: bool,
  defaultExpanded: bool
}

ExpansionList.defaultProps = {
  searchText: '',
  wasShipped: false,
  sortAndFilter: {
    sort: 'createdAt-desc',
    status: null
  }
}
export default injectIntl(ExpansionList)
