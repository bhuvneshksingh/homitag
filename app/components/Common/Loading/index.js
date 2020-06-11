import React from 'react'
import { string, bool } from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import styled from 'styled-components'

const ColorCircularProgress = withStyles(theme => ({
  root: {
    color: theme.colors.homiPrimary,
  },
}))(CircularProgress)

const LoadingWrapper = styled.div`
  position: ${({ pageLoading, position }) =>
    pageLoading ? 'fixed' : position};
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ pageLoading }) => (pageLoading ? '100vw' : '100%')};
  height: ${({ pageLoading }) => (pageLoading ? '100vh' : '100%')};
  z-index: 2;
  ${({ transparent }) => transparent && `background-color: rgba(0,0,0,0.5)`}
`

const Spinner = props => <ColorCircularProgress {...props} />

const Loading = ({ pageLoading, transparent, show, position, ...props }) => {
  if (!show) return null
  return (
    <LoadingWrapper
      transparent={transparent}
      pageLoading={pageLoading}
      position={position}
    >
      <Spinner {...props} />
    </LoadingWrapper>
  )
}

Loading.propTypes = {
  pageLoading: bool,
  transparent: bool,
  show: bool,
  position: string,
}

Loading.defaultProps = {
  show: true,
  position: 'absolute',
}

export default Loading
