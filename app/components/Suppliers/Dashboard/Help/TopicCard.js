import React from 'react'
import styled from 'styled-components'
import { string} from 'prop-types'
import helpTopic from '../../../../assets/images/icons/helpTopic.png'

const TopicCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 190px;
  border: 1px solid #96969661;
  box-sizing: border-box;
  border-radius: 4px;
  &:hover{
    background: #9696961f;
    cursor: pointer;
  }
`
const TopicIcon = styled.img`
  margin: auto;
`
const TopicTitle = styled.p`
  font-weight: 600;
  margin: auto;
  margin-top: 0;
`
const TopicCard = props => (
  <TopicCardContainer>
    <TopicIcon src={helpTopic}/>
    <TopicTitle>{props.topicName}</TopicTitle>
  </TopicCardContainer>
)

TopicCard.propTypes = {
  topicName: string
}
export default TopicCard



