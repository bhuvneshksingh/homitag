import React from 'react'
import { Switch, Route } from 'react-router-dom'
import HelpMain from './Loadable'
import Routes from '../../Router/Routes.json'

const HelpRoutes = () => (
  <Switch>
    <Route path={`${Routes.Suppliers}/help`} exact component={HelpMain} />
    
  </Switch> 
)

export default HelpRoutes
