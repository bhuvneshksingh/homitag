import React from 'react'
import { Switch, Route } from 'react-router-dom'

import NotFoundPage from 'containers/NotFoundPage/Loadable'
import Routes from '../Router/Routes.json'
import BankingInfo from './BankingInfo/Loadable'
import ShippingAndReturn from './ShippingAndReturn/Loadable'
import AboutYou from './AboutYou/Loadable'
import SellerAgreement from './SellerAgreement/Loadable'
import YourBusiness from './YourBusiness/Loadable'
import YourCatalog from './YourCatalog/Loadable'
import BusinessPresence from './BusinessPresence/Loadable'

const routes = [
  { path: Routes.BankingInfo, cmp: BankingInfo, exact: false },
  { path: Routes.ShippingAndReturn, cmp: ShippingAndReturn, exact: false },
  { path: Routes.AboutYou, cmp: AboutYou, exact: false },
  { path: Routes.SellerAgreement, cmp: SellerAgreement, exact: false },
  { path: Routes.YourBusiness, cmp: YourBusiness, exact: false },
  { path: Routes.YourCatalog, cmp: YourCatalog, exact: false },
  { path: Routes.BusinessPresence, cmp: BusinessPresence, exact: false },
  { path: '', cmp: NotFoundPage, exact: false },
]

export const Onboarding = () => (
  <Switch>
    {routes.map(r => (
      <Route
        path={Routes.Suppliers + Routes.Onboarding + r.path}
        component={r.cmp}
        exact={r.exact}
        key={r.path}
      />
    ))}
  </Switch>
)

export default Onboarding
