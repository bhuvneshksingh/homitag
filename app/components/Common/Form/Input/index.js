import React, { createRef } from 'react'
import { bool, number, string, object } from 'prop-types'
import styled from 'styled-components'
import { Input as MuiInput } from '@material-ui/core'
import InputMask from 'react-input-mask'

import Label from '../Label'
import Error from '../Error'

const StyledInput = styled(MuiInput)`
  box-sizing: border-box;
  width: 100%;
  max-height: 40px;
  border: 1px solid
    ${({ theme, hasError }) =>
    hasError ? theme.colors.homiCompTwo : theme.colors.homiBlack};
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.homiBlack};
  flex: 1 49%;
  && {
    height: 40px;
    font-weight: 600;
    font-size: 14px;
    margin: 10px 0;
    padding: 0 10px;
    background-color: none;
  }
  .MuiInputBase-input {
    text-align: ${({ textalign }) => textalign};
    &:read-only {
      color: ${({ theme }) => theme.colors.shapes};
      cursor: not-allowed;
    }
  }
`

const InlineWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`

const HalfInputWrapper = styled.div`
  display: inline-block;
  width: 50%;
  box-sizing: border-box;
  padding-right: 5px;
`

const Input = ({
  label,
  labelTitle,
  field: { onChange, ...field },
  form: { touched, errors },
  inline,
  fullWidth,
  maxLength,
  goToNextInput,
  showError,
  mask,
  ...props
}) => {
  const hasError = touched[field.name] && errors[field.name]
  const inputRef = createRef()
  const handleChange = e => {
    if (maxLength && goToNextInput && e.target.value >= maxLength)
      inputRef.current.parentElement.nextElementSibling.firstElementChild.focus()
    onChange(e)
  }
  const input = maskProps => (
    <StyledInput
      disableUnderline
      margin="none"
      haserror={hasError}
      inputProps={{
        maxLength,
      }}
      inputRef={inputRef}
      onChange={handleChange}
      {...props}
      {...field}
      {...maskProps}
    />
  )
  const renderInput = () => (
    <>
      {label && <Label title={labelTitle}>{label}</Label>}
      {mask ? (
        <InputMask
          mask={mask}
          value={field.value}
          onChange={handleChange}
          onBlur={field.onBlur}
        >
          {inputProps => input(inputProps)}
        </InputMask>
      ) : (
        input()
      )}
      {showError && <Error>{hasError ? errors[field.name] : ' '}</Error>}
    </>
  )
  let finalInput = () => renderInput()
  if (inline) finalInput = () => <InlineWrapper>{renderInput()}</InlineWrapper>
  if (!fullWidth)
    finalInput = () => <HalfInputWrapper>{renderInput()}</HalfInputWrapper>
  return finalInput()
}

Input.propTypes = {
  label: string,
  labelTitle: string,
  field: object,
  form: object,
  inline: bool,
  fullWidth: bool,
  textalign: string,
  maxLength: number,
  showError: bool,
  goToNextInput: bool,
}

Input.defaultProps = {
  fullWidth: true,
  textalign: 'left',
  showError: true,
}

export default Input
