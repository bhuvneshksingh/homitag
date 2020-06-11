import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Routes from '../../Router/Routes.json'
import NewProduct from './Loadable'
import CreateProduct from './CreateProductLodable'

const NewProductRoutes = () => (
  <Switch>
    <Route
      path={`${Routes.Suppliers}/new-product/add`}
      exact
      component={CreateProduct}
    />
    <Route
      path={`${Routes.Suppliers}/new-product/add/:id`}
      exact
      component={CreateProduct}
    />
    <Route
      path={`${Routes.Suppliers}/new-product`}
      exact
      component={NewProduct}
    />
  </Switch>
)

export default NewProductRoutes
