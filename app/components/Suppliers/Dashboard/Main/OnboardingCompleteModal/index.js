import React from 'react'
import { object, bool, func } from 'prop-types'
import styled from 'styled-components'
import { injectIntl } from 'react-intl'

import ConfirmModal from 'components/Suppliers/Dashboard/Modals/ConfirmModal'
import messages from 'containers/Suppliers/Dashboard/Main/messages'

const StyledOl = styled.ol`
  list-style: none;
  counter-reset: item;
  color: ${({ theme }) => theme.colors.text};
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
  text-align: left;
  margin: 0 0 40px 0;
  li {
    counter-increment: item;
    margin-bottom: 20px;
  }
  li::before {
    content: counter(item) '.';
    font-weight: bold;
    display: inline-block;
    width: 1em;
    margin-right: 5px;
  }
`

const OnboardingCompleteModal = ({ isOpen, onClose, intl }) => (
  <ConfirmModal
    isOpen={isOpen}
    onClose={onClose}
    title={intl.formatMessage(messages.onboardingCompleted)}
    desc={intl.formatMessage(messages.onboardingCompletedDesc)}
  >
    <StyledOl>
      <li>{intl.formatMessage(messages.onboardingCompletedFirst)}</li>
      <li>{intl.formatMessage(messages.onboardingCompletedSecond)}</li>
      <li>{intl.formatMessage(messages.onboardingCompletedThird)}</li>
      <li>{intl.formatMessage(messages.onboardingCompletedFourth)}</li>
    </StyledOl>
  </ConfirmModal>
)

OnboardingCompleteModal.propTypes = {
  intl: object,
  isOpen: bool,
  onClose: func,
}

export default injectIntl(OnboardingCompleteModal)
