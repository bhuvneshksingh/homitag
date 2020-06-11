import React from 'react'
import { func, bool } from 'prop-types'
import styled from 'styled-components'
import Box from '@material-ui/core/Box';
import Icon from 'components/Common/Icon'

const StyledIcon = styled(Icon).attrs(props => ({
  color: props.filled ? props.theme.colors.homiCompTwo : 'none',
  strokeColor: props.filled ? 'none' : props.theme.colors.homiCompTwo
}))`
  width: 22px;
  height: 22px;
  cursor: pointer;
`
const StarButton = styled.a`
    background: none;
    border: none;
    &:first-child {
      margin-left: -8px;
    }
`

const renderStar = isFull => <StyledIcon icon="star" filled={isFull} />

const Star = ({ isFull, onClick }) => (
  <Box p={1}>
    <StarButton onClick={onClick}>{renderStar(isFull || false)}</StarButton>
  </Box>
)

Star.propTypes = {
  isFull: bool,
  onClick: func,
}

export default Star
