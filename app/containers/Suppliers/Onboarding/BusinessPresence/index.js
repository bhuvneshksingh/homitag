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
import Loading from 'components/Common/Loading'
import Switch from 'components/Common/Form/Switch'
import Input from 'components/Common/Form/Input'
import Checkbox from 'components/Common/Form/Checkbox'
import { clearObject } from 'utils/helpers'
import Routes from 'containers/Suppliers/Router/Routes.json'
import { updateUserInfoAction } from 'containers/Suppliers/Auth/action'
import messages from './messages'
import { updateCatalogService, getMarketplacesService } from './api'

const key = 'auth'

const BusinessPresence = ({ intl, userInfo, history, updateUserInfo }) => {
  useInjectReducer({ key, reducer })
  const [optionsLoading, setOptionsLoading] = useState(false)
  const [marketplaces, setMarketplaces] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  useState(() => {
    const getOptions = () => {
      setOptionsLoading(true)
      getMarketplacesService()
        .then(res => {
          const temp = res.data.data.marketPlaces.map(m => ({
            value: m,
            label: m,
          }))
          setMarketplaces(temp)
        })
        .catch(e => setError(e.message))
        .finally(() => setOptionsLoading(false))
    }
    getOptions()
  })
  const submitForm = data => {
    setLoading(true)
    updateCatalogService(userInfo.UserBusiness.id, clearObject(data))
      .then(() => {
        updateUserInfo({ UserBusiness: { ...userInfo.UserBusiness, ...data } })
        history.push(
          Routes.Suppliers + Routes.Onboarding + Routes.ShippingAndReturn
        )
      })
      .catch(e => setError(e.response.data.result.content.message))
      .finally(() => setLoading(false))
  }
  return (
    <>
      <Loading show={optionsLoading} pageLoading transparent size={60} />;
      <AccountPagesWrapper
        currentPageTitle={intl.formatMessage(messages.businessPresence)}
        lastPageTitle={intl.formatMessage(messages.yourCatalog)}
      >
        <Form
          formValues={{
            webURL: idx(userInfo, _ => _.UserBusiness.webURL) || '',
            marketPlace: idx(userInfo, _ => _.UserBusiness.marketPlace) || [],
            otherMarketPlace:
              idx(userInfo, _ => _.UserBusiness.otherMarketPlace) || '',
            ownerInventory:
              idx(userInfo, _ => _.UserBusiness.ownerInventory) || false,
            physicalShop:
              idx(userInfo, _ => _.UserBusiness.physicalShop) || false,
          }}
          validationSchema={Yup.object().shape({
            webURL: Yup.string().url(
              intl.formatMessage(messages.webURLNotValid)
            ),
            marketPlace: Yup.string(),
            otherMarketPlace: Yup.string(),
            ownerInventory: Yup.bool(),
            physicalShop: Yup.string().required(),
          })}
          inputs={[
            {
              name: 'webURL',
              component: Input,
              labelTitle: intl.formatMessage(messages.onlinePresence),
              label: intl.formatMessage(messages.websiteURL),
              type: 'text',
            },
            {
              name: 'marketPlace',
              label: intl.formatMessage(messages.marketplaces),
              component: Checkbox,
              options: marketplaces,
            },
            {
              name: 'otherMarketPlace',
              component: Input,
              placeholder: intl.formatMessage(messages.otherMarketplaces),
              type: 'text',
            },
            {
              name: 'ownerInventory',
              component: Switch,
              label: intl.formatMessage(messages.invertory),
              labelTitle: intl.formatMessage(messages.otherInformation),
              type: 'checkbox',
            },
            {
              name: 'physicalShop',
              component: Switch,
              label: intl.formatMessage(messages.physicalRetail),
              type: 'checkbox',
            },
          ]}
          submitButton={formIsValid => (
            <FormButton
              type="submit"
              disabled={loading}
              primary={formIsValid}
              subtitle={intl.formatMessage(messages.shippingAndReturns)}
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

BusinessPresence.propTypes = {
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
)(BusinessPresence)
