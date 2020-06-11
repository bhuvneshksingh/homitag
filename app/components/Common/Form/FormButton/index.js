import React from 'react'
import PropTypes from 'prop-types'
import { PrimaryButton, OutlinePrimaryButton } from 'components/Common/Button'

const FormButton = ({ primary, children, ...props }) => {
  if (primary) return <PrimaryButton {...props}>{children}</PrimaryButton>
  return <OutlinePrimaryButton {...props}>{children}</OutlinePrimaryButton>
}

FormButton.propTypes = {
  primary: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
}

export default FormButton
