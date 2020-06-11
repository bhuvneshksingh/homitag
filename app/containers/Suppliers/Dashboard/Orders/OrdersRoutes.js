import React from 'react'
import { Switch, Route } from 'react-router-dom'
import OrderDetailMain from './OrderDetail/Loadable'
import OrdersMain from './Loadable'
import Archived from './Archived/Loadable'
import Returns from './Returns/Loadable'
import Cancellations from './Cancellations/Loadable'
import TrackItems from './TrackItems/Loadable'
import CancellationRequest from './CancellationRequest/Loadable'
import EditLabel from './EditLabel/Loadable'
import ViewLabel from './ViewLabel/Loadable'
import CreateLabel from './CreateLabel/Loadable'
import ViewRequest from './Returns/ViewRequest/Loadable'
import DeclineReturn from './Returns/DeclineReturn/Loadable'
import AcceptReturn from './Returns/AcceptReturn/Loadable'
import FullfillOrder from './FullfillOrder/Loadable'
import IssueRefund from './Returns/IssueRefund/Loadable'
import Routes from '../../Router/Routes.json'
import ContactBuyer from './ContactBuyer/Loadable'
import ViewPackingSlip from './ViewPackingSlip/Loadable'
import Help from './Help/Loadable'

const OrdersRoutes = () => (
  <Switch>
    <Route path={`${Routes.Suppliers}/orders`} exact component={OrdersMain} />
    <Route path={`${Routes.Suppliers}/orders/order/:id`}  exact component={OrderDetailMain} />
    <Route path={`${Routes.Suppliers}/orders/returns`} component={Returns} />
    <Route path={`${Routes.Suppliers}/orders/archived`} component={Archived} />
    <Route path={`${Routes.Suppliers}/orders/cancellations`} component={Cancellations} />
    <Route path={`${Routes.Suppliers}/orders/order/track-items/:id`}  exact component={TrackItems} />
    <Route path={`${Routes.Suppliers}/orders/order/edit-label/:id`}  exact component={EditLabel} />
    <Route path={`${Routes.Suppliers}/orders/order/view-label/:id`}  exact component={ViewLabel} />
    <Route path={`${Routes.Suppliers}/orders/order/fullfill-order/:id`}  exact component={FullfillOrder} />
    <Route path={`${Routes.Suppliers}/orders/order/cancellation-request/:id`}  exact component={CancellationRequest} />
    <Route path={`${Routes.Suppliers}/orders/order/view-request/:id`}  exact component={ViewRequest} />
    <Route path={`${Routes.Suppliers}/orders/order/decline-return/:id`}  exact component={DeclineReturn} />
    <Route path={`${Routes.Suppliers}/orders/order/accept-return/:id`}  exact component={AcceptReturn} />
    <Route path={`${Routes.Suppliers}/orders/order/issue-refund/:id`}  exact component={IssueRefund} />
    <Route path={`${Routes.Suppliers}/orders/order/create-label/:id`}  exact component={CreateLabel} />
    <Route path={`${Routes.Suppliers}/orders/order/contact-buyer/:id`}  exact component={ContactBuyer} />
    <Route path={`${Routes.Suppliers}/orders/order/help/:id`}  exact component={Help} />
    <Route path={`${Routes.Suppliers}/orders/order/view-packing-slip/:id`}  exact component={ViewPackingSlip} />
  </Switch> 
)

export default OrdersRoutes
