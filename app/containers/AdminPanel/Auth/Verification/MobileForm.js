import React, { useState } from 'react';
import styled from 'styled-components';
import { object, string, func } from 'prop-types';
import { injectIntl } from 'react-intl';
import * as Yup from 'yup';

import Input from 'components/Common/Form/Input';
import FormButton from 'components/Common/Form/FormButton';
import Form from 'components/Suppliers/Forms/OnboardingForm';
import { phoneNumberValidation } from 'utils/helpers';
import messages from './messages';
import { sendCodeService } from './api';

const PhoneNumberStartAdornment = styled.div`
  padding-right: 10px;
`;

const MobileForm = ({ intl, userId, hideMobileForm }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const handleSubmit = values => {
    setLoading(true);
    const { phonenumber } = values;
    sendCodeService(userId, 'phonenumber', { phonenumber: `+1${phonenumber.replace(/[^\d]/g, '')}` })
      .then(() => {
        hideMobileForm(intl.formatMessage(messages.mobileFormDone, { phonenumber }));
      })
      .catch(e => setError(e.response.data.result.content.message))
      .finally(() => setLoading(false));
  };
  return (
    <Form
      formValues={{
        phonenumber: '',
      }}
      validationSchema={Yup.object().shape({
        phonenumber: phoneNumberValidation(
          intl.formatMessage(messages.phoneNumberInvalid),
          intl.formatMessage(messages.phoneNumberRequired),
        ),
      })}
      inputs={[
        {
          name: 'phonenumber',
          component: Input,
          type: 'text',
          label: intl.formatMessage(messages.phoneNumber),
          startAdornment: <PhoneNumberStartAdornment>+1</PhoneNumberStartAdornment>,
          mask: '(999) 999-9999',
        },
      ]}
      submitButton={formIsValid => (
        <FormButton type="submit" disabled={loading} primary={formIsValid}>
          {intl.formatMessage(messages.next)}
        </FormButton>
      )}
      onSubmit={handleSubmit}
      loading={loading}
      submitError={error}
    />
  );
};

MobileForm.propTypes = {
  intl: object,
  userId: string,
  hideMobileForm: func,
};

export default injectIntl(MobileForm);
