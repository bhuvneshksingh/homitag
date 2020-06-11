import React, {useState, useEffect, useRef} from 'react'
import { bool, func, object } from 'prop-types'
import styled, { css } from 'styled-components'
import { DialogContent, Button, Grid, Typography } from '@material-ui/core'
import { Field, Form as FmkForm, Formik } from 'formik'

import { PrimaryButton, OutlinePrimaryButton } from 'components/Common/Button'
import Radio from 'components/Common/Form/Radio'
import ModalLayout from '../Modals/ModalLayout'
import Close from '../../../../assets/images/icons/close.svg'

const StyledDialogContent = styled(DialogContent)`
  min-width: 600px;
`

const StyledField = styled(Field)`
  && div {
    color: red!important;
  }
  && .MuiRadio-root{
    padding: 0px;
    margin-right: 10px;
    margin-left: 10px;
    text-transform: none;
  }
  && .MuiFormControlLabel-root{
    display: block;
  }
  && .MuiTypography-body1{
    line-height: 40px;
  }
  && span{
    vertical-align: baseline-middle;
    vertical-align: -webkit-baseline-middle;
  }
`
const StyledTitle = styled(Typography)`
  && {
    font-weight: bold;
    color: ${({ theme }) => theme.colors.homiBlack};
    margin: 0px 0px 0px 0px;
    text-align: center;
    display: block;
    font-size: 20px;
    line-height: 24px;
  }
`
const StyledSubTitle = styled(Typography)`
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
    padding: 5px 10px;
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
const filterOptions = [
  {
    label: 'Order Date ',
    value: 'createdAt-desc',
  },
  {
    label: 'Order Cost: High to Low',
    value: 'totalPaid-desc',
  },
  {
    label: 'Order Cost: Low to High',
    value: 'totalPaid-asc',
  }
]

function Filters({ isOpen, onClose, onSubmit, onClear, sortAndFilter }) {
 
  const handleClear = () => {
    onSubmit({
      sort: 'createdAt-desc',
      status: null
    })
  }
  const [inputValues, setInputValues] = useState({
    sort: 'createdAt-desc',
    status: null
  }) 
  
  const isInitialMount = useRef(true);
  const isInitialMount2 = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      onSubmit(inputValues)
    }
  }, [inputValues])
  useEffect(() => { 
    if (isInitialMount2.current) {
      isInitialMount2.current = false;
    } else {
      onClear(inputValues)
    }
  }, [inputValues]) 
  
  return (
    <ModalLayout isOpen={isOpen} onClose={onClose}>
      <StyledDialogContent>
        <CloseButton onClick={onClose}>
          <img src={Close} alt=''/>
        </CloseButton>
        <StyledTitle>Sort and Filter</StyledTitle>
        <Formik
          validateOnMount
          onSubmit={values => {
            setInputValues(values)
          }}
          initialValues={sortAndFilter}
          render={({ setFieldValue }) => (
            <FmkForm>
              <StyledSubTitleRadios> Sort By</StyledSubTitleRadios>
              <StyledField
                component={Radio}
                name="sort"
                options={filterOptions}
                defaultValue="createdAt-desc"
              />
              <StyledSubTitle>Filter By Status</StyledSubTitle>
              <Field
                name="status"
                render={({ field: { value } }) => (
                  <Grid container spacing={2}>
                    <Grid item md={6}>
                      <StyledFilterButton
                        selected={value === 'pendingbuyerconfirmation'}
                        onClick={() => ( value==='pendingbuyerconfirmation' ? setFieldValue('status', null) : setFieldValue('status', 'pendingbuyerconfirmation') )}
                      >
                      Requested
                      </StyledFilterButton>
                    </Grid>
                    <Grid item md={6}>
                      <StyledFilterButton
                        selected={value === 'buyAccepted'}
                        onClick={() => ( value==='buyAccepted' ? setFieldValue('status', null) : setFieldValue('status', 'buyAccepted') )}
                      >
                      Accepted
                      </StyledFilterButton>
                    </Grid>
                    <Grid item md={6}>
                      <StyledFilterButton
                        selected={value === 'inTransit'}
                        onClick={() => ( value==='inTransit' ? setFieldValue('status', null) : setFieldValue('status', 'inTransit') )}
                      >
                      In Transit
                      </StyledFilterButton>
                    </Grid>
                    <Grid item md={6}>
                      <StyledFilterButton
                        selected={value === 'delivered'}
                        onClick={() => ( value==='delivered' ? setFieldValue('status', null) : setFieldValue('status', 'delivered') )}
                      >
                      Delivered
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
  onClear: func,
  sortAndFilter: object,
}

Filters.defaultProps = {
  sortAndFilter: {
    sort: 'createdAt-desc',
    status: null
  },
}
export default Filters
