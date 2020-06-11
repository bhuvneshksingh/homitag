import React, { useState, useEffect } from 'react'
import { Button, Grid, createMuiTheme } from '@material-ui/core'
import { Field, Form as FmkForm, Formik } from 'formik'
import styled, { css } from 'styled-components'
import { func, object } from 'prop-types'
import { PrimaryButton } from 'components/Common/Button'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import addDays from 'date-fns/addDays'
import { ThemeProvider } from '@material-ui/styles'
import StarRating from './StarRating'

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
const StyledError = styled.div`
  color: red;
  position: absolute;
  top: 40px;
  font-size: 12px;
`
const FilterForm = ({ filters, onSubmit }) => {
  const [minDate, setMinDate] = useState(filters.createdAtGreater || null)
  const [minRating, setMinRating] = useState(0)
  const [maxRating, setMaxRating] = useState(0)
  const [errors, setErrors] = useState({
    rating: false,
  })

  const handleMaxRating = () => {
    setErrors({
      rating: maxRating < minRating
    })
  }

  useEffect(() => {
    handleMaxRating()
  }, [maxRating, minRating]);

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
          <StyledLabel>Filter by Joined Date</StyledLabel>
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

          <StyledLabel>Filter by User Rating</StyledLabel>

          <Grid
            container
            spacing={0}
            justify="space-between"
            alignItems="center">
            <Grid item md={5}>
              <Field name="ratingAtGreater" id="ratingAtGreater" type="number">
                {({ field: { value } }) => (
                  <div>
                    <StarRating
                      count={value || 0}
                      onClick={(number) => {
                        setFieldValue('ratingAtGreater', number)
                        setMinRating(number)
                      }}
                    />
                  </div>
                )}
              </Field>
            </Grid>
            <Grid item md={2}>
              <span>to</span>
            </Grid>
            <Grid item md={5} style={{ position: 'relative' }}>
              <Field name="ratingAtLess" id="ratingAtLess" type="number">
                {({ field: { value } }) => (
                  <div>
                    <StarRating
                      count={value || 0}
                      onClick={(number) => {
                        setFieldValue('ratingAtLess', number)
                        setMaxRating(number)
                      }}
                    />
                  </div>
                )}
              </Field>
              {errors.rating &&
              <StyledError>
                should be greater than or equal to {minRating}.
              </StyledError>
              }
            </Grid>
          </Grid>

          <Field
            name="userKind"
            render={({ field: { value } }) => (
              <>
                <StyledLabel>Is Buyer</StyledLabel>
                <Grid container spacing={2}>
                  <Grid item md={3}>
                    <StyledFilterButton
                      selected={value === 'buyer'}
                      onClick={() => setFieldValue('userKind', 'buyer')}
                    >
                      Yes
                    </StyledFilterButton>
                  </Grid>
                  <Grid item md={3}>
                    <StyledFilterButton
                      selected={value === 'not-buyer'}
                      onClick={() => setFieldValue('userKind', 'not-buyer')}
                    >
                      No
                    </StyledFilterButton>
                  </Grid>
                </Grid>
                <StyledLabel>Is Seller</StyledLabel>
                <Grid container spacing={2}>
                  <Grid item md={3}>
                    <StyledFilterButton
                      selected={value === 'seller'}
                      onClick={() => setFieldValue('userKind', 'seller')}
                    >
                      Yes
                    </StyledFilterButton>
                  </Grid>
                  <Grid item md={3}>
                    <StyledFilterButton
                      selected={value === 'not-seller'}
                      onClick={() => setFieldValue('userKind', 'not-seller')}
                    >
                      No
                    </StyledFilterButton>
                  </Grid>
                </Grid>
                <StyledLabel>Is Supplier</StyledLabel>
                <Grid container spacing={2}>
                  <Grid item md={3}>
                    <StyledFilterButton
                      selected={value === 'supplier'}
                      onClick={() => setFieldValue('userKind', 'supplier')}
                    >
                      Yes
                    </StyledFilterButton>
                  </Grid>
                  <Grid item md={3}>
                    <StyledFilterButton
                      selected={value === 'not-supplier'}
                      onClick={() => setFieldValue('userKind', 'not-supplier')}
                    >
                      No
                    </StyledFilterButton>
                  </Grid>
                </Grid>
                <StyledLabel>Is Reseller</StyledLabel>
                <Grid container spacing={2}>
                  <Grid item md={3}>
                    <StyledFilterButton
                      selected={value === 'reseller'}
                      onClick={() => setFieldValue('userKind', 'reseller')}
                    >
                      Yes
                    </StyledFilterButton>
                  </Grid>
                  <Grid item md={3}>
                    <StyledFilterButton
                      selected={value === 'not-reseller'}
                      onClick={() => setFieldValue('userKind', 'not-reseller')}
                    >
                      No
                    </StyledFilterButton>
                  </Grid>
                </Grid>
              </>
            )}

          />
          <Field
            name="status"
            render={({ field: { value } }) => (
              <>
                <StyledLabel>Filter User by Status</StyledLabel>
                <Grid container spacing={2}>
                  <Grid item md={4}>
                    <StyledFilterButton
                      selected={value === 'active'}
                      onClick={() => setFieldValue('status', 'active')}
                    >
                      Active
                    </StyledFilterButton>
                  </Grid>
                  <Grid item md={4}>
                    <StyledFilterButton
                      selected={value === 'inactive'}
                      onClick={() => setFieldValue('status', 'inactive')}
                    >
                      Inactive
                    </StyledFilterButton>
                  </Grid>
                  <Grid item md={4}>
                    <StyledFilterButton
                      selected={value === 'deactivated'}
                      onClick={() => setFieldValue('status', 'deactivated')}
                    >
                      Deactivated
                    </StyledFilterButton>
                  </Grid>
                </Grid>
              </>
            )}
          />
          <PrimaryButton type="submit" style={{ marginTop: '30px' }} disabled={errors.rating}>
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
