import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Label from '../Label'
import Error from '../Error'

const StyledSelect = styled.select`
  box-sizing: border-box;
  width: 100%;
  max-height: 40px;
  border: 1px solid ${({ theme }) => theme.colors.homiGrey};
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.homiBlack};
  flex: 1 49%;
  && {
    height: 40px;
    font-size: 14px;
    margin: 10px 0;
    padding: 0 10px;
    background-color: none;
    font-family: ${({ theme }) => theme.typography.fontFamily.join(',')};
  }
`

const HalfInputWrapper = styled.div`
  display: inline-block;
  width: 50%;
  box-sizing: border-box;
  padding-right: 5px;
`

const Select = ({
  label,
  labelTitle,
  options,
  field,
  form: { touched, errors },
  fullWidth,
  ...props
}) => {
  const renderSelect = () => (
    <>
      {label && <Label title={labelTitle}>{label}</Label>}
      <StyledSelect {...props} {...field}>
        {options.map(o => (
          <option value={o.value} key={o.value}>
            {o.title}
          </option>
        ))}
      </StyledSelect>
      <Error>
        {touched[field.name] && errors[field.name] ? errors[field.name] : ' '}
      </Error>
    </>
  )
  let finalSelect = () => renderSelect()
  if (!fullWidth)
    finalSelect = () => <HalfInputWrapper>{renderSelect()}</HalfInputWrapper>
  return finalSelect()
}

Select.propTypes = {
  label: PropTypes.string,
  labelTitle: PropTypes.string,
  options: PropTypes.array,
  field: PropTypes.object,
  form: PropTypes.object,
  fullWidth: PropTypes.bool,
}

Select.defaultProps = {
  options: [],
  fullWidth: true,
}

export default Select
