import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'

import NotFoundPage from 'containers/NotFoundPage/Loadable'
import Routes from './Routes.json'
import Login from '../Auth/Login/Loadable'
import Register from '../Auth/Register/Loadable'
import Verification from '../Auth/Verification/Loadable'
import ForgotPassword from '../Auth/ForgotPassword/Loadable'
import ResetPassword from '../Auth/ResetPassword/Loadable'
import Onboarding from '../Onboarding/Loadable'
import Dashboard from '../Dashboard/Loadable'
import Logout from '../Auth/Logout/Loadable'
import Terms from '../Terms/Loadable'
import Policy from '../Policy/Loadable'

const commonRoutes = [
  { path: Routes.ResetPassword, cmp: ResetPassword, exact: false },
  { path: Routes.Terms, cmp: Terms, exact: false },
  { path: Routes.Policy, cmp: Policy, exact: false },
]

const outers = [
  { path: Routes.SignIn, cmp: Login, exact: true },
  { path: Routes.Register, cmp: Register, exact: false },
  { path: Routes.Verification, cmp: Verification, exact: false },
  { path: Routes.ForgotPassword, cmp: ForgotPassword, exact: false },
  { path: '', cmp: NotFoundPage, exact: false },
]

export const OuterRouter = () => (
  <Switch>
    {[...commonRoutes, ...outers].map(r => (
      <Route
        path={Routes.Suppliers + r.path}
        component={r.cmp}
        exact={r.exact}
        key={r.path}
      />
    ))}
  </Switch>
)

const inners = [
  { path: Routes.Dashboard, cmp: Dashboard, exact: false },
  { path: Routes.Logout, cmp: Logout, exact: false },
  { path: '', cmp: NotFoundPage, exact: false },
]
const onboardingRoutes = [
  { path: Routes.Onboarding, cmp: Onboarding, exact: false },
  { path: '', cmp: NotFoundPage, exact: false },
]

export const InnerRouter = ({ dashboard }) => {
  const use = dashboard ? inners : onboardingRoutes
  return (
    <Switch>
      {[...commonRoutes, ...use].map(r => (
        <Route
          path={Routes.Suppliers + r.path}
          component={r.cmp}
          exact={r.exact}
          key={r.path}
        />
      ))}
    </Switch>
  )
}

InnerRouter.propTypes = {
  dashboard: PropTypes.bool,
}
