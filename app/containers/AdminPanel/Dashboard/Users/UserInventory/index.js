import React, { useState } from 'react'
import { object } from 'prop-types'
import styled from 'styled-components'
import { Grid, Container } from '@material-ui/core'
import { injectIntl } from 'react-intl'
import queryString from 'query-string'
import UserHeader from '../../../../../components/AdminPanel/Users/UserSupport/UserHeader'
// layouts
import { PageHeader } from '../../../../../components/AdminPanel/Dashboard/Page'
import SearchBox from '../../../../../components/AdminPanel/Users/SearchBox'
import SelectColumns from '../../../../../components/AdminPanel/Users/SelectColumns'
import Filters from '../../../../../components/AdminPanel/Users/UserSupport/Filters'
import TopButtons from '../../../../../components/AdminPanel/Users/UserSupport/TopButtons'
// API
// table list
import List from './List'
// Intl
import messages from './messages'
// table columns
import TableColumns from './TableColumns'
// styles
const TopSection = styled(Grid).attrs({
  container: true,
  spacing: 1,
})`
  && {
    margin-bottom: 24px;
  }
`
const StyledGrid = styled(Grid)`
  && {
    min-width: 1220px;
  }
`


const UserInventory = ({ intl, location }) => {
  // query string
  const qs = queryString.parse(location.search)
  // search
  const [searchText, setSearchText] = useState('')
  const defaultColumns = localStorage.getItem('userSupportColumns')
  // filter options
  const [filters, setFilters] = useState({
    createdAtGreater: '',
    createdAtLess: '',
    status: '',
    isSeller: '',
    isBuyer: '',
    isSupplier: '',
    isReseller:'',
    sortable: {},
    userId: qs.user || ''
  })
  // handle filter
  const handleFilters = values => {
    setFilters(values)
  }
  // handle sort
  const handleSort = sortable => {
    setFilters({
      ...filters,
      sortable,
    })
  }
  // handle user kind filters
  const handleTopFilter = value => {
    if (filters.status === value) {
      setFilters({
        status: null,
      })
    } else {
      setFilters({
        status: value,
      })
    }
  }
  // current page
  // eslint-disable-next-line no-unused-vars
  const [currentPage, setCurrentPage] = useState(1)

  // active columns
  const [activeColumns, setActiveColumns] = useState(
    defaultColumns === null ?
      TableColumns.filter(column => column.show === true) :
      TableColumns.filter(column =>
        defaultColumns.includes(column.id),
      ).sort((a, b) =>
        defaultColumns.indexOf(a.id) < defaultColumns.indexOf(b.id) ? -1 : 1,
      ),
  )
  // total table columns
  const [tableColumns] = useState(TableColumns)
  // set new columns
  const setNewColumns = (newColumns, isDefault) => {
    const newUpdatedColumns = [...newColumns]
    newUpdatedColumns.push('more_button')
    if(isDefault) {
      localStorage.setItem('userSupportColumns', newUpdatedColumns)
    }
    setActiveColumns(
      TableColumns.filter(column =>
        newUpdatedColumns.includes(column.id),
      ).sort((a, b) =>
        newUpdatedColumns.indexOf(a.id) < newUpdatedColumns.indexOf(b.id) ? -1 : 1,
      ),
    )
  }

  return (
    <>
      <Container>
        <StyledGrid>
          {!qs.user &&
          <PageHeader
            pageTitle={intl.formatMessage(messages.pageTitle)}
            rightSide={
              <TopButtons onClick={(filter) => handleTopFilter(filter)} kind={filters.status}/>
            }/>
          }
          {qs.user &&
          <UserHeader userId={qs.user} />
          }
          <TopSection>
            <Grid item md={9}>
              <SearchBox onChange={value => setSearchText(value)} placeholder="Search by user name, order id, employee name..."/>
            </Grid>
            <Grid container justify="space-between" item md={3}>
              <SelectColumns
                columns={tableColumns}
                activeColumns={activeColumns}
                onApply={(newColumns, isDefault) => setNewColumns(newColumns, isDefault)}/>
              <Filters
                onSubmit={handleFilters}
                filters={filters}
              />
            </Grid>
          </TopSection>

          <List
            searchText={searchText}
            columns={activeColumns}
            filters={filters}
            changeInCurrentPage={(page) => setCurrentPage(page)}
            onSort={(sort) => handleSort(sort)}
          />
        </StyledGrid>
      </Container>
    </>
  )
}

UserInventory.propTypes = {
  intl: object,
  location: object
}

export default injectIntl(UserInventory)
