import React, { useState } from 'react'
import { number } from 'prop-types'
import styled from 'styled-components'
import uniqid from 'uniqid'

import Icon from 'components/Common/Icon'

const StyledIcon = styled(Icon).attrs(props => ({
  color: props.filled ? props.theme.colors.homiCompTwo : 'none',
  strokeColor: props.filled ? 'none' : props.theme.colors.homiCompTwo,
}))`
  width: 14px;
  height: 13px;
  margin-right: 6px;
`

const Wrapper = styled.div``

const renderStar = filled => (
  <StyledIcon icon="star" filled={filled} key={uniqid()} />
)

const Stars = ({ initialCount }) => {
  const [count] = useState(parseInt(initialCount, 10))
  return (
    <Wrapper>
      {Array(count)
        .fill(null)
        .map(() => renderStar("true"))}
      {Array(5 - count)
        .fill(null)
        .map(() => renderStar())}
    </Wrapper>
  )
}

Stars.propTypes = {
  initialCount: number,
}

Stars.defaultProps = {
  initialCount: 0,
}

export default Stars
