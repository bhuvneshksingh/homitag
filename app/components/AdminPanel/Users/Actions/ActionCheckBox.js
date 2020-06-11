import clsx from 'clsx'
import Checkbox from '@material-ui/core/Checkbox'
import React from 'react'
import styled from 'styled-components'
import { string, array, func } from 'prop-types'
import {
  StyledCheckBox,
} from '../styles'
const StyledCheckBoxContainer = styled.div`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 32px;
`
const ActionCheckBox = ({ item, status, handleToggle, checked }) => {
  const classes = StyledCheckBox()
  return (
    <StyledCheckBoxContainer onClick={handleToggle(item, status)}>
      <Checkbox
        className={classes.root}
        edge="start"
        checked={checked.findIndex(p => p.id === item) !== -1}
        tabIndex={-1}
        disableRipple
        checkedIcon={<span className={clsx(classes.icon_rounded, classes.checkedIcon)}/>}
        icon={<span className={classes.icon_rounded}/>}
        inputProps={{ 'aria-labelledby': item }}
      />
    </StyledCheckBoxContainer>
  )
}
ActionCheckBox.propTypes = {
  item: string,
  status: string,
  checked: array,
  handleToggle: func
}
export default ActionCheckBox
