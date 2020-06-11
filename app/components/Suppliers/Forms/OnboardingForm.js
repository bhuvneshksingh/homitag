import React from 'react'
import PropTypes from 'prop-types'
import { Field, Form as FmkForm, Formik } from 'formik'
import styled from 'styled-components'

const StyledSubmitError = styled.div`
  color: ${({ theme }) => theme.colors.homiCompTwo};
  font-size: 15px;
  margin: 10px 0;
  font-weight: normal;
  text-align: center;
`

const StyledSubmitSuccess = styled(StyledSubmitError)`
  && {
    color: ${({ theme }) => theme.colors.homiCompOne};
  }
`

const Form = ({
  formValues,
  validationSchema,
  inputs,
  submitButton,
  onSubmit,
  // loading,
  submitError,
  submitSuccess,
  wrapper,
}) => {
  const renderForm = () =>
    inputs.map(fi => <Field name={fi.name} key={fi.name} {...fi} />)
  return (
    <Formik
      validateOnMount
      initialValues={formValues}
      onSubmit={values => {
        onSubmit(values)
      }}
      validationSchema={validationSchema}
      render={({ isValid }) => (
        <FmkForm>
          {wrapper ? wrapper(renderForm()) : renderForm()}
          <StyledSubmitError>{submitError}</StyledSubmitError>
          <StyledSubmitSuccess>{submitSuccess}</StyledSubmitSuccess>
          {submitButton(isValid)}
        </FmkForm>
      )}
    />
  )
}

Form.propTypes = {
  formValues: PropTypes.object,
  validationSchema: PropTypes.object,
  inputs: PropTypes.array,
  submitButton: PropTypes.func,
  wrapper: PropTypes.func,
  onSubmit: PropTypes.func,
  // loading: PropTypes.bool,
  submitError: PropTypes.string,
  submitSuccess: PropTypes.string,
}

Form.defaultProps = {
  wrapper: null,
}

export default Form
