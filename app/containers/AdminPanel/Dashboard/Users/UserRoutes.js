import React from 'react'
import { Switch, Route } from 'react-router-dom'

import UserAccounts from './index'
import UserDetails from './UserDetails/Loadable'
import UserReviews from './UserReviews/Loadable'
import UserSupport from './UserSupport/Loadable'
import UserSupportDetails from './UserSupport/Details/Loadable'
import UserSaved from './UserSaved/Loadable'
import UserAlbums from './UserAlbums/Loadable'
import Routes from '../../Router/Routes.json'

const UserRoutes = () => (
  <Switch>
    <Route path={`${Routes.AdminPanel}/users/accounts`} exact component={UserAccounts} />
    <Route path={`${Routes.AdminPanel}/users/accounts/:id`} exact component={UserDetails} />
    <Route path={`${Routes.AdminPanel}/users/accounts/:id/reviews`} exact component={UserReviews} />
    <Route path={`${Routes.AdminPanel}/users/accounts/:id/saved`} exact component={UserSaved} />
    <Route path={`${Routes.AdminPanel}/users/accounts/:id/albums`} exact component={UserAlbums} />
    <Route path={`${Routes.AdminPanel}/users/support`} exact component={UserSupport} />
    <Route path={`${Routes.AdminPanel}/users/support/:id`} exact component={UserSupportDetails} />
  </Switch>
)

export default UserRoutes
