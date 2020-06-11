import React, { useState, useEffect, useRef} from 'react'
import { array, object, string, bool, func } from 'prop-types'
import { injectIntl } from 'react-intl'
import styled from 'styled-components'
// common components
import Loading from 'components/Common/Loading'
import Pagination from 'components/Common/Pagination'
// filter controller
import filter from './FilterController'
import ActionCheckBox from '../../../../components/AdminPanel/Users/Actions/ActionCheckBox'
// API
import { getUserList } from './api'
// List
import ListHeader from './ListHeader'
import ListItem from './ListItem'
// style
const StyledListContainer = styled.div`
  position: relative;
  transition: padding ease 0.2s;
  &.deactivate {
    padding-left: 64px;
  }
`
// pagination
const perPage = 5
const List = ({
  searchText,
  columns,
  filters,
  deactivateAction,
  deactivateToggle,
  deactivateChecked,
  refreshList,
  changeInCurrentPage,
  onSort
}) => {

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({
    list: [],
    total: 0,
  })
  const [refresh, setRefresh] = useState(refreshList)

  // pagination
  const [page, setPage] = useState(1)
  // table width
  const tableWidth = columns.reduce((t, {width}) => t + width, 0)
  // get user list
  const getList = () => {

    const userKind = filter.userKind(filters)
    const createdAtGreater = filters.createdAtGreater ? filters.createdAtGreater : null
    const createdAtLess = filters.createdAtLess ? filters.createdAtLess : null
    const ratingAtGreater = filters.ratingAtGreater ? filters.ratingAtGreater : null
    const ratingAtLess = filters.ratingAtLess ? filters.ratingAtLess : null
    const status = filters.status ? filters.status : null
    const sort = filters.sortable ? filters.sortable.sort : null


    setLoading(true)
    getUserList({
      page,
      perPage,
      searchText,
      userKind,
      createdAtGreater,
      createdAtLess,
      ratingAtGreater,
      ratingAtLess,
      status,
      sort
    })
      .then(res =>
        setData({
          list: res.data.data,
          total: res.data.total,
        }),
      )
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    getList()
    changeInCurrentPage(page)
    if(prevSearchRef.current !== searchText) {
      setPage(1)
    }
  }, [searchText, page, filters, refresh])

  // search
  const prevSearchRef = useRef();
  useEffect(() => {
    prevSearchRef.current = searchText;
  });

  if (loading) return <Loading pageLoading transparent size={60}/>
  return (
    <div style={{ width: tableWidth + 50, minWidth: "100%" }}>
      <ListHeader columns={columns} isDeactivate={deactivateAction} onSort={(sort) => onSort(sort)} sorted={filters.sortable}/>
      {
        data.list.map(user => (
          <StyledListContainer className={(deactivateAction ? 'deactivate' : '')} key={user.id}>
            { deactivateAction &&
              <ActionCheckBox
                item={user.id}
                status={user.status}
                checked={deactivateChecked}
                handleToggle={(selected, status) => deactivateToggle(selected, status)}
              />
            }
            <ListItem
              user={user}
              columns={columns}
              tableWidth={tableWidth}
              onActionDone={() => setRefresh(!refresh)}
            />
          </StyledListContainer>
        ))
      }
      <Pagination
        totalCount={data.total}
        onPageChange={newPage => setPage(newPage)}
        perPage={perPage}
        currentPage={page}
      />
    </div>
  )
}

List.propTypes = {
  searchText: string,
  columns: array,
  filters: object,
  deactivateAction: string,
  deactivateToggle: func,
  deactivateChecked: array,
  refreshList: bool,
  changeInCurrentPage: func,
  onSort: func
}

List.defaultProps = {
  searchText: '',
}

export default injectIntl(List)
