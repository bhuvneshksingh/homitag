/* eslint-disable indent */
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link as RRDLink } from 'react-router-dom'
import clsx from 'clsx'

const StyledLink = styled(RRDLink)`
  && {
    color: ${({ theme }) => theme.colors.homiBlack};
    &.primaryLink {
      color: ${({ theme }) => theme.colors.homiPrimary};
    }
  }
`

StyledLink.propTypes = {
  primary: PropTypes.bool,
}

export const Link = ({ children, primary, ...props }) => (
  <StyledLink
    className={clsx(props.className, primary && 'primaryLink')}
    {...props}
  >
    {children}
  </StyledLink>
)

Link.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
  ]),
  primary: PropTypes.bool,
  className: PropTypes.string,
}
