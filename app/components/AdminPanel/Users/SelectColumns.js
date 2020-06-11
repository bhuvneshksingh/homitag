import React, { useEffect } from 'react'
import Popover from '@material-ui/core/Popover'
import styled from 'styled-components'
import { injectIntl } from 'react-intl'
import { func, object, array } from 'prop-types'
import clsx from 'clsx'
// list
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
// checkbox
import Checkbox from '@material-ui/core/Checkbox'
import { SortableContainer, SortableElement, sortableHandle } from 'react-sortable-hoc'
import arrayMove from 'array-move'
// icon button
import DragIcon from 'assets/images/icons/drag.svg'
import ClosePop from 'assets/images/icons/close.png'
// Intl
import messages from '../../../containers/AdminPanel/Dashboard/Users/messages'
// styles
import {
  PopOverTopCloseButton,
  StyledActionButton,
  StyledPopoverBody,
  StyledCheckBox,
  StyledImg,
} from './styles'

const PopOverButton = styled(StyledActionButton)`
  && {
   margin-left: 8px;
   padding-left: 40px;
   padding-right: 40px;
  }
`
const ListItemHolder = styled(ListItem)`
    && {
        padding: 0;
        z-index: 9999;
        &:hover{
          background: #fff;
        }
    }
`
const ListItemIconHolder = styled(ListItemIcon)`
    && {
        min-width: 40px;
    }
`
const PopoverBody = styled(StyledPopoverBody)`
    && {
      min-width: 480px;
      > p {
        margin: 32px 0;
        font-size: 16px;
        line-height: 22px;
        color: #969696;
      }
    }
`
const PopoverApply = styled(StyledActionButton)`
    && {
        width: 100%;
        margin-top: 24px;
    }
`
const PopoverSetDefault = styled(PopoverApply)`
    && {
      background: ${({ theme }) => theme.colors.homiWhite};
      box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.homiPrimary} inset !important;
      color: ${({ theme }) => theme.colors.homiPrimary};
    }
`
const ColumnList = styled.div`
    padding: 8px 0;
`
const DragButton = styled.span`
    && {
        width: 32px;
        height: 32px;
        cursor: row-resize;
    }
`
const ListText = styled(ListItemText)`
    && {
      color: #969696
    }
`
// Column list
const SelectColumns = ({ intl, columns, activeColumns, onApply }) => {
  const classes = StyledCheckBox()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [columnOrder, setColumnOrder] = React.useState(
    columns.sort((a, b) =>
      activeColumns.indexOf(a) < activeColumns.indexOf(b) ? -1 : 1,
    ).sort((a, b) =>
      b.show < a.show ? -1 : 1,
    ).filter(column => column.id !== 'more_button')
  )
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
  // checkbox
  const [checked, setChecked] = React.useState(
    activeColumns
      .filter(column => column.id !== 'more_button')
      .map(column =>
        column.id,
      ),
  )
  // toggle checkbox
  const handleToggle = (column, index) => () => {
    const currentIndex = checked.indexOf(column)
    const newChecked = [...checked]
    const newOrderColumns = [...columnOrder]
    // check if
    if (currentIndex === -1) {
      newChecked.push(column)
      newOrderColumns[index].show = true
      setColumnOrder(newOrderColumns)
    } else {
      // or to splice
      newChecked.splice(currentIndex, 1)
      newOrderColumns[index].show = false
    }
    // new checked values
    setChecked(newChecked)
  }
  const handleApply = () => {
    onApply(checked, false)
    handleClose()
  }
  const handleSetDefault = () => {
    onApply(checked, true)
    handleClose()
  }
  const onSortEnd = ({ oldIndex, newIndex }) => {
    const newColumnOrder = arrayMove(columnOrder, oldIndex, newIndex)
    setColumnOrder(newColumnOrder)
  }

  useEffect(() => {
    updateColumns()
  }, [columnOrder])

  const updateColumns = () => {
    const columnUpdates = columnOrder.filter(column =>
      column.show === true
    )
    const newChecked = [];
    columnUpdates.map((column) =>
      newChecked.push(column.id)
    )
    setChecked(newChecked)
  }


  const DragHandle = sortableHandle(() =>
    <DragButton edge="end" aria-label="drag">
      <StyledImg src={DragIcon}/>
    </DragButton>,
  )

  const SortableItem = SortableElement(({ tempIndex, labelId, column }) =>
    <ListItemHolder
      disableRipple
      role={undefined}
      dense
      button
      onClick={handleToggle(column.id, tempIndex)}>
      {column.field !== 'button' &&
      <>
        <ListItemIconHolder>
          <Checkbox
            className={classes.root}
            edge="start"
            checked={checked.indexOf(column.id) !== -1}
            tabIndex={-1}
            disableRipple
            checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)}/>}
            icon={<span className={classes.icon}/>}
            inputProps={{ 'aria-labelledby': labelId }}
          />
        </ListItemIconHolder>

        <ListText id={labelId} primary={column.header}/>
        {checked.indexOf(column.id) !== -1 &&
        <DragHandle/>
        }
      </>
      }

    </ListItemHolder>,
  )
  const SortableList = SortableContainer(({ items }) => (
    <List>
      {items.map((column, index) => {
        const labelId = `checkbox-list-label-${column.id}`

        return (
          <SortableItem key={`item-${column.id}`} index={index} tempIndex={index} labelId={labelId} column={column}/>
        )
      })}
    </List>
  ))
  return (
    <div>
      <PopOverButton onClick={handleClick}>
        {intl.formatMessage(messages.selectColumns)}
      </PopOverButton>
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

          <PopOverTopCloseButton
            edge="end"
            aria-label="close"
            onClick={() => handleClose()}>
            <StyledImg src={ClosePop}/>
          </PopOverTopCloseButton>

          <h4>{intl.formatMessage(messages.selectColumns)}</h4>
          <p>Select which columns to include and <br/>
            drag and drop them to rearrange.</p>

          <ColumnList>
            <SortableList items={columnOrder} onSortEnd={onSortEnd} useDragHandle lockAxis="y"/>
          </ColumnList>

          <PopoverApply onClick={() => handleApply()}>
            {intl.formatMessage(messages.Apply)}
          </PopoverApply>
          <PopoverSetDefault onClick={() => handleSetDefault()}>
            {intl.formatMessage(messages.setAsDefault)}
          </PopoverSetDefault>

        </PopoverBody>
      </Popover>
    </div>
  )
}

SelectColumns.propTypes = {
  intl: object,
  columns: array,
  activeColumns: array,
  onApply: func,
}

export default injectIntl(SelectColumns)

