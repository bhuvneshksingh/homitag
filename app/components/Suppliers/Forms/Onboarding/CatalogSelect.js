import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles'
import {
  Radio as MuiRadio,
  RadioGroup,
  FormControlLabel,
} from '@material-ui/core'

import Icon from 'components/Common/Icon'
import Label from 'components/Common/Form/Label'
import Error from 'components/Common/Form/Error'

const useStyles = makeStyles({
  root: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
})

const Wrapper = styled.div`
  text-align: center;
`

const OptionsWrapper = styled(RadioGroup)`
  && {
    margin: 12px 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    flex-direction: row;
  }
`

const Option = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  width: 105px;
  height: 135px;
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.homiWhite};
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
  .bottom {
    width: 100%;
    background-color: ${({ theme }) => theme.colors.text};
    color: ${({ theme }) => theme.colors.homiWhite};
    height: 40px;
    line-height: 40px;
    font-weight: 600;
    font-size: 13px;
    transition: all 0.1s ease-in-out;
  }

  &.selected {
    .bottom {
      background-color: ${({ theme }) => theme.colors.homiCompOne};
    }
  }
`

const IconWrapper = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.homiWhite};
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledIcon = styled(Icon).attrs(props => ({
  color: props.theme.colors.homiCompOne,
}))``

const renderIcon = (icon, repeat) => {
  const localRepeat = repeat || 1
  return Array(localRepeat)
    .fill(0)
    .map(() => <StyledIcon icon={icon} />)
}

export const StyledRadio = ({ icon, iconRepeat, label, ...props }) => {
  const classes = useStyles()
  const renderOption = selected => (
    <Option className={selected ? 'selected' : ''}>
      <IconWrapper>{renderIcon(icon, iconRepeat)}</IconWrapper>
      <div className="bottom">{label}</div>
    </Option>
  )
  return (
    <MuiRadio
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={renderOption(true)}
      icon={renderOption()}
      {...props}
    />
  )
}

StyledRadio.propTypes = {
  icon: PropTypes.string,
  iconRepeat: PropTypes.number,
  label: PropTypes.string,
}

const CatalogSelect = ({
  label,
  labelTitle,
  options,
  field,
  form: { touched, errors },
  ...props
}) => (
  <Wrapper>
    <Label title={labelTitle} />
    <OptionsWrapper {...props} {...field}>
      {options.map(o => (
        <FormControlLabel
          value={o.value}
          control={
            <StyledRadio
              label={o.label}
              icon={o.icon}
              iconRepeat={o.iconRepeat}
            />
          }
          disabled={o.disabled}
          key={o.value}
        />
      ))}
    </OptionsWrapper>
    {touched[field.name] && errors[field.name] && (
      <Error>{errors[field.name]}</Error>
    )}
  </Wrapper>
)

CatalogSelect.propTypes = {
  label: PropTypes.string,
  labelTitle: PropTypes.string,
  options: PropTypes.array,
  field: PropTypes.object,
  form: PropTypes.object,
}

CatalogSelect.defaultProps = {
  options: [],
}

export default CatalogSelect
