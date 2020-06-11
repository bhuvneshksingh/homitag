import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledLabel = styled.label`
  && {
    margin-top: 20px;
  }
  font-size: 16px;
  font-weight: normal;
  color: ${({ theme }) => theme.colors.homiBlack};
  flex: 1 49%;
  font-style: normal;
  font-size: 16px;
  line-height: 20px;
`

const StyledTitle = styled.div`
  margin: 10px 0;
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.homiBlack};
  text-transform: uppercase;
`

const Label = ({ children, title, ...props }) => (
  <StyledLabel {...props}>
    {title && <StyledTitle>{title}</StyledTitle>}
    {children}
  </StyledLabel>
)

Label.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  title: PropTypes.string,
}

export default Label
