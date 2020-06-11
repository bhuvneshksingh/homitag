import React from 'react'
import PropTypes from 'prop-types'
import { Switch as MuiSwitch, FormControlLabel } from '@material-ui/core'
import styled from 'styled-components'

import Error from '../Error'

const StyledSwitch = styled(MuiSwitch)`
  .MuiSwitch-switchBase {
    color: ${({ theme }) => theme.colors.homiBlack};
    padding: 12px;
  }
  .MuiSwitch-colorSecondary.Mui-checked {
    color: ${({ theme }) => theme.colors.homiWhite};
  }
  .MuiSwitch-track {
    background-color: ${({ theme }) => theme.colors.homiWhite};
    border: 2px solid ${({ theme }) => theme.colors.homiGrey};
  }
  .MuiSwitch-colorSecondary.Mui-checked + .MuiSwitch-track {
    background-color: ${({ theme }) => theme.colors.homiCompOne};
    opacity: 1;
  }
  .MuiSwitch-thumb {
    height: 15px;
    width: 17px;
  }
`

const StyledFormLabel = styled(FormControlLabel).attrs({
  labelPlacement: 'start',
})`
  && {
    justify-content: space-between;
    width: 100%;
    margin: 0;
    color: ${({ theme }) => theme.colors.text};
  }
`

const Switch = ({ label, field, form: { touched, errors }, ...props }) => (
  <>
    <StyledFormLabel
      control={<StyledSwitch {...props} {...field} />}
      label={label}
    />
    {touched[field.name] && errors[field.name] && (
      <Error>{errors[field.name]}</Error>
    )}
  </>
)

Switch.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  field: PropTypes.object,
  form: PropTypes.object,
}

export default Switch
