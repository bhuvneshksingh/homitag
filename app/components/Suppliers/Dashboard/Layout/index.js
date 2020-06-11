import React from 'react'
import { array, oneOfType, object } from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Container, CssBaseline } from '@material-ui/core'
import Header from './Header'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: {
    minHeight: '86px',
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    minWidth: '1200px',
    backgroundColor: 'white'
  },
  container: {
    padding: '20px',
  },
}))

const DashboardLayout = ({ children }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header/>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {children}
        </Container>
      </main>
    </div>
  )
}

DashboardLayout.propTypes = {
  children: oneOfType([array, object]),
}

export default DashboardLayout
