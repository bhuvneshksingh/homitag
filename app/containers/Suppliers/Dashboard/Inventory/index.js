import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { object } from 'prop-types'
import styled from 'styled-components'
import { IconButton, Button } from '@material-ui/core'
import { injectIntl } from 'react-intl'

import { PageHeader } from 'components/Suppliers/Dashboard/Page'
import Dropdown from 'components/Suppliers/Dashboard/UserInventory/Dropdown'
import SearchBox from 'components/Suppliers/Dashboard/UserInventory/SearchBox'
import ArrangementIcon from 'assets/images/icons/arrangement.png'
import TimerIcon from 'assets/images/icons/timer.png'
import { toast, ToastContainer } from 'react-toastify';
import Icon from 'components/Common/Icon'
import Filters from 'components/Suppliers/Dashboard/UserInventory/Filters'
import List from './List'
import messages from './messages'
import ActionModal from './ActionModal'
import Routes from '../../Router/Routes.json'
import 'react-toastify/dist/ReactToastify.css'

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

const TopSection = styled.div`
  display: flex;
  min-width: 1050px;
  && {
    margin-bottom: 30px;
  }
`
const ActionsContainer = styled.div`
  display: flex;
  min-width: 300px;
`
const StyledIconButton = styled(IconButton)`
  width: 60px;
  height: 58px;
  align-items: center;
  justify-content: center;
  && {
    background-color: ${({ theme }) => theme.colors.homiPrimary};
    border-radius: 10px;
    margin: 0 10px 0 0;
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
const StyledLink= styled(Link)`
  margin: 0 0 0 10px;
`
const StyledImg = styled.img`
  width: 20px;
  height: 18px;
`

const Inventory = ({ intl }) => {
  const [selectedItems, setSelectedItems] = useState([])
  const [bActionMenuAnchorEl, setBActionMenuAnchorEl] = useState(null)
  const [actionPrompt, setActionPrompt] = useState('')
  const [searchText, setSearchText] = useState('')
  const [filtersModal, showFiltersModal] = useState(false)

  const notify = () => toast.error("ERROR: Value must be more than 0")
  const success = () => toast.success('SUCCESS: Post successfull edited!')

  const [sortAndFilter, setSortAndFilter] = useState({
    sort: 'top_sellers',
    status: '',
    boost: ''
  })
  const handleFilters = values => {
    setSortAndFilter(currentSortAndFilter => ({...currentSortAndFilter, ...values}))
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

  function getBulkActionOptions(items = []) {
    if(items.every(i => i.status === 'Active')) {
      return [
        { value: 'boost', label: intl.formatMessage(messages.boostListing) },
        {
          value: 'deactivate',
          label: intl.formatMessage(messages.deactivateListings),
        },
        {
          value: 'delete',
          label: intl.formatMessage(messages.deleteListings),
        }
      ]
    }
    if(items.every(i => i.status === 'Inactive')) {
      return [
        {
          value: 'archive',
          label: intl.formatMessage(messages.archiveListings),
        },
        {
          value: 'activate',
          label: intl.formatMessage(messages.activateListings),
        },
        {
          value: 'delete',
          label: intl.formatMessage(messages.deleteListings),
        }
      ]
    }
    if(items.every(i => i.status === 'Blocked')) {
      return [
        {
          value: 'archive',
          label: intl.formatMessage(messages.archiveListings),
        },
        {
          value: 'delete',
          label: intl.formatMessage(messages.deleteListings),
        }
      ]
    }
    if(items.every(i => i.status === 'Soldout')) {
      return [
        {
          value: 'delete',
          label: intl.formatMessage(messages.deleteListings),
        }, {
          value: 'help',
          label: intl.formatMessage(messages.help)
        }
      ]
    }
    if(items.every(i => i.status === 'Draft')) {
      return [
        {
          value: 'delete',
          label: intl.formatMessage(messages.deleteListings),
        }, {
          value: 'help',
          label: intl.formatMessage(messages.help)
        }
      ]
    }

    return [{
      value: 'delete',
      label: intl.formatMessage(messages.deleteListings),
    }]
  }

  return (
    <>
      <PageHeader pageTitle="Inventory" />
      <ToastContainer
        position="bottom-right"
        pauseOnHover
        autoClose={3000}
        hideProgressBar
      />
      <TopSection container spacing={1}>
        <div style={{ width: '800px' }}>
          <SearchBox onChange={value => setSearchText(value)} />
        </div>
        <ActionsContainer>
          <StyledLink to={`${Routes.Suppliers}/inventory/archived`}>
            <StyledIconButton>
              <StyledImg src={TimerIcon} />
            </StyledIconButton>
          </StyledLink>
          <StyledIconButton onClick={() => showFiltersModal(true)}>
            <StyledImg src={ArrangementIcon} />
          </StyledIconButton>
          <StyledActionButton
            onClick={e => setBActionMenuAnchorEl(e.currentTarget)}
            disabled={selectedItems.length === 0}
          >
            {intl.formatMessage(messages.bulkAction)}
            {bActionMenuAnchorEl === null ? <ArrowDown /> : <ArrowUp />}
          </StyledActionButton>
        </ActionsContainer>
      </TopSection>
      <List
        onNotify={() => notify()}
        onSuccess={() => success()}
        selectedItems={selectedItems}
        setSelectedItems={items => setSelectedItems(items)}
        searchText={searchText}
        sortAndFilter={sortAndFilter}
        onHeaderItemClick={handleFilters}
      />
      <Dropdown
        primary
        anchorEl={bActionMenuAnchorEl}
        onClose={() => setBActionMenuAnchorEl(null)}
        items={getBulkActionOptions(selectedItems)}
        onItemClick={value => setActionPrompt(value)}
      />
      <ActionModal
        isOpen={!!actionPrompt}
        onClose={handleClose}
        action={actionPrompt}
        isBulk={selectedItems.length === 0}
        selectedItems={selectedItems && selectedItems.map(i => i.id)} // here it only needs an array of ids
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

Inventory.propTypes = {
  intl: object,
}

export default injectIntl(Inventory)
