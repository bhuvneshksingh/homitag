import React from 'react'
import { Switch, Route } from 'react-router-dom'

import DashboardLayout from 'components/Suppliers/Dashboard/Layout'
import NotFoundPage from 'containers/NotFoundPage/Loadable'
import Routes from '../Router/Routes.json'
import DashboardMain from './Main/Loadable'
import Logout from '../Auth/Logout/Loadable'
import InventoryRoutes from './Inventory/InventoryRoutes'
import OrdersRoutes from './Orders/OrdersRoutes'
import HelpRoutes from './Help/HelpRoutes'
import NewProductRoutes from './NewProduct/NewProductRoutes'
import ShippingPolicy from './ShippingPolicy/ShippingPolicyRoutes'

const routes = [
  { path: Routes.Dashboard, cmp: DashboardMain, exact: true },
  { path: Routes.Logout, cmp: Logout, exact: true },
  { path: Routes.Inventory, cmp: InventoryRoutes, exact: false },
  { path: Routes.Orders, cmp: OrdersRoutes, exact: false },
  { path: Routes.Help, cmp: HelpRoutes, exact: false },
  { path: Routes.ShippingPolicy, cmp: ShippingPolicy, exact: false },
  { path: Routes.NewProduct, cmp: NewProductRoutes, exact: false },
  { path: '', cmp: NotFoundPage, exact: false },
]

export const Dashboard = () => (
  <DashboardLayout>
    <Switch>
      {routes.map(r => (
        <Route
          path={Routes.Suppliers + r.path}
          component={r.cmp}
          exact={r.exact}
          key={r.path}
        />
      ))}
    </Switch>
  </DashboardLayout>
)

export default Dashboard
