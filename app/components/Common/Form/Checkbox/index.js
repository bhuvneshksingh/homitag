import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles'
import { Checkbox as MuiCheckbox, FormControlLabel } from '@material-ui/core'

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
    borderRadius: 4,
    width: 24,
    height: 24,
    border: `1px solid #969696;`,
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
      backgroundColor: theme.colors.homiWhite,
      content: '""',
    },
    'input:hover ~ &': {
      backgroundColor: theme.colors.homiPrimary,
    },
  },
}))

const StyledFormLabel = styled(FormControlLabel)`
  && {
    flex: 1 49%;
  }
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
  color: ${({ theme }) => theme.colors.text};
  margin-top: 15px;
`

const CheckBoxWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: 'space-between';
  align-items: 'center';
`

export const StyledCheckbox = props => {
  const classes = useStyles()

  return (
    <MuiCheckbox
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  )
}

const CheckboxGroup = ({
  label,
  labelTitle,
  options,
  field,
  form: { touched, errors, setFieldValue },
  ...props
}) => (
  <>
    {label && <Label title={labelTitle}>{label}</Label>}
    <CheckBoxWrapper>
      {options.map(o => (
        <StyledFormLabel
          value={o.value}
          control={
            <StyledCheckbox
              checked={field.value.includes(o.value)}
              {...props}
            />
          }
          onChange={() => {
            if (field.value.includes(o.value)) {
              const nextValue = field.value.filter(value => value !== o.value)
              setFieldValue(field.name, nextValue)
            } else {
              const nextValue = field.value.concat(o.value)
              setFieldValue(field.name, nextValue)
            }
          }}
          label={o.label}
          disabled={o.disabled}
          key={o.value}
        />
      ))}
    </CheckBoxWrapper>
    {touched[field.name] && errors[field.name] && (
      <Error>{errors[field.name]}</Error>
    )}
  </>
)

CheckboxGroup.propTypes = {
  label: PropTypes.string,
  labelTitle: PropTypes.string,
  options: PropTypes.array,
  field: PropTypes.object,
  form: PropTypes.object,
}

CheckboxGroup.defaultProps = {
  options: [],
}

export default CheckboxGroup
