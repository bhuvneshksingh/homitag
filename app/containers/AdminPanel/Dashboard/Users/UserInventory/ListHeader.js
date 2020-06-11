import React, { useState } from 'react'
import styled from 'styled-components'
import { array, bool, func, object } from 'prop-types'
// style
const FlexTable = styled.div`
  display: flex;
  flex-flow: row;
  padding: 0 32px;
  max-height: 32px;
  min-height: 32px;
  transition: padding ease 0.2s;
  > div {
    width: calc(100% / 10.5);
    p {
      font-weight: 600;
      font-size: 12px;
      line-height: 15px;
      text-transform: uppercase;
    }
  }
  &.deactivate {
    padding-left: 96px;
  }
`
const StyledArrow = styled.span`
  width: 10px;
  height: 10px;
  border-top: 2px solid #000;
  border-right: 2px solid #000;
  position: absolute;
  right: -24px;
`
const UpArrow = styled(StyledArrow)`
  && {
    transform: rotate(-45deg);
    top: 4px;
  }
`
const DownArrow = styled(StyledArrow)`
  && {
    transform: rotate(135deg);
    top: 0;
  }
`
const StyledSortable = styled.p`
  position: relative;
  display: inline-block;
  cursor: pointer;
  vertical-align: top;
`
const ListHeader = ({ columns, isDeactivate, onSort, sorted }) => {

  const [sortColumn, setSortColumn] = useState(sorted || {
    column: null,
    sort: null
  })

  const handleSort = (column) => {
    const toSort = sortColumn && sortColumn.sort === column.sortAsc ? column.sortDesc : column.sortAsc
    const sortArray = {
      column: column.id,
      sort: toSort
    }
    setSortColumn(sortArray)
    onSort(sortArray)
    // onSort(sortArray)
  }
  return (
    <>
      <FlexTable className={(isDeactivate ? 'deactivate' : '')}>
        {
          columns.map(column => (
            <div key={column.id} style={{ width: column.width }}>
              {column.sortable &&
                <StyledSortable onClick={() => handleSort(column)}>
                  {column.header}
                  {sortColumn.column === column.id &&
                    <>
                      {sortColumn.sort === column.sortAsc &&
                      <UpArrow/>
                      }
                      {sortColumn.sort === column.sortDesc &&
                      <DownArrow/>
                      }
                    </>
                  } {sortColumn.column !== column.id &&
                      <DownArrow/>
                  }
                </StyledSortable>
              }
              {!column.sortable &&
                <p>{column.header}</p>
              }
            </div>
          ))
        }
      </FlexTable>
    </>
  )
}
ListHeader.propTypes = {
  columns: array,
  isDeactivate: bool,
  onSort: func,
  sorted: object,
}

ListHeader.defaultProps = {}
export default ListHeader
