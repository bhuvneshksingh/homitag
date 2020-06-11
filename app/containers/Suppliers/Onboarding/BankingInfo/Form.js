import React, { useState, memo } from 'react'
import { object, func } from 'prop-types'
import { injectIntl } from 'react-intl'
import { injectStripe } from 'react-stripe-elements'
import * as Yup from 'yup'
import history from 'utils/history'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'
import idx from 'idx'

import { useInjectReducer } from 'utils/injectReducer'
import reducer from 'containers/Suppliers/Auth/reducer'
import { makeSelectUserInfo } from 'containers/Suppliers/Auth/selectors'
import Form from 'components/Suppliers/Forms/OnboardingForm'
import Input from 'components/Common/Form/Input'
import FormButton from 'components/Common/Form/FormButton'
import { yupEqualTo, clearObject } from 'utils/helpers'
import Select from 'components/Common/Form/Select'
import { updateUserInfoAction } from 'containers/Suppliers/Auth/action'
import Routes from 'containers/Suppliers/Router/Routes.json'
import messages from './messages'
import {
  createBankAccountService,
  createStripeAccountService,
  updateUserService,
  updateStripeAccountService,
  updateBankAccountService,
} from './api'

Yup.addMethod(Yup.string, 'equalTo', yupEqualTo)
const key = 'auth'

