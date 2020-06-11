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
import Checkbox from 'components/Common/Form/Checkbox'
import CatalogSelect from 'components/Suppliers/Forms/Onboarding/CatalogSelect'
import { clearObject } from 'utils/helpers'
import { updateUserInfoAction } from 'containers/Suppliers/Auth/action'
import Routes from 'containers/Suppliers/Router/Routes.json'
import messages from './messages'
import {
  getOptionsService,
  updateCatalogService,
  getCategoriesService,
} from './api'

const key = 'auth'

const YourCatalog = ({ intl, userInfo, history, updateUserInfo }) => {
  useInjectReducer({ key, reducer })
  const [optionsLoading, setOptionsLoading] = useState(false)
  const [skuAveragePriceOpts, setSkuAveragePrice] = useState([
    {
      label: '<$50',
      value: '<$50',
      icon: 'dollarSign',
      iconRepeat: 1,
    },
    {
      label: '$50-$250',
      value: '$50-$250',
      icon: 'dollarSign',
      iconRepeat: 2,
    },
    {
      label: '$250-$500',
      value: '$250-$500',
      icon: 'dollarSign',
      iconRepeat: 3,
    },
    {
      label: '>$500',
      value: '>$500',
      icon: 'dollarSign',
      iconRepeat: 4,
    },
  ])
  const [skuCatalogOpts, setSkuCatalogOpts] = useState([
    {
      label: '<50 SKUs',
      value: '<50 SKUs',
      icon: 'polygon1',
      iconRepeat: 0,
    },
    {
      label: '50-250 SKUs',
      value: '50-250 SKUs',
      icon: 'polygon2',
      iconRepeat: 0,
    },
    {
      label: '>250 SKUs',
      value: '>250 SKUs',
      icon: 'polygon3',
      iconRepeat: 0,
    },
  ])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  useState(() => {
    const getOptions = () => {
      setOptionsLoading(true)
      getOptionsService()
        .then(res => {
          const { skuAveragePrice, skuCatalog } = res.data.data
          setSkuAveragePrice(
            skuAveragePrice.map((a, i) => ({
              value: a,
              label: a,
              icon: 'dollarSign',
              iconRepeat: i + 1,
            }))
          )
          setSkuCatalogOpts(
            skuCatalog.map((a, i) => ({
              value: a,
              label: a,
              icon: `polygon${i + 1}`,
              iconRepeat: 0,
            }))
          )
        })
        .catch(e => setError(e.message))
      getCategoriesService()
        .then(res => {
          const cats = res.data.data.map(c => ({
            value: c.id,
            label: c.name,
          }))
          setCategories(cats)
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
          Routes.Suppliers + Routes.Onboarding + Routes.BusinessPresence
        )
      })
      .catch(e => setError(e.response.data.result.content.message))
      .finally(() => setLoading(false))
  }
  return (
    <>
      <Loading show={optionsLoading} pageLoading transparent size={60} />;
      <AccountPagesWrapper
        currentPageTitle={intl.formatMessage(messages.yourCatalog)}
        lastPageTitle={intl.formatMessage(messages.bankingInfo)}
      >
        <Form
          formValues={{
            catalogSKUs: idx(userInfo, _ => _.UserBusiness.catalogSKUs) || '',
            catalogAveragePrice:
              idx(userInfo, _ => _.UserBusiness.catalogAveragePrice) || '',
            catalogCategories:
              idx(userInfo, _ => _.UserBusiness.catalogCategories) || [],
            catalogUsedProducts:
              idx(userInfo, _ => _.UserBusiness.catalogUsedProducts) || false,
            catalogPolicy:
              idx(userInfo, _ => _.UserBusiness.averageShcatalogPolicyipTime) ||
              false,
          }}
          validationSchema={Yup.object().shape({
            catalogSKUs: Yup.string().required(
              intl.formatMessage(messages.skuCatalogRequired)
            ),
            catalogAveragePrice: Yup.string().required(
              intl.formatMessage(messages.skuAveragePriceAvgPrice)
            ),
          })}
          inputs={[
            {
              name: 'catalogSKUs',
              component: CatalogSelect,
              labelTitle: intl.formatMessage(messages.skuCatalog),
              options: skuCatalogOpts,
            },
            {
              name: 'catalogAveragePrice',
              labelTitle: intl.formatMessage(messages.skuAveragePrice),
              component: CatalogSelect,
              options: skuAveragePriceOpts,
            },
            {
              name: 'catalogCategories',
              label: intl.formatMessage(messages.categories),
              labelTitle: intl.formatMessage(messages.yourProducts),
              component: Checkbox,
              options: categories,
            },
            {
              name: 'catalogUsedProducts',
              component: Switch,
              label: intl.formatMessage(messages.usedProducts),
              type: 'checkbox',
            },
            {
              name: 'catalogPolicy',
              component: Switch,
              label: intl.formatMessage(messages.policies),
              type: 'checkbox',
            },
          ]}
          submitButton={formIsValid => (
            <FormButton
              type="submit"
              disabled={loading}
              primary={formIsValid}
              subtitle={intl.formatMessage(messages.businessPresence)}
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

YourCatalog.propTypes = {
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
)(YourCatalog)
