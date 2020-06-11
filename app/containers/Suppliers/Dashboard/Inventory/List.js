import React, { useState, useEffect } from 'react'
import { array, func, string, object, bool } from 'prop-types'
import { injectIntl } from 'react-intl'

import Loading from 'components/Common/Loading'
import Pagination from 'components/Common/Pagination'
import Cookies from 'universal-cookie'
import sortController from './Controllers/sortController'
import ListItem from './ListItem'
import { getInventoryList } from './api'
import ListHeader from './ListHeader'
import { PageHeader } from '../../../../components/Suppliers/Dashboard/Page'

const perPage = 5

const List = ({
  onHeaderItemClick,
  selectedItems,
  setSelectedItems,
  searchText,
  sortAndFilter,
  isArchived,
  onNotify,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({
    list: [],
    total: 0,
  })
  const [page, setPage] = useState(1)

  const resetPage = () => {
    setPage(1)
  }
  const getList = () => {
    const sort =
      sortController.sort(sortAndFilter) !== ''
        ? sortController.sort(sortAndFilter)
        : null
    const isBoosted =
      sortController.isBoosted(sortAndFilter) !== ''
        ? sortController.isBoosted(sortAndFilter)
        : null
    const search = searchText !== '' ? searchText : null
    const postStatus = sortAndFilter.status !== '' ? sortAndFilter.status : null

    const cookies = new Cookies()
    const sellerId = cookies.get('userId')

    setLoading(true)
    const query = isArchived
      ? { page, perPage, sellerId, archived: isArchived }
      : {
        page,
        perPage,
        sellerId,
        searchText: search,
        sort,
        postStatus,
        isBoosted,
        archived: isArchived,
      }

    getInventoryList(query)
      .then(res =>
        setData({
          list: res.data.data,
          total: res.data.total,
        })
      )
      .finally(() => setLoading(false))
  }
  useEffect(() => {
    setPage(1)
  }, [searchText, sortAndFilter])

  useEffect(() => {
    getList()
  }, [searchText, page, sortAndFilter])

  const handleSelect = item => {
    if (selectedItems.find(si => si.id === item.id)) {
      setSelectedItems(selectedItems.filter(si => si.id !== item.id))
    } else {
      setSelectedItems([...selectedItems, item])
    }
  }
  const archiveFilter = data.list

  const listItems = isArchived ? archiveFilter : data.list
  if (loading) return <Loading pageLoading transparent size={60} />

  return (
    <>
      {data.list && data.list.length === 0 ? (
        <>
          <PageHeader pageTitle="This filter has no results" />
        </>
      ) : (
        <>
          <ListHeader
            selectedSort={sortAndFilter.sort}
            onHeaderItemClick={onHeaderItemClick}
          />
          {listItems.map(item => (
            <ListItem
              onNotify={onNotify}
              onSuccess={onSuccess}
              onSoldout={() => getList()}
              item={item}
              isArchived={isArchived}
              selected={!!selectedItems.find(si => si.id === item.id)}
              onSelect={() =>
                handleSelect({ id: item.id, status: item.PostStatus.name })
              }
              key={item.id}
              getList={() => getList()}
              resetPage={() => resetPage()}
            />
          ))}
          <Pagination
            totalCount={data.total}
            onPageChange={newPage => setPage(newPage)}
            perPage={perPage}
            currentPage={page}
          />
        </>
      )}
    </>
  )
}

List.propTypes = {
  selectedItems: array,
  setSelectedItems: func,
  searchText: string,
  sortAndFilter: object,
  isArchived: bool,
  onNotify: func,
  onSuccess: func,
  onHeaderItemClick: func,
}

List.defaultProps = {
  searchText: '',
}

export default injectIntl(List)
