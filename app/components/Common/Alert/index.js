import React from 'react'
import { func, string, bool } from 'prop-types'
import infoIcon from '../../../assets/images/icons/info.svg'
import { StyledAlert, StyledIcon, StyledText, StyledUndo } from './style'

const AlertTypes = [
  {
    type: 'notice',
    icon: infoIcon,
  },
]

const Alert = ({ type, message, onUndoClick, canUndo }) => {
  const undoHandle = () =>{
    onUndoClick()
  }
  return (
    <StyledAlert display="flex" flexDirection="row" mb={3} className={type}>
      <StyledIcon src={AlertTypes.filter(d => (d.type === type)).map(t => t.icon)}/>
      <StyledText>
        {message}
      </StyledText>
      { canUndo &&
      <StyledUndo onClick={() => undoHandle()}>Undo</StyledUndo>
      }
    </StyledAlert>
  )
}
Alert.propTypes = {
  type: string,
  message: string,
  onUndoClick: func,
  canUndo: bool
}
export default Alert

