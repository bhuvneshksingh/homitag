import React from 'react'
import styled from 'styled-components'
import Icon from 'components/Common/Icon'
import { string, func} from 'prop-types'

const ArrowIcon = styled(Icon).attrs(props => ({
  color: props.theme.colors.homiPrimary,
  width: 10,
  height: 15,
}))``

const ArrowLeft = () => (
  <div style={{ transform: 'rotate(-180deg)' }}>
    <ArrowIcon icon="arrow" />
  </div>
)

const ButtonWrapper = styled.div`
  display: flex;
  font-size: 20px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  color: black;
`
const Path = styled.h1`
  margin-left: 10px;
`

const BackButton = ({ title, onClick }) => (
  <ButtonWrapper onClick={onClick}>
    <ArrowLeft />
    <Path>{title}</Path>
  </ButtonWrapper>
)

BackButton.propTypes = {
  title: string,
  onClick: func.isRequired
}
export default BackButton
