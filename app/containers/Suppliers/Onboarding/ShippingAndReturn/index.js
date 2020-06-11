import React, { useState, memo } from 'react'
import { object, func } from 'prop-types'
import { injectIntl } from 'react-intl'
import * as Yup from 'yup'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'
import idx from 'idx'

import { useInjectReducer } from 'utils/injectReducer'
import reducer from 'containers/Suppliers/Auth/reducer'
import { makeSelectUserInfo } from 'containers/Suppliers/Auth/selectors'
import AccountPagesWrapper from 'components/Suppliers/Wrappers/AccountPagesWrapper'
import Form from 'components/Suppliers/Forms/OnboardingForm'
import FormButton from 'components/Common/Form/FormButton'
import Radio from 'components/Common/Form/Radio'
import CheckboxGroup from 'components/Common/Form/Checkbox'
import Loading from 'components/Common/Loading'
import Input from 'components/Common/Form/Input'
import { clearObject } from 'utils/helpers'
import Routes from 'containers/Suppliers/Router/Routes.json'
import { updateUserInfoAction } from 'containers/Suppliers/Auth/action'
import messages from './messages'
import { getOptionsService, updateShippingService } from './api'

const key = 'auth'

const ShippingAndReturn = ({ intl, userInfo, history, updateUserInfo }) => {
  useInjectReducer({ key, reducer })
  const [optionsLoading, setOptionsLoading] = useState(false)
  const [avgShipTimeOpts, setAvgShipTimeOpts] = useState([
    {
      label: intl.formatMessage(messages.moreThan5Days),
      value: '+5',
    },
    {
      label: intl.formatMessage(messages.lessThan5Days),
      value: '-5',
    },
  ])
  const [carriersOpts, setCarriersOpts] = useState([
    {
      label: 'DHL',
      value: 'DHL',
    },
    {
      label: 'Freight',
      value: 'Freight',
    },
    {
      label: 'FBA',
      value: 'FBA',
    },
    {
      label: 'UPS',
      value: 'UPS',
    },
    {
      label: 'FedEx',
      value: 'FedEx',
    },
    {
      label: 'USPS',
      value: 'USPS',
    },
  ])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const returnPolicyOpts = [
    {
      label: intl.formatMessage(messages.freeReturns),
      value: 'Free Returns',
    },
    {
      label: intl.formatMessage(messages.buyerPays),
      value: 'Buyer Pays for Returns',
    },
    {
      label: intl.formatMessage(messages.other),
      value: 'Other',
    },
  ]
  useState(() => {
    const getOptions = () => {
      setOptionsLoading(true)
      getOptionsService()
        .then(res => {
          const { averageShipTime, carriers } = res.data.data
          setAvgShipTimeOpts(averageShipTime.map(a => ({ value: a, label: a })))
          setCarriersOpts(carriers.map(a => ({ value: a, label: a })))
        })
        .catch(e => setError(e.message))
        .finally(() => setOptionsLoading(false))
    }
    getOptions()
  })
  const submitForm = data => {
    setLoading(true)
    updateShippingService(userInfo.UserBusiness.id, clearObject(data))
      .then(() => {
        updateUserInfo({ UserBusiness: { ...userInfo.UserBusiness, ...data } })
        history.push(
          Routes.Suppliers + Routes.Onboarding + Routes.SellerAgreement
        )
      })
      .catch(e => setError(e.response.data.result.content.message))
      .finally(() => setLoading(false))
  }
  return (
    <>
      <Loading show={optionsLoading} pageLoading transparent size={60} />;
      <AccountPagesWrapper
        currentPageTitle={intl.formatMessage(messages.shippingAndReturns)}
        lastPageTitle={intl.formatMessage(messages.businessPresence)}
      >
        <Form
          formValues={{
            averageShipTime:
              idx(userInfo, _ => _.UserBusiness.averageShipTime) || '',
            carriers: idx(userInfo, _ => _.UserBusiness.carriers) || [],
            dropShippers:
              idx(userInfo, _ => _.UserBusiness.dropShippers) || '0',
            returnPolicy: idx(userInfo, _ => _.UserBusiness.returnPolicy) || '',
          }}
          validationSchema={Yup.object().shape({
            averageShipTime: Yup.string().required(
              intl.formatMessage(messages.avgShipTimeRequired)
            ),
            carriers: Yup.string().required(
              intl.formatMessage(messages.carriersRequired)
            ),
            dropShippers: Yup.string().required(
              intl.formatMessage(messages.dropShippersRequired)
            ),
          })}
          inputs={[
            {
              name: 'averageShipTime',
              label: intl.formatMessage(messages.avgShipTime),
              component: Radio,
              labelTitle: intl.formatMessage(messages.shipping),
              options: avgShipTimeOpts,
            },
            {
              name: 'carriers',
              label: intl.formatMessage(messages.carriers),
              component: CheckboxGroup,
              options: carriersOpts,
            },
            {
              name: 'dropShippers',
              label: intl.formatMessage(messages.dropShippers),
              component: Input,
              type: 'number',
              inline: true,
            },
            {
              name: 'returnPolicy',
              label: intl.formatMessage(messages.returnPolicy),
              component: Radio,
              labelTitle: intl.formatMessage(messages.returns),
              options: returnPolicyOpts,
            },
          ]}
          submitButton={formIsValid => (
            <FormButton
              type="submit"
              disabled={loading}
              primary={formIsValid}
              subtitle={intl.formatMessage(messages.sellerAgreement)}
            >
              {intl.formatMessage(messages.next)}
            </FormButton>
          )}
          onSubmit={submitForm}
          loading={loading}
          submitError={error}
        />
      </AccountPagesWrapper>
    </>
  )
}

ShippingAndReturn.propTypes = {
  intl: object,
  userInfo: object,
  history: object,
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
  withConnect,
  injectIntl,
  memo
)(ShippingAndReturn)
