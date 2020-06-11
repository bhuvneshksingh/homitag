import Icon from 'components/Common/Icon'
import styled from 'styled-components'
import React from 'react'
import { Link } from 'react-router-dom'
import { string } from 'prop-types'

const ArrowIcon = styled(Icon).attrs(props => ({
  color: props.theme.colors.homiPrimary,
  width: 10,
  height: 15,
}))``

const ButtonWrapper = styled.div`
  display: flex;
`

const StyledLink = styled(Link)`
  font-size 20px;
  font-weight: 500;
  text-decoration: none;
  color: #313334;
`

const Path = styled.h1`
  margin-left: 10px;
`

const ArrowLeft = () => (
  <div style={{ transform: 'rotate(-180deg)' }}>
    <ArrowIcon icon="arrow" />
  </div>
)

const ArrowBackButton = props => (
  <StyledLink to={props.backRoute}>
    <ButtonWrapper>
      {ArrowLeft()}
      <Path>{`${props.title}`}</Path>
    </ButtonWrapper>
  </StyledLink>
)

ArrowBackButton.propTypes = {
  title: string,
  backRoute: string
}

export default ArrowBackButton
