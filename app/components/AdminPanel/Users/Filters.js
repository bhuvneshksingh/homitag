import React from 'react'
import Popover from '@material-ui/core/Popover'
import styled from 'styled-components'
import { func, object } from 'prop-types'
// icons
import ArrangementIcon from 'assets/images/icons/arrangement.png'
import ClosePop from 'assets/images/icons/close.png'
//
import FilterForm from './FilterForm'
// styles
import {
  PopOverTopCloseButton,
  StyledPopoverBody,
  StyledIconButton,
  StyledImg,
} from './styles'

const PopoverBody = styled(StyledPopoverBody)`
  && {
    min-width: 532px;
      span {
         text-align: center;
         display: block;
         font-size: 14px;
      }
  }
`

const Filters = ({ onSubmit, filters }) => {
// popover actions
  const [anchorEl, setAnchorEl] = React.useState(null)
  // popover open
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }
  // popover close
  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined
  // star
  // const [value, setValue] = React.useState(2);

  const handleForm = (values) => {
    onSubmit(values);
    handleClose();
  }

  return (
    <>
      <StyledIconButton onClick={handleClick}>
        <StyledImg src={ArrangementIcon}/>
      </StyledIconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <PopoverBody>
          <PopOverTopCloseButton edge="end" aria-label="close" onClick={() => handleClose()}>
            <StyledImg src={ClosePop}/>
          </PopOverTopCloseButton>

          <h4>Filters</h4>
          <FilterForm
            onSubmit={handleForm}
            filters={filters}
          />

        </PopoverBody>
      </Popover>
    </>
  )
}

Filters.propTypes = {
  onSubmit: func,
  filters: object
}
export default Filters
