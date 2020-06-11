import React from 'react';
import { Grid } from '@material-ui/core';

import News from './Cards/News';
import ForumTopics from './Cards/ForumTopics';
import QuickGlanceAnalytics from './Cards/QuickGlanceAnalytics';

const getData = async () => ({
  dataPoints: [65, 59, 80, 81, 56, 55, 40],
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July']
});

const Dashboard = () => (
  <>
    <Grid container item spacing={2} direction="column">
      <News />
      <ForumTopics />
      <QuickGlanceAnalytics
        getDataService={getData} />
    </Grid>
  </>
);

export default Dashboard;
