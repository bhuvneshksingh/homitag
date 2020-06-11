import React from 'react'
import { injectIntl } from 'react-intl'
import styled from 'styled-components'
import Icon from 'components/Common/Icon'
import { object, func } from 'prop-types'
import { withRouter } from "react-router";
import Grid from '@material-ui/core/Grid';
import { PrimaryButton } from '../../../../../components/Common/Button'
import cloud from '../../../../../assets/images/icons/cloud.svg'
import packingslip from '../../../../../assets/images/icons/packingslip.svg'
import toiletpapper from '../../../../../assets/images/icons/toiletPapper.svg'

const StyledIcon = styled(Icon).attrs(props => ({
  color: props.theme.colors.homiPrimary,
  width: 53,
  height: 55,
}))``


const StyledSubTitle = styled.div`
  text-align: left;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 25px;
`


const StyledText = styled.div`
  font-weight: 600;
  margin-bottom: 20px;
  color: white;
  font-size: 16px;
`


const StyledIcon2 = styled.img`
  height: 53px
`



const FullfillSteps = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
`
const StyledStepText = styled(StyledText)`
  color: ${({ theme }) => theme.colors.homiBlack};
  font-weight: normal;
`

const StyledPackingTipsOptionText = styled(StyledText)`
color: #969696;
padding: 0px 20px;
font-size: 14px;
font-weight: bold;
`


const PackingTipOption = styled(StyledText)`
  color:  #969696;
  font-weight: normal;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.05);
  text-align: center;
  min-height: 290px
`
const PackingStyledIcon = styled.div`
margin: 20px 0px;
`

const PackingTipTitle = styled(StyledText)`
background-color: #7471ff;
color: #FFF;
padding: 20px;
text-align: center;
`

const StyledPrimaryButton = styled(PrimaryButton)`
  color: #7471ff;
  /* opacity: 0.5; */
  background: white;
  border: 1px solid #7471ff;

`


const InitialStep = ({  handleNextStep, buttonNext}) => {
  
  const handleValidation = () => {
    handleNextStep(1)
  }
  
  const  buttonShow = () => (<StyledPrimaryButton subtitle={buttonNext.label} onClick={() => handleValidation()}> Next</StyledPrimaryButton>)

  return ( 
     
    <FullfillSteps>
      <StyledSubTitle>Packing Tips</StyledSubTitle>
      <StyledStepText>Please consider these packing tips to ensure the shipping process goes as smoothly as possible</StyledStepText>
      <Grid container spacing={3}>
        <Grid item xs={6}> 
          <PackingTipOption>
            <PackingTipTitle>Tip 1</PackingTipTitle>
            <PackingStyledIcon><StyledIcon icon="fullfillBox" /></PackingStyledIcon>
            <StyledPackingTipsOptionText>Make sure your box matches the size and weight of your item. If reusing a box, be sure to cover any old shipping labels.</StyledPackingTipsOptionText>
          </PackingTipOption>
        </Grid>
        <Grid item xs={6}> 
          <PackingTipOption>
            <PackingTipTitle>Tip 2</PackingTipTitle>
            <PackingStyledIcon> <StyledIcon2 src={cloud} alt=''/></PackingStyledIcon>
            <StyledPackingTipsOptionText>Add cushioning to support your item. Packing peanuts and newspapers works great for this.</StyledPackingTipsOptionText>
          </PackingTipOption>
        </Grid>
        <Grid item xs={6}> 
          <PackingTipOption>
            <PackingTipTitle>Tip 3</PackingTipTitle>
            <PackingStyledIcon> <StyledIcon2 src={packingslip} alt=''/></PackingStyledIcon>
            <StyledPackingTipsOptionText>Make sure to firmly place the shipping label on the box’s largest side. Add a packing pouch for extra security.</StyledPackingTipsOptionText>
          </PackingTipOption>
        </Grid>
        <Grid item xs={6}> 
          <PackingTipOption>
            <PackingTipTitle>Tip 4</PackingTipTitle>
            <PackingStyledIcon> <StyledIcon2 src={toiletpapper} alt=''/></PackingStyledIcon>
            <StyledPackingTipsOptionText>Be sure to apply at least 3 strips of packing tape across all flaps and seams.</StyledPackingTipsOptionText>
          </PackingTipOption>
        </Grid>
      </Grid>
      {buttonShow()}
    </FullfillSteps>


  )
}
  
InitialStep.propTypes = {
  handleNextStep: func,
  buttonNext: object
}
export default injectIntl(withRouter(InitialStep))
