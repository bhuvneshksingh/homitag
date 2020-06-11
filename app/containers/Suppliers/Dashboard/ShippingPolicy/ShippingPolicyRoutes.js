import React from 'react'
import { Switch, Route } from 'react-router-dom'
import ShippingPolicyLoadable from './Loadable'
import Routes from '../../Router/Routes.json'

const HelpRoutes = () => (
  <Switch>
    <Route path={`${Routes.Suppliers}/shipping-policy`} exact component={ShippingPolicyLoadable} />
  </Switch>
)

export default HelpRoutes
