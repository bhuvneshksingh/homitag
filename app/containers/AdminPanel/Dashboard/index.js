import React from 'react'
import { Switch, Route } from 'react-router-dom'

import NotFoundPage from 'containers/NotFoundPage/Loadable'
import Routes from '../Router/Routes.json'
import DashboardGeneralOverview from './GeneralOverview/Loadable'
import Logout from '../Auth/Logout'
import UserRoutes from './Users/UserRoutes'
import DashboardLayout from '../../../components/AdminPanel/Dashboard/Layout'
const routes = [
  { path: Routes.Dashboard, cmp: DashboardGeneralOverview, exact: true },
  { path: Routes.Logout, cmp: Logout, exact: false },
  { path: Routes.Users, cmp: UserRoutes, exact: false },
  { path: '', cmp: NotFoundPage, exact: false },
]
export const Dashboard = () => (
  <DashboardLayout>
    <Switch>
      {routes.map(r => (
        <Route path={Routes.AdminPanel + r.path} component={r.cmp} exact={r.exact} key={r.path}/>
      ))}
    </Switch>
  </DashboardLayout>
)

export default Dashboard
