import React from 'react'
import { Switch, Route } from 'react-router-dom'
import NotFoundPage from 'containers/NotFoundPage/Loadable'
import Suppliers from 'containers/Suppliers'
import SuppliersRoutes from 'containers/Suppliers/Router/Routes.json'
import AdminPanel from 'containers/AdminPanel';
import AdminPanelRoutes from 'containers/AdminPanel/Router/Routes.json'

const Router = () => 
  (
    <Switch>
      <Route path={SuppliersRoutes.Suppliers} component={Suppliers} />
      <Route path={AdminPanelRoutes.AdminPanel} component={AdminPanel} />
      <Route component={NotFoundPage} />
    </Switch>
  )

export default Router
