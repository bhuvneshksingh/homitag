import React, { Fragment } from 'react'
import { injectIntl } from 'react-intl'
import styled from 'styled-components'
import { PrimaryButton } from '../../../../components/Common/Button'
import SearchBox from '../../../../components/Suppliers/Dashboard/Help/SearchBox'
import TopicCard from '../../../../components/Suppliers/Dashboard/Help/TopicCard'


const HelpHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 20px;
  margin-bottom: 20px;
`
const StyledTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin: auto; 
`

const ContactButton = styled(PrimaryButton)`
  width: 270px;
  font-weight: 600;
`

const TopicContainer = styled.div`
  margin-top: 40px;
  margin-left: 20px;
  display: grid;
  grid-gap: 40px;
  grid-template-columns: repeat(3, 33%);
  grid-template-rows: repeat(2, 50%);
`

const Help = () => (
  <Fragment>
    <HelpHeader>
      <StyledTitle>Popular Help Topics</StyledTitle>
      <ContactButton type='button'>Contact Homitag Support</ContactButton>
    </HelpHeader>
    <SearchBox />
    <TopicContainer>
      <TopicCard topicName='Topic Name'/>
      <TopicCard topicName='Topic Name'/>
      <TopicCard topicName='Topic Name'/>
      <TopicCard topicName='Topic Name'/>
      <TopicCard topicName='Topic Name'/>
      <TopicCard topicName='Topic Name'/>
    </TopicContainer>
  </Fragment>
)


export default injectIntl(Help)
