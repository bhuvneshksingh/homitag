import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles'
import {
  Radio as MuiRadio,
  RadioGroup as MuiRadioGroup,
  FormControlLabel,
} from '@material-ui/core'

import Label from '../Label'
import Error from '../Error'

const useStyles = makeStyles(theme => ({
  root: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    width: 24,
    height: 24,
    border: `1px solid ${theme.colors.homiGrey}`,
    backgroundColor: theme.colors.homiWhite,
    'input:hover ~ &': {
      backgroundColor: theme.colors.homiPrimary,
    },
    'input:disabled ~ &': {
      backgroundColor: theme.colors.homiGrey,
    },
  },
  checkedIcon: {
    backgroundColor: theme.colors.homiPrimary,
    '&:before': {
      display: 'block',
      width: 10,
      height: 10,
      borderRadius: '50%',
      backgroundColor: theme.colors.homiWhite,
      content: '""',
    },
    'input:hover ~ &': {
      backgroundColor: theme.colors.homiPrimary,
    },
  },
}))

const StyledFormLabel = styled(FormControlLabel)`
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
  color: ${({ theme }) => theme.colors.text};
  margin-top: 15px;
`

export const StyledRadio = props => {
  const classes = useStyles()

  return (
    <MuiRadio
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  )
}

const RadioGroup = ({
  label,
  labelTitle,
  options,
  field,
  form: { touched, errors },
  ...props
}) => (
  <>
    {(label || labelTitle) && <Label title={labelTitle}>{label}</Label>}
    <MuiRadioGroup {...props} {...field}>
      {options.map(o => (
        <StyledFormLabel
          value={o.value}
          control={<StyledRadio />}
          label={o.label}
          disabled={o.disabled}
          key={o.value}
        />
      ))}
    </MuiRadioGroup>
    {touched[field.name] && errors[field.name] && (
      <Error>{errors[field.name]}</Error>
    )}
  </>
)

RadioGroup.propTypes = {
  label: PropTypes.string,
  labelTitle: PropTypes.string,
  options: PropTypes.array,
  field: PropTypes.object,
  form: PropTypes.object,
}

RadioGroup.defaultProps = {
  options: [],
}

export default RadioGroup
