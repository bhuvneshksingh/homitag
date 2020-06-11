import React, { memo, useState } from 'react'
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
import Input from 'components/Common/Form/Input'
import Switch from 'components/Common/Form/Switch'
import Select from 'components/Common/Form/Select'
import Routes from 'containers/Suppliers/Router/Routes.json'
import { clearObject } from 'utils/helpers'
import { updateUserInfoAction } from 'containers/Suppliers/Auth/action'
import messages from './messages'
import { yourBusinessService, yourBusinessUpdateService } from './api'

const key = 'auth'

const YourBusiness = ({ intl, userInfo, history, updateUserInfo }) => {
  useInjectReducer({ key, reducer })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const editMode = !!idx(userInfo, _ => _.UserBusiness.businessInfo.taxId)
  const submitForm = values => {
    const {
      businessName,
      businessStreetAddress,
      businessCity,
      businessState,
      businessZipCode,
      businessStructure,
      sellerType,
      taxId,
      annualOnlineRevenue,
      authorizedReseller,
    } = values
    const data = {
      businessName,
      businessAddress: {
        businessStreetAddress,
        businessCity,
        businessState,
        businessZipCode,
      },
      businessInfo: {
        businessStructure,
        sellerType,
        taxId,
        annualOnlineRevenue,
      },
      authorizedReseller,
    }
    setLoading(true)
    const service = () =>
      editMode
        ? yourBusinessUpdateService(userInfo.UserBusiness.id, clearObject(data))
        : yourBusinessService(userInfo.id, clearObject(data))
    service()
      .then(() => {
        updateUserInfo({ UserBusiness: { ...userInfo.UserBusiness, ...data } })
        history.push(Routes.Suppliers + Routes.Onboarding + Routes.BankingInfo)
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }
  return (
    <AccountPagesWrapper
      currentPageTitle={intl.formatMessage(messages.yourBusiness)}
      lastPageTitle={intl.formatMessage(messages.aboutYou)}
    >
      <Form
        formValues={{
          businessName: idx(userInfo, _ => _.UserBusiness.businessName) || '',
          businessStreetAddress:
            idx(
              userInfo,
              _ => _.UserBusiness.businessAddress.businessStreetAddress
            ) || '',
          businessCity:
            idx(userInfo, _ => _.UserBusiness.businessAddress.businessCity) ||
            '',
          businessState:
            idx(userInfo, _ => _.UserBusiness.businessAddress.businessState) ||
            '',
          businessZipCode:
            idx(
              userInfo,
              _ => _.UserBusiness.businessAddress.businessZipCode
            ) || '',
          businessStructure:
            idx(userInfo, _ => _.UserBusiness.businessInfo.businessStructure) ||
            '',
          sellerType:
            idx(userInfo, _ => _.UserBusiness.businessInfo.sellerType) || '',
          taxId: idx(userInfo, _ => _.UserBusiness.businessInfo.taxId) || '',
          annualOnlineRevenue:
            idx(
              userInfo,
              _ => _.UserBusiness.businessInfo.annualOnlineRevenue
            ) || '',
          authorizedReseller:
            idx(userInfo, _ => _.UserBusiness.authorizedReseller) || false,
        }}
        validationSchema={Yup.object().shape({
          businessName: Yup.string().required(
            intl.formatMessage(messages.businessNameRequired)
          ),
          businessStreetAddress: Yup.string(),
          businessCity: Yup.string(),
          businessState: Yup.string(),
          businessZipCode: Yup.string()
            .length(5, intl.formatMessage(messages.businessZipCodeCharCount))
            .matches(
              /^[\d]*$/,
              intl.formatMessage(messages.businessZipCodeInvalid)
            ),
          businessStructure: Yup.string().required(
            intl.formatMessage(messages.businessStructureRequired)
          ),
          sellerType: Yup.string().required(
            intl.formatMessage(messages.sellerTypeRequired)
          ),
          taxId: Yup.string()
            .length(9, intl.formatMessage(messages.taxIdCharCount))
            .matches(
              /^(9\d{2})[- ]{0,1}((7[0-9]{1}|8[0-8]{1})|(9[0-2]{1})|(9[4-9]{1}))[- ]{0,1}(\d{4})$/,
              intl.formatMessage(messages.taxIdInvalid)
            )
            .required(intl.formatMessage(messages.taxIdRequired)),
          annualOnlineRevenue: Yup.string().required(
            intl.formatMessage(messages.annualOnlineRevenueRequired)
          ),
          authorizedReseller: Yup.bool(),
        })}
        inputs={[
          {
            name: 'businessName',
            label: intl.formatMessage(messages.businessName),
            labelTitle: intl.formatMessage(messages.address),
            component: Input,
          },
          {
            name: 'businessStreetAddress',
            label: intl.formatMessage(messages.businessStreetAddress),
            component: Input,
          },
          {
            name: 'businessCity',
            label: intl.formatMessage(messages.businessCity),
            component: Input,
          },
          {
            name: 'businessState',
            label: intl.formatMessage(messages.businessState),
            component: Select,
            options: [
              { value: '', title: intl.formatMessage(messages.selectState) },
              { value: 'AL', title: 'Alabama (AL)' },
              { value: 'AK', title: 'Alaska (AK)' },
              { value: 'AZ', title: 'Arizona (AZ)' },
              { value: 'AR', title: 'Arkansas (AR)' },
              { value: 'CA', title: 'California (CA)' },
              { value: 'CO', title: 'Colorado (CO)' },
              { value: 'CT', title: 'Connecticut (CT)' },
              { value: 'DE', title: 'Delaware (DE)' },
              { value: 'FL', title: 'FlorRida (FL)' },
              { value: 'GA', title: 'Georgia (GA)' },
              { value: 'HI', title: 'Hawaii (HI)' },
              { value: 'ID', title: 'Idaho (ID)' },
              { value: 'IL', title: 'Illinois (IL)' },
              { value: 'IN', title: 'Indiana (IN)' },
              { value: 'IA', title: 'Iowa (IA)' },
              { value: 'KS', title: 'Kansas (KS)' },
              { value: 'KY', title: 'Kentucky (KY)' },
              { value: 'LA', title: 'Louisiana (LA)' },
              { value: 'ME', title: 'Maine (ME)' },
              { value: 'MD', title: 'Maryland (MD)' },
              { value: 'MA', title: 'Massachusetts (MA)' },
              { value: 'MI', title: 'Michigan (MI)' },
              { value: 'MN', title: 'Minnesota (MN)' },
              { value: 'MS', title: 'Mississippi (MS)' },
              { value: 'MO', title: 'Missouri (MO)' },
              { value: 'MT', title: 'Montana (MT)' },
              { value: 'NE', title: 'Nebraska (NE)' },
              { value: 'NV', title: 'Nevada (NV)' },
              { value: 'NH', title: 'New Hampshire (NH)' },
              { value: 'NJ', title: 'New Jersey (NJ)' },
              { value: 'NM', title: 'New Mexico (NM)' },
              { value: 'NY', title: 'New York (NY)' },
              { value: 'NC', title: 'North Carolina (NC)' },
              { value: 'ND', title: 'North Dakota (ND)' },
              { value: 'OH', title: 'Ohio (OH)' },
              { value: 'OK', title: 'Oklahoma (OK)' },
              { value: 'OR', title: 'Oregon (OR)' },
              { value: 'PA', title: 'Pennsylvania (PA)' },
              { value: 'RI', title: 'Rhode Island (RI)' },
              { value: 'SC', title: 'South Carolina (SC)' },
              { value: 'SD', title: 'South Dakota (SD)' },
              { value: 'TN', title: 'Tennessee (TN)' },
              { value: 'TX', title: 'Texas (TX)' },
              { value: 'UT', title: 'Utah (UT)' },
              { value: 'VT', title: 'Vermont (VT)' },
              { value: 'VA', title: 'Virginia (VA)' },
              { value: 'WA', title: 'Washington (WA)' },
              { value: 'WV', title: 'West Virginia (WV)' },
              { value: 'WI', title: 'Wisconsin (WI)' },
              { value: 'WY', title: 'Wyoming (WY)' },
            ],
            fullWidth: false,
          },
          {
            name: 'businessZipCode',
            label: intl.formatMessage(messages.businessZipCode),
            component: Input,
            fullWidth: false,
            maxLength: 5,
          },
          {
            name: 'businessStructure',
            label: intl.formatMessage(messages.businessStructure),
            labelTitle: intl.formatMessage(messages.businessInformation),
            options: [
              {
                value: '',
                title: intl.formatMessage(messages.selectBusinessStructure),
              },
              {
                value: 'Self employed/Individual',
                title: intl.formatMessage(messages.businessStructureIndividual),
              },
              {
                value: 'C corporation',
                title: intl.formatMessage(messages.businessStructureCC),
              },
              {
                value: 'S corporation',
                title: intl.formatMessage(messages.businessStructureSC),
              },
              {
                value: 'Partnership',
                title: intl.formatMessage(
                  messages.businessStructurePartnership
                ),
              },
              {
                value: 'Limited liability',
                title: intl.formatMessage(messages.businessStructureLimited),
              },
              {
                value: 'Trust/Estate',
                title: intl.formatMessage(messages.businessStructureTrust),
              },
            ],
            component: Select,
          },
          {
            name: 'sellerType',
            label: intl.formatMessage(messages.sellerType),
            component: Select,
            options: [
              {
                value: '',
                title: intl.formatMessage(messages.selectSellerType),
              },
              {
                value: 'manufacturer',
                title: intl.formatMessage(messages.sellerTypeManufacturer),
              },
              {
                value: 'distributor',
                title: intl.formatMessage(messages.sellerTypeDistributor),
              },
              {
                value: 'supplier',
                title: intl.formatMessage(messages.sellerTypeSupplier),
              },
              {
                value: 'seller',
                title: intl.formatMessage(messages.sellerTypeSeller),
              },
            ],
          },
          {
            name: 'taxId',
            label: intl.formatMessage(messages.taxId),
            component: Input,
            maxLength: 9,
          },
          {
            name: 'annualOnlineRevenue',
            label: intl.formatMessage(messages.annualOnlineRevenue),
            component: Input,
          },
          {
            name: 'authorizedReseller',
            component: Switch,
            label: intl.formatMessage(messages.authorizedReseller),
            type: 'checkbox',
          },
        ]}
        submitButton={formIsValid => (
          <FormButton
            type="submit"
            disabled={loading}
            primary={formIsValid}
            subtitle={intl.formatMessage(messages.bankingInfo)}
          >
            {intl.formatMessage(messages.next)}
          </FormButton>
        )}
        onSubmit={submitForm}
        loading={loading}
        submitError={error}
      />
    </AccountPagesWrapper>
  )
}

YourBusiness.propTypes = {
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
)(YourBusiness)
