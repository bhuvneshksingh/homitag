import React, { useState } from 'react';
import { object } from 'prop-types'
import styled from 'styled-components'
import { Grid, Button } from '@material-ui/core'
import { injectIntl } from 'react-intl'

import { PageHeader } from 'components/Suppliers/Dashboard/Page'
import Dropdown from 'components/Suppliers/Dashboard/UserInventory/Dropdown'
import SearchBox from 'components/Suppliers/Dashboard/UserInventory/SearchBox'
import Icon from 'components/Common/Icon'
import Filters from 'components/Suppliers/Dashboard/UserInventory/Filters'
import List from './List'
import messages from './messages'
import ActionModal from './ActionModal'
import ArrowBackButton from '../../../../components/Common/ArrowBackButton'

const ArrowIcon = styled(Icon).attrs(props => ({
  color: props.theme.colors.homiWhite,
  width: 6,
  height: 12,
}))``

const ArrowDown = () => (
  <div style={{ transform: 'rotate(90deg)', marginLeft: '10px' }}>
    <ArrowIcon icon="arrow" />
  </div>
)
const ArrowUp = () => (
  <div style={{ transform: 'rotate(-90deg)', marginLeft: '10px' }}>
    <ArrowIcon icon="arrow" />
  </div>
)

const TopSection = styled(Grid).attrs({
  container: true,
  spacing: 1,
})`
  && {
    margin-bottom: 30px;
  }
`

const StyledActionButton = styled(Button)`
  width: 150px;
  height: 60px;
  && {
    background: ${({ theme }) => theme.colors.homiCompOne};
    border-radius: 10px;
    color: ${({ theme }) => theme.colors.homiWhite};
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
    :disabled {
      background: ${({ theme }) => theme.colors.text};
      color: ${({ theme }) => theme.colors.homiWhite};
    }
  }
`

const ArchivedInventory = ({ intl }) => {
  const [selectedItems, setSelectedItems] = useState([])
  const [bActionMenuAnchorEl, setBActionMenuAnchorEl] = useState(false)
  const [actionPrompt, setActionPrompt] = useState('')
  const [searchText, setSearchText] = useState('')
  const [filtersModal, showFiltersModal] = useState(false)

  const [sortAndFilter, setSortAndFilter] = useState({
    sort: 'top_sellers',
    status: '',
    boost: ''
  })
  const handleFilters = values => {
    setSortAndFilter(values)
    showFiltersModal(false)
  }

  const handleClose = () => {
    setActionPrompt('')
    setSortAndFilter({
      sort: 'top_sellers',
      status: '',
      boost: '',
    })
  }

  return (
    <>
      <ArrowBackButton title='Inventory' backRoute='/suppliers/inventory'/>
      <PageHeader pageTitle='Archived Inventory' />
      <TopSection container spacing={1}>
        <Grid item sm={10}>
          <SearchBox onChange={value => setSearchText(value)}/>
        </Grid>
        <Grid container item sm={2} justify="space-between">
          <StyledActionButton
            isArchived
            onClick={e => setBActionMenuAnchorEl(e.currentTarget)}
            disabled={selectedItems.length === 0}
          >
            {intl.formatMessage(messages.bulkAction)}
            {bActionMenuAnchorEl === null ? <ArrowDown /> : <ArrowUp/> }
          </StyledActionButton>
        </Grid>
      </TopSection>
      <List
        isArchived
        selectedItems={selectedItems}
        setSelectedItems={items => setSelectedItems(items)}
        searchText={searchText}
        sortAndFilter={sortAndFilter}
      />
      <Dropdown
        primary
        anchorEl={bActionMenuAnchorEl}
        onClose={() => setBActionMenuAnchorEl(null)}
        items={[
          {
            value: 'unarchive',
            label: intl.formatMessage(messages.unarchiveListings),
          },
          {
            value: 'delete',
            label: intl.formatMessage(messages.deleteListings),
          },
          {
            value: 'help',
            label: intl.formatMessage(messages.help),
          }
        ]}
        onItemClick={value => setActionPrompt(value)}
      />
      <ActionModal
        isOpen={!!actionPrompt}
        onClose={handleClose}
        action={actionPrompt}
        isBulk={selectedItems.length === 0}
        selectedItems={selectedItems}
        removeSelectedItems={() => setSelectedItems([])}
      />
      <Filters
        isOpen={filtersModal}
        onClose={() => showFiltersModal(false)}
        onSubmit={handleFilters}
        sortAndFilter={sortAndFilter}
      />
    </>
  )
}

ArchivedInventory.propTypes = {
  intl: object,
}

export default injectIntl(ArchivedInventory)
