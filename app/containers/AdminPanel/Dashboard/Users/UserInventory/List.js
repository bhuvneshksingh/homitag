import React, { useState, useEffect, useRef} from 'react'
import { array, object, string, bool, func } from 'prop-types'
import { injectIntl } from 'react-intl'
import styled from 'styled-components'
// common components
import Loading from '../../../../../components/Common/Loading'
import Pagination from '../../../../../components/Common/Pagination'
// filter controller
// import filter from './FilterController'
// API
import { getUserSupports } from './api'
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
  refreshList,
  changeInCurrentPage,
  onSort
}) => {

  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({
    list: [],
    total: 0,
  })
  // pagination
  const [page, setPage] = useState(1)
  // table width
  const tableWidth = columns.reduce((t, {width}) => t + width, 0)
  // get user list
  const getList = () => {

    const status = filters.status ? filters.status : null
    const createdAtGreater = filters.createdAtGreater ? filters.createdAtGreater : null
    const createdAtLess = filters.createdAtLess ? filters.createdAtLess : null
    const isSeller = filters.isSeller ? filters.isSeller : null
    const isBuyer = filters.isBuyer ? filters.isBuyer : null
    const isSupplier = filters.isSupplier ? filters.isSupplier : null
    const isReseller = filters.isReseller ? filters.isReseller : null
    const userId = filters.userId ? filters.userId : null

    setLoading(true)
    getUserSupports({
      page,
      perPage,
      createdAtGreater,
      createdAtLess,
      isSeller,
      isBuyer,
      isSupplier,
      isReseller,
      status,
      userId
    })
      .then((res) => {
        setData({
          list: res.data.data,
          total: 1
        })
      }).finally(() => setLoading(false))
  }

  useEffect(() => {
    getList()
    changeInCurrentPage(page)
    if(prevSearchRef.current !== searchText) {
      setPage(1)
    }
  }, [searchText, page, filters, refreshList])

  // search
  const prevSearchRef = useRef();
  useEffect(() => {
    prevSearchRef.current = searchText;
  });

  if (loading) return <Loading pageLoading transparent size={60}/>
  return (
    <div style={{ width: tableWidth + 50, minWidth: "100%" }}>
      <ListHeader columns={columns} onSort={(sort) => onSort(sort)} sorted={filters.sortable}/>
      {
        data.list.map(user => (
          <StyledListContainer key={user.id}>
            <ListItem
              user={user}
              columns={columns}
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
  refreshList: bool,
  changeInCurrentPage: func,
  onSort: func
}

List.defaultProps = {
  searchText: '',
}

export default injectIntl(List)
