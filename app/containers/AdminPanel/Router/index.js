import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Routes from './Routes.json';
import Login from '../Auth/Login/Loadable';
import Verification from '../Auth/Verification/Loadable';
import ForgotPassword from '../Auth/ForgotPassword/Loadable';
import ResetPassword from '../Auth/ResetPassword/Loadable'
import Logout from '../Auth/Logout';
import Terms from '../Terms/Loadable';
import Policy from '../Policy/Loadable';
import Dashboard from '../Dashboard/Loadable';

const commonRoutes = [
  { path: Routes.Terms, cmp: Terms, exact: false },
  { path: Routes.ResetPassword, cmp: ResetPassword, exact: false },
  { path: Routes.Policy, cmp: Policy, exact: false },
];

const outers = [
  { path: Routes.SignIn, cmp: Login, exact: true },
  { path: Routes.Verification, cmp: Verification, exact: false },
  { path: Routes.ForgotPassword, cmp: ForgotPassword, exact: false },
  { path: '', cmp: NotFoundPage, exact: false },
];

export const OuterRouter = () => (
  <Switch>
    {[...commonRoutes, ...outers].map(r => (
      <Route path={Routes.AdminPanel + r.path} component={r.cmp} exact={r.exact} key={Routes.AdminPanel + r.path} />
    ))}
  </Switch>
);

const inners = [
  { path: Routes.Dashboard, cmp: Dashboard, exact: false },
  { path: Routes.Logout, cmp: Logout, exact: false },
  { path: '', cmp: NotFoundPage, exact: false },
];
export const InnerRouter = () => (
  <Switch>
    {[...commonRoutes, ...inners].map(r => (
      <Route path={Routes.AdminPanel + r.path} component={r.cmp} exact={r.exact} key={Routes.AdminPanel + r.path} />
    ))}
  </Switch>
);
