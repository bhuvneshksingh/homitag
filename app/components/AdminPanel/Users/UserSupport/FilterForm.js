import React, { useState } from 'react'
import { Button, Grid, createMuiTheme } from '@material-ui/core'
import { Field, Form as FmkForm, Formik } from 'formik'
import styled, { css } from 'styled-components'
import { func, object } from 'prop-types'
import { PrimaryButton } from 'components/Common/Button'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import addDays from 'date-fns/addDays'
import { ThemeProvider } from '@material-ui/styles'

const materialTheme = createMuiTheme({
  overrides: {
    MuiInputBase: {
      root: {
        paddingRight: '8px !important',
      },
      input: {
        padding: '10px 0 10px 10px !important',
      },
    },
    MuiButtonBase: {
      root: {
        padding: '0 !important',
      },
    },
  },
})
const StyledResetButton = styled(PrimaryButton)`
  && {
      background: ${({ theme }) => theme.colors.homiWhite};
      box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.homiPrimary} inset !important;
      color: ${({ theme }) => theme.colors.homiPrimary};
    }
`
const StyledFilterButton = styled(Button)`
  && {
    border: 1px solid ${({ theme }) => theme.colors.text};
    box-sizing: border-box;
    border-radius: 100px;
    width: 100%;
    height: 48px;
    text-transform: capitalize;
    color: ${({ theme }) => theme.colors.text};
  }
  ${({ selected }) =>
    selected &&
  css`
      && {
        color: ${({ theme }) => theme.colors.homiPrimary};
        border-color: ${({ theme }) => theme.colors.homiPrimary};
      }
    `}
`
const StyledLabel = styled.div`
    font-size: 16px;
    display: block;
    margin: 30px 0 18px;
    font-weight: 600;
`
const FilterForm = ({ filters, onSubmit }) => {
  const [minDate, setMinDate] = useState(filters.createdAtGreater || null)

  const handleClear = () => {
    onSubmit({
      createdAtGreater: '',
      createdAtLess: '',
      userKind: '',
      status: '',
      ratingAtGreater: '',
      ratingAtLess: '',
    })
  }
  return (
    <Formik
      validateOnMount
      onSubmit={values => {
        onSubmit(values)
      }}
      initialValues={filters}
      render={({ setFieldValue }) => (
        <FmkForm>
          <StyledLabel>Filter by Date Sent</StyledLabel>
          <Grid
            container
            spacing={0}
            justify="space-between"
            alignItems="center">
            <Grid item md={5}>
              <Field name="createdAtGreater" id="createdAtGreater" type="text">
                {({ field: { value } }) => (
                  <div>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <ThemeProvider theme={materialTheme}>
                        <KeyboardDatePicker
                          variant="inline"
                          inputVariant="outlined"
                          format="MM/dd/yyyy"
                          autoOk
                          value={value || null}
                          onChange={(date) => {
                            setFieldValue('createdAtGreater', date)
                            setMinDate(date)
                          }}
                        />
                      </ThemeProvider>
                    </MuiPickersUtilsProvider>
                  </div>
                )}
              </Field>
            </Grid>
            <Grid item md={2}>
              <span>to</span>
            </Grid>
            <Grid item md={5}>
              <Field name="createdAtLess" id="createdAtLess" type="text">
                {({ field: { value } }) => (
                  <div>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <ThemeProvider theme={materialTheme}>
                        <KeyboardDatePicker
                          variant="inline"
                          inputVariant="outlined"
                          format="MM/dd/yyyy"
                          autoOk
                          minDate={addDays(minDate, 1)}
                          value={value || null}
                          onChange={(date) => setFieldValue('createdAtLess', date)}
                        />
                      </ThemeProvider>
                    </MuiPickersUtilsProvider>
                  </div>
                )}
              </Field>
            </Grid>
          </Grid>

          <Field
            name="status"
            render={({ field: { value } }) => (
              <>
                <StyledLabel>Filter by Message Status</StyledLabel>
                <Grid container spacing={2}>
                  <Grid item md={3}>
                    <StyledFilterButton
                      selected={value === 'new'}
                      onClick={() => setFieldValue('status', 'new')}
                    >
                      New
                    </StyledFilterButton>
                  </Grid>
                  <Grid item md={3}>
                    <StyledFilterButton
                      selected={value === 'pending'}
                      onClick={() => setFieldValue('status', 'pending')}
                    >
                      Pending
                    </StyledFilterButton>
                  </Grid>
                  <Grid item md={3}>
                    <StyledFilterButton
                      selected={value === 'open'}
                      onClick={() => setFieldValue('status', 'open')}
                    >
                      Open
                    </StyledFilterButton>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item md={3}>
                    <StyledFilterButton
                      selected={value === 'solved'}
                      onClick={() => setFieldValue('status', 'solved')}
                    >
                      Solved
                    </StyledFilterButton>
                  </Grid>
                </Grid>
              </>
            )}
          />
          <Field
            name="isBuyer"
            render={({ field: { value } }) => (
              <>
                <StyledLabel>Is Buyer</StyledLabel>
                <Grid container spacing={2}>
                  <Grid item md={3}>
                    <StyledFilterButton
                      selected={value === 'true'}
                      onClick={() => setFieldValue('isBuyer', 'true')}
                    >
                      Yes
                    </StyledFilterButton>
                  </Grid>
                  <Grid item md={3}>
                    <StyledFilterButton
                      selected={value === 'false'}
                      onClick={() => setFieldValue('isBuyer', 'false')}
                    >
                      No
                    </StyledFilterButton>
                  </Grid>
                </Grid>
              </>
            )}
          />
          <Field
            name="isSeller"
            render={({ field: { value } }) => (
              <>
                <StyledLabel>Is Seller</StyledLabel>
                <Grid container spacing={2}>
                  <Grid item md={3}>
                    <StyledFilterButton
                      selected={value === 'true'}
                      onClick={() => setFieldValue('isSeller', 'true')}
                    >
                      Yes
                    </StyledFilterButton>
                  </Grid>
                  <Grid item md={3}>
                    <StyledFilterButton
                      selected={value === 'false'}
                      onClick={() => setFieldValue('isSeller', 'false')}
                    >
                      No
                    </StyledFilterButton>
                  </Grid>
                </Grid>
              </>
            )}
          />
          <Field
            name="isSupplier"
            render={({ field: { value } }) => (
              <>
                <StyledLabel>Is Supplier</StyledLabel>
                <Grid container spacing={2}>
                  <Grid item md={3}>
                    <StyledFilterButton
                      selected={value === 'true'}
                      onClick={() => setFieldValue('isSupplier', 'true')}
                    >
                      Yes
                    </StyledFilterButton>
                  </Grid>
                  <Grid item md={3}>
                    <StyledFilterButton
                      selected={value === 'false'}
                      onClick={() => setFieldValue('isSupplier', 'false')}
                    >
                      No
                    </StyledFilterButton>
                  </Grid>
                </Grid>
              </>
            )}
          />
          <Field
            name="isReseller"
            render={({ field: { value } }) => (
              <>
                <StyledLabel>Is Reseller</StyledLabel>
                <Grid container spacing={2}>
                  <Grid item md={3}>
                    <StyledFilterButton
                      selected={value === 'true'}
                      onClick={() => setFieldValue('isReseller', 'true')}
                    >
                      Yes
                    </StyledFilterButton>
                  </Grid>
                  <Grid item md={3}>
                    <StyledFilterButton
                      selected={value === 'false'}
                      onClick={() => setFieldValue('isReseller', 'false')}
                    >
                      No
                    </StyledFilterButton>
                  </Grid>
                </Grid>
              </>
            )}
          />
          <Field
            name="order_status"
            render={({ field: { value } }) => (
              <>
                <StyledLabel>Filter by Order Status</StyledLabel>
                <Grid container spacing={2}>
                  <Grid item md={4}>
                    <StyledFilterButton
                      selected={value === 'active'}
                      onClick={() => setFieldValue('order_status', 'active')}
                    >
                      Processing
                    </StyledFilterButton>
                  </Grid>
                  <Grid item md={4}>
                    <StyledFilterButton
                      selected={value === 'inactive'}
                      onClick={() => setFieldValue('order_status', 'inactive')}
                    >
                      In Transit
                    </StyledFilterButton>
                  </Grid>

                </Grid>
                <Grid container spacing={2}>
                  <Grid item md={4}>
                    <StyledFilterButton
                      selected={value === 'deactivated'}
                      onClick={() => setFieldValue('order_status', 'deactivated')}
                    >
                      Delivered
                    </StyledFilterButton>
                  </Grid>
                  <Grid item md={4}>
                    <StyledFilterButton
                      selected={value === 'deactivated'}
                      onClick={() => setFieldValue('order_status', 'deactivated')}
                    >
                      Cancelled
                    </StyledFilterButton>
                  </Grid>
                </Grid>
              </>
            )}
          />
          <PrimaryButton type="submit" style={{ marginTop: '30px' }}>
            Apply Filters
          </PrimaryButton>
          <StyledResetButton onClick={handleClear}>
            Clear Filters
          </StyledResetButton>
        </FmkForm>
      )}
    />
  )
}
FilterForm.propTypes = {
  filters: object,
  onSubmit: func,
}
export default FilterForm
