import React, { useState, useEffect } from 'react'
import { object } from 'prop-types'
import queryString from 'query-string'
import { Grid } from '@material-ui/core'

import OnboardingCompleteModal from 'components/Suppliers/Dashboard/Main/OnboardingCompleteModal'
import ActivityTicker from './Cards/ActivityTicker'
import CurrentBalance from './Cards/CurrentBalance'
import News from './Cards/News'
import Performance from './Cards/Performance'
import Reviews from './Cards/Reviews'
import InvertoryAlerts from './Cards/InvertoryAlerts'

const Dashboard = ({ location }) => {
  // Handle Onboarding Completed modal
  const [obCmpModal, setObCmpModal] = useState(false)
  useEffect(() => {
    const qs = queryString.parse(location.search)
    if ('onboardingCompleted' in qs) setObCmpModal(true)
  }, [location.search])
  return (
    <>
      <Grid container spacing={2} direction="column">
        <Grid item container spacing={2}>
          <Grid
            item
            container
            md={8}
            direction="column"
            wrap="nowrap"
            spacing={2}
          >
            <ActivityTicker />
            <Grid item container spacing={2} wrap="nowrap">
              <CurrentBalance />
              <Reviews />
            </Grid>
          </Grid>
          <News />
        </Grid>
        <Grid item container spacing={2}>
          <InvertoryAlerts />
          <Performance />
        </Grid>
      </Grid>
      <OnboardingCompleteModal
        isOpen={obCmpModal}
        onClose={() => setObCmpModal(false)}
      />
    </>
  )
}

Dashboard.propTypes = {
  location: object,
}

export default Dashboard
