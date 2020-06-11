import React, { useEffect, useState } from 'react'
import { func, string } from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import styled from 'styled-components'
import { Grid } from '@material-ui/core'
import { countUserKind } from '../../../containers/AdminPanel/Dashboard/Users/api'
import {
  StyledActionButton,
} from './styles'

const StyledTopButton = styled(StyledActionButton)`
    && {
        border: 1px solid ${({ theme }) => theme.colors.homiPrimary};
        background: #fff;
        color: ${({ theme }) => theme.colors.homiPrimary};
        border-radius: 60px;
        font-weight: 500;
        width: 100%;
        padding: 13px 20px;
        &:hover {
          background: ${({ theme }) => theme.colors.homiPrimary};
          color: white;
        }
    }
`
const GridItem = styled(Grid)`
    && {
        margin-right: 10px;
    }
`
const useStyles = makeStyles(() => ({
  active: {
    background: `#7471FF !important`,
    color: 'white !important',
  },
}))
const TopButtons = ({ onClick, userKind }) => {
  // active class
  const classes = useStyles()
  // report data
  const [data, setData] = useState({
    buyers: 0,
    sellers: 0,
    suppliers: 0,
    resellers: 0
  })
  const getReportData = () => {
    countUserKind()
      .then(res => {
        setData(res.data)
      })
  }
  useEffect(() => {
    getReportData()
  }, [])


  return (
    <>
      <Grid container>
        <GridItem item>
          <StyledTopButton
            onClick={() => onClick('buyer')}
            className={userKind && userKind === 'buyer' ? classes.active : null}>
            Buyers ({data.buyers})
          </StyledTopButton>
        </GridItem>
        <GridItem item>
          <StyledTopButton
            onClick={() => onClick('seller')}
            className={userKind && userKind === 'seller' ? classes.active : null}
          >
            Sellers ({data.sellers})
          </StyledTopButton>
        </GridItem>
        <GridItem item>
          <StyledTopButton
            onClick={() => onClick('supplier')}
            className={userKind && userKind === 'supplier' ? classes.active : null}
          >
            Suppliers ({data.suppliers})
          </StyledTopButton>
        </GridItem>
        <GridItem item>
          <StyledTopButton
            onClick={() => onClick('reseller')}
            className={userKind && userKind === 'reseller' ? classes.active : null}
          >
            Resellers ({data.resellers})
          </StyledTopButton>
        </GridItem>
      </Grid>
    </>
  )
}
TopButtons.propTypes = {
  onClick: func,
  userKind: string,
}

TopButtons.defaultProps = {}

export default TopButtons
