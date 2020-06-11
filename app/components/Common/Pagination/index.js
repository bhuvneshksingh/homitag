/**
 * Pagination
 */

// React
import React, {useState} from 'react'
import { func, number, string, bool, oneOfType, node } from 'prop-types'

// Style
import styled from 'styled-components'

const Pagination = ({
  currentPage,
  nextLabel,
  onPageChange,
  perPage,
  prevLabel,
  showNextAndPrev,
  totalCount,
}) => {
  const handleChange = type => {
    if (type === 'prev') onPageChange(currentPage - 1)
    else if (type === 'next') onPageChange(currentPage + 1)
    else onPageChange(type)
  }
  const pageCount = Math.ceil(totalCount / perPage)
  const pageShow = 10
  const [pagesInterval, setPagesInterval] = useState({ lower: currentPage-(pageShow/2), higher: currentPage+(pageShow/2)});

  let showPrevInterval ='';
  if (currentPage > pageShow) {
    showPrevInterval = <li>
      <button
        onClick={
          () => setPagesInterval({ higher: pagesInterval.higher - pageShow, lower: pagesInterval.lower - pageShow })}
        type="button"
      >
 ...
      </button>
    </li>
  } 
  let showNextInterval ='';
  if ((totalCount/pageShow > pageShow) && (currentPage < totalCount-pageShow )) {
    showNextInterval = <li>
      <button
        onClick={
          () => setPagesInterval({ higher: pagesInterval.higher + pageShow, lower: pagesInterval.lower + pageShow })}
        type="button"
      >
     ...
      </button>
    </li>
  } 
  if (totalCount<=perPage) {
    return null
  }
  return (
    <StyledPagination aria-label="Pagination">
      <ul>
        {showNextAndPrev && (
          <li>
            <button
              onClick={() => handleChange('prev')}
              disabled={currentPage === 1}
              type="button"
            >
              {prevLabel}
            </button>
          </li>
        )}
        {showPrevInterval}
        {Array(pageCount)
          .fill(0)
          .map((p, i) => {
            if ((i>=pagesInterval.lower) && i<(pagesInterval.higher)) {
              return (<li key={`${`page${i}`}`}>
                <button
                  className={i + 1 === currentPage ? 'active' : ''}
                  onClick={() => handleChange(1 + i)}
                  type="button"
                >
                  {1 + i}
                </button>
              </li>)
            }
            return null
          })}
        {showNextInterval}
        {showNextAndPrev && (
          <li>
            <button
              onClick={() => handleChange('next')}
              disabled={currentPage === pageCount}
              type="button"
            >
              {nextLabel}
            </button>
          </li>
        )}
      </ul>
    </StyledPagination>
  )
}

Pagination.propTypes = {
  currentPage: number,
  nextLabel: oneOfType([string, node]),
  onPageChange: func.isRequired,
  perPage: number,
  prevLabel: oneOfType([string, node]),
  showNextAndPrev: bool,
  totalCount: number,
}

Pagination.defaultProps = {
  currentPage: 1,
  nextLabel: 'Next',
  perPage: 5,
  prevLabel: 'Previous',
  showNextAndPrev: true
}

export default Pagination

const StyledPagination = styled.nav`
  ul {
    padding-left: 0;
    list-style: none;
    width: fit-content;
    margin: 0 auto;
  }
  li {
    display: inline;
    button {
      position: relative;
      cursor: pointer;
      padding: 0.5rem 0.75rem;
      margin-left: -1px;
      line-height: 1.25;
      color: ${({ theme }) => theme.colors.homiWhite};
      background-color: ${({ theme }) => theme.colors.homiBlack};
      font-size: 14px;
      border-radius: 0;
      :hover {
        background-color: ${({ theme }) => theme.colors.homiPrimary};
        color: ${({ theme }) => theme.colors.homiWhite};
      }
      &.active {
        background-color: ${({ theme }) => theme.colors.homiPrimary};
        color: ${({ theme }) => theme.colors.homiWhite};
      }
    }
    :first-child {
      button {
        margin-left: 0;
        border-top-left-radius: 0.25rem;
        border-bottom-left-radius: 0.25rem;
      }
    }
    :last-child {
      button {
        border-top-right-radius: 0.25rem;
        border-bottom-right-radius: 0.25rem;
      }
    }
  }
`
