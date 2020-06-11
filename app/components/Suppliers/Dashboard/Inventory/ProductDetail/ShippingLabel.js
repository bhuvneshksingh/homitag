import React from 'react'
import { string, number, bool } from 'prop-types'
import styled from 'styled-components'
import { Button } from '@material-ui/core'
import Icon from 'components/Common/Icon'

const ShippingLabelWrapper = styled.div`
  width: 165px;
`

const StyledText = styled.div`
  font-weight: 600;
  margin-bottom: 5px;
  color: white;
  font-size: 16px;
`
const StyledItemButton = styled(Button)`
  && {
    display: flex;
    justify-content: space-between;
    background: ${({ theme }) => theme.colors.homiPrimary};
    width: 165px;
    border-radius: 6px;
    color: ${({ theme }) => theme.colors.homiWhite};
    font-weight: 600;
    font-size: 14px;
    line-height: 15px;
    height: 40px;
  }
`

const ArrowIcon = styled(Icon).attrs(props => ({
  color: props.theme.colors.homiWhite
}))``

const ArrowRight = () => (
  <div style={{ marginTop: '3px' }}>
    <ArrowIcon icon="arrow" />
  </div>
)

const ShippingLabel = props => (
  <ShippingLabelWrapper>
    <StyledText>{props.text}</StyledText>
    <StyledItemButton>
      {`$ ${Number(props.shippingCost).toFixed(2)}`}{ !props.notLink && <ArrowRight />}
    </StyledItemButton>
  </ShippingLabelWrapper>
)

ShippingLabel.propTypes = {
  text: string,
  shippingCost: number,
  notLink: bool
}
export default ShippingLabel