export const BankingInfoForm = ({
  intl,
  stripe,
  userInfo,
  updateUserInfo,
  accountInfo,
}) => {
  useInjectReducer({ key, reducer })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const editMode =
    idx(userInfo, _ => _.UserBusiness.bankingInfo.bankAccountNumber) &&
    idx(userInfo, _ => _.UserBusiness.bankingInfo.routingNumber)
  const exAccounts = idx(accountInfo, _ => _.stripeData.external_accounts.data)
  const exAccount =
    exAccounts &&
    exAccounts.find(
      a =>
        a.routing_number ===
        idx(userInfo, _ => _.UserBusiness.bankingInfo.routingNumber)
    )
  const createAccount = values => {
    const data = {
      ...values,
      country: 'US',
      currency: 'usd',
    }
    const accountBody = {
      userId: userInfo.id,
      email: userInfo.email,
      business_type: values.account_holder_type,
      default_currency: 'usd',
      country: 'US',
      individual: {
        first_name: userInfo.firstName,
        last_name: userInfo.lastName,
        phone: userInfo.phonenumber,
      },
      company: {
        tax_id: userInfo.UserBusiness.businessInfo.taxId,
      },
    }
    if (values.account_holder_type === 'individual') delete accountBody.company
    else delete accountBody.individual
    setLoading(true)
    stripe
      .createToken('bank_account', data)
      .then(async stripeRes => {
        if (stripeRes.error) setError(stripeRes.error.message)
        else {
          await createStripeAccountService(accountBody)
            .then(async () => {
              const body = {
                external_account: stripeRes.token.id,
              }
              await createBankAccountService(userInfo.id, body)
                .then(async () => {
                  const temp = {
                    bankingInfo: {
                      bankAccountNumber: values.account_number,
                      routingNumber: values.routing_number,
                    },
                  }
                  await updateUserService(
                    userInfo.UserBusiness.id,
                    clearObject(temp)
                  )
                    .then(() => {
                      updateUserInfo({
                        UserBusiness: { ...userInfo.UserBusiness, ...temp },
                      })
                      history.push(
                        Routes.Suppliers +
                          Routes.Onboarding +
                          Routes.YourCatalog
                      )
                    })
                    .catch(e => setError(e.response.data.message))
                })
                .catch(e => setError(e.response.data.message))
            })
            .catch(e =>
              setError(e.response.data.error.message || e.response.data.error)
            )
        }
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }
  const updateAccount = values => {
    const accountBody = {
      accountData: {
        business_type: values.account_holder_type,
        individual: {
          first_name: userInfo.firstName,
          last_name: userInfo.lastName,
          phone: userInfo.phonenumber,
        },
        company: {
          tax_id: userInfo.UserBusiness.businessInfo.taxId,
        },
      },
    }
    if (values.account_holder_type === 'individual')
      delete accountBody.accountData.company
    else delete accountBody.accountData.individual
    setLoading(true)
    updateStripeAccountService(userInfo.id, accountBody)
      .then(async () => {
        const data = {
          account_holder_name: values.account_holder_name,
          account_holder_type: values.account_holder_type,
          default_for_currency: true,
        }
        await updateBankAccountService(
          userInfo.id,
          idx(exAccount, _ => _.id),
          data
        )
          .then(async () => {
            history.push(
              Routes.Suppliers + Routes.Onboarding + Routes.YourCatalog
            )
          })
          .catch(e => setError(e.response.data.message))
      })
      .catch(e =>
        setError(e.response.data.error.message || e.response.data.error)
      )
  }
  const handleSubmit = values =>
    editMode ? updateAccount(values) : createAccount(values)
  return (
    <Form
      formValues={{
        account_holder_name: idx(exAccount, _ => _.account_holder_name) || '',
        account_holder_type:
          idx(exAccount, _ => _.account_holder_type) || 'individual',
        account_number:
          idx(userInfo, _ => _.UserBusiness.bankingInfo.bankAccountNumber) ||
          '',
        account_number_confirm:
          idx(userInfo, _ => _.UserBusiness.bankingInfo.bankAccountNumber) ||
          '',
        routing_number:
          idx(userInfo, _ => _.UserBusiness.bankingInfo.routingNumber) || '',
      }}
      validationSchema={Yup.object().shape({
        account_holder_name: Yup.string().required(
          intl.formatMessage(messages.accountHolderNameRequired)
        ),
        account_holder_type: Yup.string().required(
          intl.formatMessage(messages.accountHolderTypeRequired)
        ),
        account_number: Yup.string()
          .length(12, intl.formatMessage(messages.bankAccountCharCount))
          .matches(/^[\d]*$/, intl.formatMessage(messages.bankAccountInvalid))
          .required(intl.formatMessage(messages.bankAccountRequried)),
        account_number_confirm: Yup.string()
          .equalTo(
            Yup.ref('account_number'),
            intl.formatMessage(messages.bankAccountsNotMatch)
          )
          .required(intl.formatMessage(messages.bankAccountConfirmRequried)),
        routing_number: Yup.string()
          .length(9, intl.formatMessage(messages.rotingNumberCharCount))
          .matches(/^[\d]*$/, intl.formatMessage(messages.rotingNumberInvalid))
          .required(intl.formatMessage(messages.rotingNumberRequired)),
      })}
      inputs={[
        {
          name: 'account_holder_name',
          label: intl.formatMessage(messages.accountHolderName),
          component: Input,
          type: 'text',
        },
        {
          name: 'account_holder_type',
          label: intl.formatMessage(messages.accountHolderType),
          component: Select,
          options: [
            {
              value: 'individual',
              title: intl.formatMessage(messages.accountHolderTypeIndividual),
            },
            {
              value: 'company',
              title: intl.formatMessage(messages.accountHolderTypeCompany),
            },
          ],
        },
        {
          name: 'account_number',
          label: intl.formatMessage(messages.bankAccountNumber),
          component: Input,
          type: 'text',
          maxLength: 12,
          readOnly: editMode,
        },
        {
          name: 'account_number_confirm',
          label: intl.formatMessage(messages.confirmAccountNumber),
          component: Input,
          type: 'text',
          maxLength: 12,
          readOnly: editMode,
        },
        {
          name: 'routing_number',
          label: intl.formatMessage(messages.routingNumber),
          component: Input,
          type: 'text',
          maxLength: 9,
          readOnly: editMode,
        },
      ]}
      submitButton={formIsValid => (
        <FormButton
          type="submit"
          disabled={loading}
          primary={formIsValid}
          subtitle={intl.formatMessage(messages.yourCatalog)}
        >
          {intl.formatMessage(messages.next)}
        </FormButton>
      )}
      onSubmit={handleSubmit}
      loading={loading}
      submitError={error}
    />
  )
}

BankingInfoForm.propTypes = {
  intl: object,
  stripe: object,
  userInfo: object,
  accountInfo: object,
  updateUserInfo: func,
}

const mapStateToProps = createStructuredSelector({
  userInfo: makeSelectUserInfo(),
})

function mapDispatchToProps(dispatch) {
  return {
    updateUserInfo: payload => dispatch(updateUserInfoAction(payload)),
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)
export default compose(
  injectStripe,
  withConnect,
  injectIntl,
  memo
)(BankingInfoForm)
