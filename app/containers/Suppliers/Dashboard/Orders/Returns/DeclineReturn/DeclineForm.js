import React, {useEffect, useState} from 'react'
import { injectIntl } from 'react-intl'
import styled from 'styled-components'
import { object, func } from 'prop-types'
import { withRouter } from "react-router";
import { Field, Form as FmkForm, Formik } from 'formik'
import {  Typography } from '@material-ui/core'
import Radio from 'components/Common/Form/Radio'
import { getReasonsDeclineList } from "../../api"
import { PrimaryButton } from '../../../../../../components/Common/Button'
import messages from '../../messages'
import WhiteTextArea from '../../../../../../components/Suppliers/Dashboard/Orders/IssueRefund/WhiteTextArea'



const DeclineReturnForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
`

const StyledField = styled(Field)`
  && div {
    color: red!important;
  }
  && .MuiRadio-root{
    padding: 0px;
    margin-right: 10px;
    margin-left: 10px;
    text-transform: none;
  }
  && .MuiFormControlLabel-root{
    display: block;
  }
  && .MuiTypography-body1{
    line-height: 40px;
  }
  && span{
    vertical-align: baseline-middle;
    vertical-align: -webkit-baseline-middle;
  }
`

const StyledSubTitleRadios = styled(Typography)`
  && {
    font-weight: bold;
    font-size: 16px;
    line-height: 20px;
    color: ${({ theme }) => theme.colors.homiBlack};
    margin: 20px 0px 0px 0px;
  }
`

const StyledSubTitle= styled(Typography)`
  && {
    font-weight: normal;
    font-size: 16px;
    line-height: 20px;
    color: ${({ theme }) => theme.colors.homiBlack};
    margin: 20px 0px 0px 0px;
  }
`
const StyledTextError = styled.p`
  font-weight: 800;
  font-size: 14px;
  color: red;
`

const RefundForm = ({  intl, handleDecline}) => {
  
  const [reasonsDecline, setReasonsDecline] = useState([])



  function validateInputs(values) {
    const errors = {}
    const requiredFields = ['comment']

    const fieldFormat = {
      'comment': "Comment"
    }
    requiredFields.forEach(field => {
      if (
        values[field] === undefined ||
        values[field] === null ||
        values[field] === ''
      ) {
        errors[field] = `* ${fieldFormat[field]} is required`
      }
    })
    
    return errors
  }


  const handleValidation = (values) => {
    if (Object.keys(validateInputs(values)).length === 0) {return true }  
    return false
  }

  const handleSubmit = (values) => {
    if (handleValidation(values)) {
      handleDecline(values)
      
    }
  }
  
  const getReasonsList = () => {
    getReasonsDeclineList()
      .then(res => {
        // console.log(res.data.data)
        setReasonsDecline(res.data.data)
      })
      .catch(() => {
        // console.log(e)
      })
      
  }

  useEffect(() => {
    getReasonsList()
  },[])
  
  const reasonsList = []
  
  if (reasonsDecline.length > 0) {
    reasonsDecline.forEach((item)=> {
      reasonsList.push({ label: intl.formatMessage(messages[item.code]), value: item.value})
    })
  }

  const initialValues = {
    refundAmount: '',
    refundType: 'fullRefund',
    refundReason: 'returneditemnoreceived'
  }

  return ( 
     
    <DeclineReturnForm>
      <Formik
        validate={validateInputs}
        onSubmit={values => {
          handleSubmit(values)
        }}
        initialValues={initialValues}
        render={({ values, handleChange, errors, touched}) => (
          <FmkForm>

            <StyledSubTitleRadios> Reason for Declining</StyledSubTitleRadios>

            <StyledSubTitle> Please select a reason for declining this return</StyledSubTitle>
            <StyledField
              component={Radio}
              name="refundReason"
              options={reasonsList}
              defaultValue="returneditemnoreceived"
            />
            <WhiteTextArea
              error={!!((touched.explanation && errors.explanation))}
              id="comment"
              name="comment"
              onChange={handleChange}
              value={values.explanation}
              placeholder="Add a comment here"
            />
            <StyledTextError>{errors.comment}</StyledTextError>
            <PrimaryButton type="submit" style={{ marginTop: '30px' }}>
            Decline Return
            </PrimaryButton>
            
          </FmkForm>
        )}
      />
      
      
    </DeclineReturnForm>


  )
}
  
RefundForm.propTypes = {
  intl: object,
  handleDecline: func
}
export default injectIntl(withRouter(RefundForm))
