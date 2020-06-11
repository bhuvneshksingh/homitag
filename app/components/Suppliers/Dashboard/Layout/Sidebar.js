import React from 'react'
import { object, string, bool, array } from 'prop-types'
import styled from 'styled-components'
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
} from '@material-ui/core'
import { Link} from 'react-router-dom'
import { withRouter } from "react-router";
import Routes from 'containers/Suppliers/Router/Routes.json'
import { injectIntl } from 'react-intl'

import Icon from 'components/Common/Icon'
import messages from './messages'

const AdapterLink = React.forwardRef((props, ref) => (
  <Link innerRef={ref} {...props} />
))

const ArrowIcon = styled(Icon).attrs(props => ({
  color: props.theme.colors.homiPrimary,
  width: 10,
  height: 15,
}))``

const ArrowUp = () => (
  <div style={{ transform: 'rotate(-90deg)' }}>
    <ArrowIcon icon="arrow" />
  </div>
)

const ArrowDown = () => (
  <div style={{ transform: 'rotate(90deg)' }}>
    <ArrowIcon icon="arrow" />
  </div>
)

const StyledItem = styled(ListItem)`
  && {
    padding-right: 30px;
    padding-left: 60px;
    margin-bottom: 10px;
    .MuiListItemText-primary {
      color: ${({ theme }) => theme.colors.text};
      font-weight: bold;
      font-size: 16px;
      line-height: 20px;
    }
    &.Mui-selected {
      background-color: ${({ theme }) => theme.colors.homiPrimary};
      .MuiListItemText-primary {
        color: ${({ theme }) => theme.colors.homiWhite};
      }
    }
  }
`

const StyledSubmenuItem = styled(ListItem)`
  && {
    height: 30px;
    padding-left: 120px;
    .MuiListItemText-primary {
      color: ${({ theme }) => theme.colors.homiWhite};
      font-weight: 600;
      font-size: 14px;
      line-height: 17px;
    }
    &.Mui-selected {
      background-color: ${({ theme }) => theme.colors.homiPrimary};
      .MuiListItemText-primary {
        color: ${({ theme }) => theme.colors.homiWhite};
      }
    }
  }
`

const StyledIcon = styled(Icon).attrs(props => ({
  color: props.theme.colors.homiWhite,
}))``

const MenuItem = ({ isSelected, link, title, icon, subMenu, history}) => {
  const [open, setOpen] = React.useState(false)

  const HandleClick = () => {
    setOpen(!open)
    if (!open && title==='Orders') { history.push("/suppliers/orders")}
  }

  const renderLinkItem = () =>
    (<StyledItem
      selected={isSelected}
      component={AdapterLink}
      to={Routes.Suppliers + link}
      key={title}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={title} />
    </StyledItem>)

  const renderSubmenuItem = item => (
    <StyledSubmenuItem
      selected={item.selected}
      component={AdapterLink}
      to={Routes.Suppliers + item.link}
      key={item.title}
    >
      <ListItemText primary={item.title} key={item.title} />
    </StyledSubmenuItem>
  )

  const renderSubmenu = () => (
    <>
      <StyledItem button onClick={HandleClick}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={title} />
        {open ? <ArrowDown /> : <ArrowUp />}
      </StyledItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {subMenu.map(s => renderSubmenuItem(s))}
        </List>
      </Collapse>
    </>
  )
  if (subMenu.length > 0) return renderSubmenu()
  return renderLinkItem()
}

MenuItem.propTypes = {
  isSelected: bool,
  link: string,
  title: string,
  icon: object,
  subMenu: array,
}

MenuItem.defaultProps = {
  subMenu: [],
}

const Sidebar = ({ intl , history}) => {
  const items = [
    {
      title: intl.formatMessage(messages.dashboard),
      icon: <StyledIcon icon="dashboard" />,
      link: Routes.Dashboard,
      selected:
        window.location.pathname === Routes.Suppliers ||
        window.location.pathname === `${Routes.Suppliers}/`,
    },
    {
      title: intl.formatMessage(messages.orders),
      icon: <StyledIcon icon="orders" />,
      selected: window.location.pathname.includes(Routes.Orders),
      subMenu: [
        {
          title: intl.formatMessage(messages.orders),
          link: Routes.Orders,
          selected: window.location.pathname === ( Routes.Suppliers + Routes.Orders),
        },
        {
          title: intl.formatMessage(messages.returns),
          link: Routes.Returns,
          selected: window.location.pathname === ( Routes.Suppliers + Routes.Returns),
        },
        {
          title: intl.formatMessage(messages.cancellations),
          link: Routes.Cancellations,
          selected: window.location.pathname === ( Routes.Suppliers + Routes.Cancellations),
        },
      ],
    },
    {
      title: intl.formatMessage(messages.inventory),
      icon: <StyledIcon icon="inventory" />,
      link: Routes.Inventory,
      selected: window.location.pathname.includes(Routes.Inventory),
    },
    {
      title: intl.formatMessage(messages.perfomance),
      icon: <StyledIcon icon="perfomance" />,
      link: Routes.Perfomance,
      selected: window.location.pathname.includes(Routes.Perfomance),
    },
    {
      title: intl.formatMessage(messages.myStore),
      icon: <StyledIcon icon="myStore" />,
      link: Routes.MyStore,
      selected: window.location.pathname.includes(Routes.MyStore),
    },
    {
      title: intl.formatMessage(messages.settings),
      icon: <StyledIcon icon="settings" />,
      selected: window.location.pathname.includes(Routes.Settings),
      subMenu: [
        {
          title: intl.formatMessage(messages.accountSettings),
          link: Routes.AccountSettings,
          selected: window.location.pathname.includes(Routes.AccountSettings),
        },
        {
          title: intl.formatMessage(messages.permissions),
          link: Routes.Permissions,
          selected: window.location.pathname.includes(Routes.Permissions),
        },
        {
          title: intl.formatMessage(messages.paymentSettings),
          link: Routes.PaymentSettings,
          selected: window.location.pathname.includes(Routes.PaymentSettings),
        },
        {
          title: intl.formatMessage(messages.taxSettings),
          link: Routes.TaxSettings,
          selected: window.location.pathname.includes(Routes.TaxSettings),
        },
        {
          title: intl.formatMessage(messages.editStorefront),
          link: Routes.EditStorefront,
          selected: window.location.pathname.includes(Routes.EditStorefront),
        },
        {
          title: intl.formatMessage(messages.thirdPartyApps),
          link: Routes.ThirdPartyApps,
          selected: window.location.pathname.includes(Routes.ThirdPartyApps),
        },
        {
          title: intl.formatMessage(messages.logout),
          link: Routes.Logout,
          selected: window.location.pathname.includes( Routes.Logout),
        },
      ],
    },
    {
      title: intl.formatMessage(messages.help),
      icon: <StyledIcon icon="help" />,
      link: Routes.Help,
      selected: window.location.pathname.includes(Routes.Help),
    },
  ]
  return (
    <List>
      {items.map(_ => (
        <MenuItem
          key={_.title}
          isSelected={_.selected}
          link={_.link}
          title={_.title}
          icon={_.icon}
          subMenu={_.subMenu}
          history={history}
        />
      ))}
    </List>
  )
}

Sidebar.propTypes = {
  intl: object,
  history: object
}

export default injectIntl(withRouter(Sidebar))
