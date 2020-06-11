import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { CSSTransition } from 'react-transition-group'

import './styles.css'

const StyledInner = styled.div`
  width: 400px;
  height: 100%;
  flex: 1;
  padding-bottom: 50px;
`

const duration = 3000

const InnerWrapper = ({ children, ...props }) => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
    return () => {
      setMounted(false)
    }
  }, [])
  return (
    <CSSTransition in={mounted} timeout={duration} classNames="innerWrapper">
      <StyledInner {...props}>{children}</StyledInner>
    </CSSTransition>
  )
}

InnerWrapper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
}

export default InnerWrapper
