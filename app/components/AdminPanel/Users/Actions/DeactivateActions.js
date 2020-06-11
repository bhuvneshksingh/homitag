import React from 'react'
import { func, number, string } from 'prop-types'
import { Box } from '@material-ui/core'
import styled from 'styled-components'
import CircularProgress from '@material-ui/core/CircularProgress'
import {
  StyledActionButton,
} from '../styles'

const ActionButton = styled(StyledActionButton)`
    && {
      width: 100%;
      
      &.green {
          background: #00BDAA;
          &:disabled {
              background: #E8E8E8;
              color: white;
          }
      }
      &.white {
        background: none;
      }
      span > div {
        vertical-align: middle
      }
    }
`
const DeactivateActions = ({ onDone, onDeactivate, totalDeactivation, isLoading, actionMethod }) => (
  <>
    <Box display="flex" flexDirection="row" width={1}>
      <Box mr={2} ml={1} width={0.5}>
        <ActionButton onClick={onDone}>
          Done
        </ActionButton>
      </Box>
      <Box width={0.5}>
        {!isLoading &&
        <ActionButton
          onClick={onDeactivate}
          className='green'
          disabled={totalDeactivation === 0}>
          {actionMethod === 'deactivated' &&
          <span>Deactivate</span>
          }
          {actionMethod === 'delete' &&
          <span>Remove</span>
          }
        </ActionButton>
        }
        {isLoading && isLoading === 'deactivated' &&
        <ActionButton className='white' disabled>
          <CircularProgress size={24}/>
        </ActionButton>
        }
      </Box>
    </Box>
  </>
)

DeactivateActions.propTypes = {
  onDone: func,
  onDeactivate: func,
  totalDeactivation: number,
  isLoading: string,
  actionMethod: string,
}
export default DeactivateActions
