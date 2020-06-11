import React, { useState } from 'react'
import { object } from 'prop-types'
import styled from 'styled-components'
import { Grid, Container } from '@material-ui/core'
import { injectIntl } from 'react-intl'
// layouts
import { PageHeader } from '../../../../components/AdminPanel/Dashboard/Page'
import SearchBox from '../../../../components/AdminPanel/Users/SearchBox'
import SelectColumns from '../../../../components/AdminPanel/Users/SelectColumns'
import Filters from '../../../../components/AdminPanel/Users/Filters'
import ActionButton from '../../../../components/AdminPanel/Users/ActionButton'
import DeactivateActions from '../../../../components/AdminPanel/Users/Actions/DeactivateActions'
import Alert from '../../../../components/Common/Alert'
import TopButtons from '../../../../components/AdminPanel/Users/TopButtons'
// API
import { changeUserStatus } from './api'
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
    min-width: 1200px;
  }
`
const StyledContainer = styled(Container)`
  && {
    min-height: 1000px;
  }
`
const UserAccounts = ({ intl }) => {
  // search
  const [searchText, setSearchText] = useState('')
  const defaultColumns = localStorage.getItem('userAccountColumns')
  // filter options
  const [filters, setFilters] = useState({
    createdAtGreater: '',
    createdAtLess: '',
    userKind: '',
    status: '',
    ratingAtGreater: '',
    ratingAtLess: '',
    sortable: {},
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
    if (filters.userKind === value) {
      setFilters({
        userKind: null,
      })
    } else {
      setFilters({
        userKind: value,
      })
    }
  }
  // current page
  const [currentPage, setCurrentPage] = useState(1)
  // deactivate
  const [deactivate, setDeactivate] = useState(null)
  const [deactivating, setDeactivating] = useState([])
  const [actionLoading, setActionLoading] = useState('')
  const [refreshList, setRefreshList] = useState(false)
  const [alert, setAlert] = useState([])
  const [undoData, setUndoData] = useState([])
  // checkbox control
  const deactivateToggle = (selected, status) => () => {
    const currentIndex = deactivating.findIndex(p => p.id === selected)
    const newChecked = [...deactivating]
    if (currentIndex === -1) {
      newChecked.push({ id: selected, status })
    } else {
      newChecked.splice(currentIndex, 1)
    }
    setDeactivating(newChecked)
  }
  // submit deactivate
  const submitDeactivate = () => {
    userStatusChange(true, deactivating, deactivate, false)
  }
  // undo
  const undoAction = () => {
    userStatusChange(false, undoData, '', true)
  }
  const userStatusChange = (canUndo, statusArray, status, isUndo) => {
    setAlert([])
    setActionLoading(status)
    const action = statusArray.map(user => (
      changeUserStatus(user.id, status || user.status).then(res => res)
    ))
    Promise.all(action).then(() => {
      // if can undo the process
      if (canUndo) {
        // store deactivated array for 10sec undoData
        setUndoData(deactivating)
      }
      // if undo
      if (isUndo) {
        // hide alert
        setAlert([])
        // clear undo data
        setUndoData([])
      }
      // show the alert with message
      showAlert(`you ${deactivate === 'delete' ? 'removed' : 'deactivated'} ${deactivating.length} users`)
      // hide alert after 10sc
      setTimeout(() => {
        setAlert([])
        setUndoData([])
      }, 10000)
      // set loading false
      setActionLoading('')
      // reset Deactivating state
      setDeactivating([])
      // refresh list
      setRefreshList(!refreshList)
    })
  }
  const showAlert = (message) => {
    setAlert({
      type: 'notice',
      message,
    })
  }
  const resetDeactivate = () => {
    setDeactivate(null)
    setDeactivating([])
  }
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
      localStorage.setItem('userAccountColumns', newUpdatedColumns)
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
      <StyledContainer>
        <StyledGrid>
          <PageHeader
            pageTitle={intl.formatMessage(messages.pageTitle)}
            rightSide={
              <TopButtons onClick={(filter) => handleTopFilter(filter)} userKind={filters.userKind}/>
            }/>
          <TopSection>
            <Grid item md={8}>
              <SearchBox onChange={value => setSearchText(value)}/>
            </Grid>
            {!deactivate &&
            <Grid container justify="space-between" item md={4}>
              <SelectColumns
                columns={tableColumns}
                activeColumns={activeColumns}
                onApply={(newColumns, isDefault) => setNewColumns(newColumns, isDefault)}/>
              <Filters
                onSubmit={handleFilters}
                filters={filters}
              />
              <ActionButton
                onDeactivate={() => setDeactivate('deactivated')}
                onDelete={() => setDeactivate('delete')}
                filters={filters}
                page={currentPage}
              />
            </Grid>
            }
            {deactivate &&
            <Grid container item md={4}>
              <DeactivateActions
                onDone={resetDeactivate}
                onDeactivate={submitDeactivate}
                actionMethod={deactivate}
                totalDeactivation={deactivating.length}
                isLoading={actionLoading}
              />
            </Grid>
            }
          </TopSection>
          {alert.message &&
          <Alert
            type={alert.type}
            message={alert.message}
            canUndo={deactivate === 'deactivated'}
            onUndoClick={() => undoAction()}/>
          }
          <List
            searchText={searchText}
            columns={activeColumns}
            filters={filters}
            deactivateAction={deactivate}
            deactivateToggle={(selected, status) => deactivateToggle(selected, status)}
            deactivateChecked={deactivating}
            refreshList={refreshList}
            changeInCurrentPage={(page) => setCurrentPage(page)}
            onSort={(sort) => handleSort(sort)}
          />
        </StyledGrid>
      </StyledContainer>
    </>
  )
}

UserAccounts.propTypes = {
  intl: object,
}

export default injectIntl(UserAccounts)
