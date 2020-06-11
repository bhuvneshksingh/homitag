import React, {useEffect, useState} from 'react'
import { injectIntl } from 'react-intl'
import styled from 'styled-components'
import { object, func } from 'prop-types'
import { withRouter } from "react-router";
import { Field, Form as FmkForm, Formik } from 'formik'
import {  Typography } from '@material-ui/core'
import Radio from 'components/Common/Form/Radio'
import { getReasonsRefundList } from "../../api"
import { PrimaryButton } from '../../../../../../components/Common/Button'
import messages from '../../messages'
import WhiteLabel from '../../../../../../components/Suppliers/Dashboard/Orders/IssueRefund/WhiteLabel'
import WhiteTextArea from '../../../../../../components/Suppliers/Dashboard/Orders/IssueRefund/WhiteTextArea'



const IssueRefundForm = styled.div`
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
const StyledTextError = styled.p`
  font-weight: 800;
  font-size: 14px;
  color: red;
`
const refundType = [
  {
    label: 'Full Refund',
    value: 'fullRefund',
  },
  {
    label: 'Partial Refund',
    value: 'partialRefund',
  }
]

const RefundForm = ({  intl, handleRefund}) => {
  
  const [reasonsRefund, setReasonsRefund] = useState([])



  function validateInputs(values) {
    const errors = {}
    const requiredFields = ['refundAmount']
    const numberFields = ['refundAmount']

    const fieldFormat = {
      'refundAmount': "Refund Amount"
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
    
    numberFields.forEach(field => {
      
      if(values[field].match(/^-{0,1}\d+$/)){
        // valid integer (positive or negative)
      }else if(values[field].match(/^\d+\.\d+$/)){
        // valid float
      }else{
        errors[field] = `* ${fieldFormat[field]} is not a number`
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
      handleRefund(values)
      
    }
  }
  
  const getReasonsList = () => {
    getReasonsRefundList()
      .then(res => {
        // console.log(res.data.data)
        setReasonsRefund(res.data.data)
      })
      .catch(() => {
        // console.log(e)
      })
      
  }

  useEffect(() => {
    getReasonsList()
  },[])
  
  const reasonsList = []
  
  if (reasonsRefund.length > 0) {
    reasonsRefund.forEach((item)=> {
      reasonsList.push({ label: intl.formatMessage(messages[item.code]), value: item.value})
    })
  }

  const initialValues = {
    refundAmount: '',
    refundType: 'fullRefund',
    refundReason: 'unableship'
  }

  return ( 
     
    <IssueRefundForm>
      <Formik
        validate={validateInputs}
        onSubmit={values => {
          handleSubmit(values)
        }}
        initialValues={initialValues}
        render={({ values, handleChange, errors, touched}) => (
          <FmkForm>
            <WhiteLabel
              error={!!((touched.refundAmount && errors.refundAmount))}
              text="Refund Amount"
              id="refundAmount"
              name="refundAmount"
              onChange={handleChange}
              placeholder="Enter Amount"
              value={values.refundAmount}
            />
           
            <StyledTextError>{errors.refundAmount}</StyledTextError>

            <StyledSubTitleRadios> Select Refund Type</StyledSubTitleRadios>
            <StyledField
              component={Radio}
              name="refundType"
              options={refundType}
              defaultValue="fullRefund"
            />
            <StyledSubTitleRadios> Select Refund Reason</StyledSubTitleRadios>
            <StyledField
              component={Radio}
              name="refundReason"
              options={reasonsList}
              defaultValue="unableship"
            />
            <WhiteTextArea
              error={!!((touched.explanation && errors.explanation))}
              id="refundAmount"
              name="explanation"
              onChange={handleChange}
              value={values.explanation}
              placeholder="Please add an explanation if necessary"
            />
            <PrimaryButton type="submit" style={{ marginTop: '30px' }}>
            Issue Refund
            </PrimaryButton>
            
          </FmkForm>
        )}
      />
      
      
    </IssueRefundForm>


  )
}
  
RefundForm.propTypes = {
  intl: object,
  handleRefund: func
}
export default injectIntl(withRouter(RefundForm))
