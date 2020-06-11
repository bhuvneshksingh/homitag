import React from 'react'
import { bool, func, string } from 'prop-types'
import styled from 'styled-components'
import weightIconPurple from '../../../../../assets/images/icons/weightIconPurple.svg'
import weightIconWhite from '../../../../../assets/images/icons/weightIconWhite.svg'

const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 20px;
    width: 110px;
    min-width: 110px;
    height: 110px;
    min-height: 110px;
    background-color: ${props => props.selected ? '#7471FF' : '#E8E8E8'};
    border-radius: 10px;
    &:hover{
      cursor: pointer;
    }
`
const Icon = styled.img`
  margin: auto;
`
const WeightText = styled.p`
  color: ${props => props.selected ? '#E8E8E8' : '#7471FF'};
  font-size: 14px;
  margin: auto;
`
const WeightCard = props => (
  <CardContainer onClick={props.onClick} selected={props.selected}>
    <Icon src={props.selected ? weightIconWhite : weightIconPurple}/>
    <WeightText selected={props.selected}>{props.text}</WeightText>
  </CardContainer>
)

WeightCard.propTypes = {
  text: string,
  onClick: func,
  selected: bool
}

export default WeightCard
