import React, { useState } from 'react'
import styled from 'styled-components'
import { injectIntl } from 'react-intl'
import { Grid } from '@material-ui/core'
import { PageHeader } from 'components/Suppliers/Dashboard/Page'
import Filters from 'components/Suppliers/Dashboard/Orders/Filters'
import SearchBox from 'components/Suppliers/Dashboard/Orders/SearchBox'
import ArrowBackButton from 'components/Common/ArrowBackButton'
import TabSection from '../TabSection'
import ActionModal from '../ActionModal'
import ArchivedList from './ArchivedList'


const TopSection = styled(Grid).attrs({
  container: true,
  spacing: 1,
})`
  && {
    margin-bottom: 30px;
  }
  
`
const ListSection = styled(Grid).attrs({
  container: true,
  spacing: 1,
})`
  && {
    margin-bottom: 30px;
  }
`



const Orders = () => {

  const [actionPrompt, setActionPrompt] = useState('')
  const [searchText, setSearchText] = useState('')
  const [filtersModal, showFiltersModal] = useState(false)
  const [sortAndFilter, setSortAndFilter] = useState({
    sort: 'createdAt-desc',
    status: null
  })
  const handleFilters = values => {
    setSortAndFilter(values)
    showFiltersModal(false)
  }
  return (
    <>
      <ArrowBackButton title='Orders' backRoute='/suppliers/orders/'/>
      <PageHeader pageTitle="Archived Orders" />
      <TabSection/>
      <TopSection container spacing={1} wrap="nowrap">
        <Grid item xs={12}>
          <SearchBox onChange={value => setSearchText(value)} >Search Archived ...</SearchBox>
        </Grid>
      </TopSection>
      <ListSection>
        <Grid item xs={12}>
          <ArchivedList
            searchText={searchText}
            sortAndFilter={sortAndFilter}
            isArchived
            defaultExpanded
            type="Archived"
            showError
          />
        </Grid>
      </ListSection>
      <ActionModal
        isOpen={!!actionPrompt}
        onClose={() => setActionPrompt('')}
        action={actionPrompt}
      />
      <Filters
        isOpen={filtersModal}
        onClose={() => showFiltersModal(false)}
        onSubmit={handleFilters}
        onClear={handleFilters}
        sortAndFilter={sortAndFilter}
      />
      

    </>
  )
}


export default injectIntl(Orders)
