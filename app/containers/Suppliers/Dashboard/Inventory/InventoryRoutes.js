import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Inventory from './index'
import ProductDetail from './ProductDetail/Loadable'
import ShippingDetail from './ShippingDetail/Loadable'
import ArchivedInventory from './ArchivedInventory'
import Routes from '../../Router/Routes.json'

const InventoryRoutes = () => (
  <Switch>
    <Route path={`${Routes.Suppliers}/inventory`} exact component={Inventory} />
    <Route path={`${Routes.Suppliers}/inventory/archived`} exact component={ArchivedInventory} />
    <Route path={`${Routes.Suppliers}/inventory/shipping/:id`} exact component={ShippingDetail} />
    <Route path={`${Routes.Suppliers}/inventory/:id`} exact component={ProductDetail} />
  </Switch>
)

export default InventoryRoutes
