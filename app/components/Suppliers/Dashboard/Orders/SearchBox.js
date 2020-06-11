import React, { useState, useEffect } from 'react'
import { func, string } from 'prop-types'
import styled from 'styled-components'
import { Input as MuiInput } from '@material-ui/core'
import { useDebounce } from 'use-debounce'

import SearchIcon from 'assets/images/icons/search.png'

const StyledInput = styled(MuiInput)`
  box-sizing: border-box;
  width: 100%;
  max-height: 60px;
  border: 1px solid ${({ theme }) => theme.colors.homiGrey};
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.homiBlack};
  flex: 1 49%;
  && {
    height: 60px;
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
    padding: 0 10px;
    background-color: ${({ theme }) => theme.colors.homiLightGrey};
  }
`

const StyledAdornment = styled.img.attrs({
  src: SearchIcon,
  alt: 'Search',
})`
  width: 16px;
  height: 16px;
  margin-right: 20px;
`

const SearchBox = ({ onChange, children, valueSet}) => {
  const [inputValue, setInputValue] = useState(valueSet)
  const [value] = useDebounce(inputValue, 1000)
  useEffect(() => {
    onChange(value)
  }, [value])
  return (
    <StyledInput
      disableUnderline
      margin="none"
      startAdornment={<StyledAdornment />}
      placeholder={children}
      value={inputValue}
      onChange={e => {
        setInputValue(e.target.value)
      }}
    />
  )
}

SearchBox.propTypes = {
  onChange: func,
  children: string,
  valueSet: string
}

SearchBox.defaultProps = {}

export default SearchBox
