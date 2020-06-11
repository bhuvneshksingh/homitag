import React from 'react'
import { bool, func, object } from 'prop-types'
import styled, { css } from 'styled-components'
import { DialogContent, Button, Grid, Typography } from '@material-ui/core'
import { Field, Form as FmkForm, Formik } from 'formik'

import { PrimaryButton, OutlinePrimaryButton } from 'components/Common/Button'
import Radio from 'components/Common/Form/Radio'
import ModalLayout from '../Modals/ModalLayout'
import Close from '../../../../assets/images/icons/close.png'

const StyledDialogContent = styled(DialogContent)`
  min-width: 600px;
`

const StyledTitle = styled(Typography)`
  && {
    font-weight: bold;
    font-size: 16px;
    line-height: 20px;
    color: ${({ theme }) => theme.colors.homiBlack};
    margin: 25px 0;
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

const StyledFilterButton = styled(Button)`
  && {
    border: 1px solid #e4e4e4;
    box-sizing: border-box;
    border-radius: 100px;
    width: 100%;
    color: ${({ theme }) => theme.colors.text};
  }
  && .MuiButton-label {
    text-transform: none;
    padding: 10px;
    font-size: 16px;
  }
  ${({ selected }) =>
    selected &&
    css`
      && {
        color: ${({ theme }) => theme.colors.homiBlack};
        background-color: ${({ theme }) => theme.colors.homiGrey};
      }
    `}
`
const StyledField = styled(Field)`
  && .MuiRadio-root {
    padding: 0px;
    margin-right: 10px;
    margin-left: 10px;
  }
  && .MuiFormControlLabel-root {
    display: block;
  }
  && .MuiTypography-body1 {
    line-height: 40px;
  }
  && span {
    vertical-align: baseline-middle;
    vertical-align: -webkit-baseline-middle;
  }
`

const CloseButton= styled.div`
  width: 20px;
  height: 20px;
  float: right;
  align-self: flex-end;
  margin: 10px;
  position: absolute;
  top: 10px;
  right: 10px;
  &:hover {
    cursor: pointer;
   }
`
const filterOptions = [
  {
    label: 'Top Sellers',
    value: 'top_sellers',
  },
  {
    label: 'UserInventory: Low to High',
    value: 'inventory_low_to_high',
  },
  {
    label: 'UserInventory: High to Low',
    value: 'inventory_high_to_low',
  },
  {
    label: 'Price: Low to High',
    value: 'price_low_to_high',
  },
  {
    label: 'Price: High to Low',
    value: 'price_high_to_low',
  },
  {
    label: 'Product Name: A - Z',
    value: 'product_name_a_z',
  },
  {
    label: 'Product Name: Z - A',
    value: 'product_name_z_a',
  },
]

const Filters = ({ isOpen, onClose, onSubmit, sortAndFilter }) => {
  const handleClear = () => {
    onSubmit({
      sort: 'top_sellers',
      status: '',
      boost: '',
    })
  }
  return (
    <ModalLayout isOpen={isOpen} onClose={onClose}>
      <StyledDialogContent>
        <CloseButton onClick={onClose}>
          <img src={Close} alt=''/>
        </CloseButton>
        <Formik
          validateOnMount
          onSubmit={values => {
            onSubmit(values)
          }}
          initialValues={sortAndFilter}
          render={({ setFieldValue }) => (
            <FmkForm>
              <StyledSubTitleRadios> Sort By</StyledSubTitleRadios>
              <StyledField
                component={Radio}
                name="sort"
                options={filterOptions}
                defaultValue="top_sellers"
              />
              <StyledTitle>Filter By Status</StyledTitle>
              <StyledField
                name="status"
                render={({ field: { value } }) => (
                  <Grid container spacing={2}>
                    <Grid item md={6}>
                      <StyledFilterButton
                        selected={value === 'active'}
                        onClick={() => {
                          const active = value === '' ? 'active' : ''
                          setFieldValue('status', active)
                        }}
                      >
                        Active
                      </StyledFilterButton>
                    </Grid>
                    <Grid item md={6}>
                      <StyledFilterButton
                        selected={value === 'inactive'}
                        onClick={() => {
                          const inactive = value === '' ? 'inactive' : ''
                          setFieldValue('status', inactive)
                        }}
                      >
                        Inactive
                      </StyledFilterButton>
                    </Grid>
                  </Grid>
                )}
              />
              <StyledTitle>Filter By Boost</StyledTitle>
              <StyledField
                name="boost"
                render={({ field: { value } }) => (
                  <Grid container spacing={2}>
                    <Grid item md={6}>
                      <StyledFilterButton
                        selected={value === 'boosted'}
                        onClick={() => {
                          const boosted = value === '' ? 'boosted' : ''
                          setFieldValue('boost', boosted)
                        }}
                      >
                        Boosted
                      </StyledFilterButton>
                    </Grid>
                    <Grid item md={6}>
                      <StyledFilterButton
                        selected={value === 'not_boosted'}
                        onClick={() => {
                          const notBoosted = value === '' ? 'not_boosted' : ''
                          setFieldValue('boost', notBoosted)
                        }}
                      >
                        Not Boosted
                      </StyledFilterButton>
                    </Grid>
                  </Grid>
                )}
              />
              <PrimaryButton type="submit" style={{ marginTop: '30px' }}>
                Apply
              </PrimaryButton>
              <OutlinePrimaryButton onClick={handleClear}>
                Clear Filters
              </OutlinePrimaryButton>
            </FmkForm>
          )}
        />
      </StyledDialogContent>
    </ModalLayout>
  )
}

Filters.propTypes = {
  isOpen: bool,
  onClose: func,
  onSubmit: func,
  sortAndFilter: object,
}

export default Filters
