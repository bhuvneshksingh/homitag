import React, { useEffect, useState } from 'react'
import { func, string } from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import styled from 'styled-components'
import { Grid } from '@material-ui/core'
import { countCustomerSupport } from '../../../../containers/AdminPanel/Dashboard/Users/UserSupport/api'
import {
  StyledActionButton,
} from '../styles'

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
const TopButtons = ({ onClick, kind }) => {
  // active class
  const classes = useStyles()
  // report data
  const [data, setData] = useState({
    new: 0,
    pending: 0,
    open: 0,
    solved: 0
  })
  const getReportData = () => {
    countCustomerSupport()
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
            onClick={() => onClick('new')}
            className={kind && kind === 'new' ? classes.active : null}>
            New ( {data.new} )
          </StyledTopButton>
        </GridItem>
        <GridItem item>
          <StyledTopButton
            onClick={() => onClick('pending')}
            className={kind && kind === 'pending' ? classes.active : null}
          >
            Pending ( {data.pending} )
          </StyledTopButton>
        </GridItem>
        <GridItem item>
          <StyledTopButton
            onClick={() => onClick('open')}
            className={kind && kind === 'open' ? classes.active : null}
          >
            Open ( {data.open} )
          </StyledTopButton>
        </GridItem>
        <GridItem item>
          <StyledTopButton
            onClick={() => onClick('solved')}
            className={kind && kind === 'solved' ? classes.active : null}
          >
            Solved ( {data.solved} )
          </StyledTopButton>
        </GridItem>
      </Grid>
    </>
  )
}
TopButtons.propTypes = {
  onClick: func,
  kind: string,
}

TopButtons.defaultProps = {}

export default TopButtons
