import React, { useEffect, useState } from 'react'
import { object, string, bool, array, number } from 'prop-types';
import styled from 'styled-components';
import { List, ListItem, ListItemIcon, ListItemText, Collapse, ListItemSecondaryAction } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Routes from 'containers/AdminPanel/Router/Routes.json';
import { injectIntl } from 'react-intl';
import Icon from 'components/Common/Icon';
import messages from './messages';
import PromptConfirmModal from '../Modals/PromptConfirmModal';
import history from '../../../../utils/history'
import { countCustomerSupport } from './api'

const AdapterLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);

const ArrowIcon = styled(Icon).attrs(props => ({
  color: props.theme.colors.homiPrimary,
  width: 10,
  height: 15,
}))``;

const ArrowUp = () => (
  <div style={{ transform: 'rotate(-90deg)' }}>
    <ArrowIcon icon="arrow" />
  </div>
);

const ArrowDown = () => (
  <div style={{ transform: 'rotate(90deg)' }}>
    <ArrowIcon icon="arrow" />
  </div>
);

const StyledCounter = styled.div`
  && {
      background: #827FFF;
      border: 0.5px solid rgba(0, 0, 0, 0.04);
      box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.149);
      border-radius: 13.75px;
      padding-left: 5px;
      padding-right : 5px;
      font-family: Montserrat;
      font-style: normal;
      font-weight: 600;
      font-size: 12px;
      line-height: 15px;
      color: #FFFFFF;
  }
`
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
      // background-color: ${({ theme }) => theme.colors.homiPrimary};
      // .MuiListItemText-primary {
      //   color: ${({ theme }) => theme.colors.homiWhite};
      // }
    }
  }
`;

const StyledSubmenuItem = styled(ListItem)`
  && {
    height: 30px;
    padding-left: 60px;
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
`;

const StyledIcon = styled(Icon).attrs(props => ({
  color: props.theme.colors.homiWhite,
}))``;

const MenuItem = ({ intl, isSelected, link, title, action, icon, subMenu }) => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const renderLinkItem = () =>
    action === "logout" ?
      <StyledItem selected={isSelected} button onClick={handleClick} key={title}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={title} />
        <PromptConfirmModal
          isOpen={open}
          promptButtonAction={() => { history.push(Routes.AdminPanel + link)}}
          promptButtonTitle={intl.formatMessage(messages.logoutConfirm)}
          title={intl.formatMessage(messages.logoutPrompt)}
          desc={intl.formatMessage(messages.logoutPromptDesc)}
        />
      </StyledItem> : <StyledItem selected={isSelected} button onClick={handleClick} component={AdapterLink} to={Routes.AdminPanel + link} key={title}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={title} />
      </StyledItem>

  ;

  const renderSubmenuItem = item => (
    <StyledSubmenuItem
      selected={item.selected}
      component={AdapterLink}
      to={Routes.AdminPanel + item.link}
      key={item.title}
    >
      <ListItemIcon />
      <ListItemText primary={item.title} key={item.title} />
      {item.count !== undefined && <ListItemSecondaryAction><StyledCounter>{item.count}</StyledCounter></ListItemSecondaryAction>}
    </StyledSubmenuItem>
  );

  const renderSubmenu = () => (
    <>
      <StyledItem button onClick={handleClick}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={title} />
        {open || isSelected ? <ArrowDown /> : <ArrowUp />}
      </StyledItem>
      <Collapse in={open || isSelected} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {subMenu.map(s => renderSubmenuItem(s))}
        </List>
      </Collapse>
    </>
  );
  if (subMenu.length > 0) return renderSubmenu();
  return renderLinkItem();
};

MenuItem.propTypes = {
  intl: object,
  isSelected: bool,
  link: string,
  count: number,
  action: string,
  title: string,
  icon: object,
  subMenu: array,
};

MenuItem.defaultProps = {
  subMenu: [],
};

const Sidebar = ({ intl }) => {
  const [data, setData] = useState(0)
  const getReportData = () => {
    countCustomerSupport()
      .then(res => {
        setData(res.data.new + res.data.pending + res.data.solved + res.data.open)
      })
  }
  useEffect(() => {
    getReportData()
  }, [])

  const items = [
    {
      title: intl.formatMessage(messages.dashboard),
      icon: <StyledIcon icon="dashboard" />,
      link: Routes.AdminPanel,
      selected: window.location.pathname.includes(Routes.UserAnalytics),
      subMenu: [
        {
          title: intl.formatMessage(messages.generalOverview),
          link: Routes.Dashboard,
          selected: window.location.pathname === Routes.AdminPanel,
        },
        {
          title: intl.formatMessage(messages.userAnalytics),
          link: Routes.UserAnalytics,
          selected: window.location.pathname.includes(Routes.UserAnalytics),
        },
        {
          title: intl.formatMessage(messages.advertisingAnalytics),
          link: Routes.AdvertisingAnalytics,
          selected: window.location.pathname.includes(Routes.AdvertisingAnalytics),
        },
        {
          title: intl.formatMessage(messages.teamPerformance),
          link: Routes.TeamPerformance,
          selected: window.location.pathname.includes(Routes.TeamPerformance),
        },
      ],
    },
    {
      title: intl.formatMessage(messages.orders),
      icon: <StyledIcon icon="orders" />,
      selected: window.location.pathname.includes(Routes.Order),
      subMenu: [
        {
          title: intl.formatMessage(messages.orders),
          link: Routes.Order,
          selected: window.location.pathname.includes(Routes.Order),
          count: 0,
        },
        {
          title: intl.formatMessage(messages.returns),
          link: Routes.Return,
          selected: window.location.pathname.includes(Routes.Return),
          count: 0,
        },
        {
          title: intl.formatMessage(messages.cancellations),
          link: Routes.Cancellation,
          selected: window.location.pathname.includes(Routes.AdvertisingAnalytics),
          count: 0,
        },
        {
          title: intl.formatMessage(messages.claims),
          link: Routes.Claim,
          selected: window.location.pathname.includes(Routes.TeamPerformance),
          count: 0,
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
      title: intl.formatMessage(messages.users),
      icon: <StyledIcon icon="users" />,
      selected: window.location.pathname.includes('/users/'),
      subMenu: [
        {
          title: intl.formatMessage(messages.support),
          link: Routes.Support,
          selected: window.location.pathname.includes(Routes.Support),
          count: data,
        },
        {
          title: intl.formatMessage(messages.verifySuppliers),
          link: Routes.VerifySupplier,
          selected: window.location.pathname.includes(Routes.VerifySupplier),
          count: 0,
        },
        {
          title: intl.formatMessage(messages.userAccounts),
          link: Routes.UserAccount,
          selected: window.location.pathname.includes(Routes.UserAccount),
        },
        {
          title: intl.formatMessage(messages.sendNotifications),
          link: Routes.SendNotification,
          selected: window.location.pathname.includes(Routes.SendNotification),
        },
      ],
    },
    {
      title: intl.formatMessage(messages.reported),
      icon: <StyledIcon icon="reported" />,
      selected: window.location.pathname.includes(Routes.ReportedItems),
      subMenu: [
        {
          title: intl.formatMessage(messages.items),
          link: Routes.ReportedItems,
          selected: window.location.pathname.includes(Routes.Order),
          count: 0,
        },
        {
          title: intl.formatMessage(messages.users),
          link: Routes.ReportedUsers,
          selected: window.location.pathname.includes(Routes.Return),
          count: 0,
        },
        {
          title: intl.formatMessage(messages.reviews),
          link: Routes.ReportedReviews,
          selected: window.location.pathname.includes(Routes.AdvertisingAnalytics),
          count: 0,
        },
      ],
    },
    {
      title: intl.formatMessage(messages.reportGenerator),
      icon: <StyledIcon icon="reportGenerator" />,
      link: Routes.ReportGenerator,
      selected: window.location.pathname.includes(Routes.ReportGenerator),
    },
    {
      title: intl.formatMessage(messages.content),
      icon: <StyledIcon icon="content" />,
      link: Routes.Content,
      selected: window.location.pathname.includes(Routes.Content),
      subMenu: [
        {
          title: intl.formatMessage(messages.policies),
          link: Routes.Policies,
          selected: window.location.pathname.includes(Routes.Order),
        },
        {
          title: intl.formatMessage(messages.helpSection),
          link: Routes.HelpSection,
          selected: window.location.pathname.includes(Routes.Return),
        },
        {
          title: intl.formatMessage(messages.communityBoard),
          link: Routes.CommunityBoard,
          selected: window.location.pathname.includes(Routes.AdvertisingAnalytics),
        },
        {
          title: intl.formatMessage(messages.macros),
          link: Routes.Macros,
          selected: window.location.pathname.includes(Routes.AdvertisingAnalytics),
        },
      ],
    },
    {
      title: intl.formatMessage(messages.settings),
      icon: <StyledIcon icon="settings" />,
      link: Routes.Settings,
      selected: window.location.pathname.includes(Routes.Settings),
      subMenu: [
        {
          title: intl.formatMessage(messages.permissions),
          link: Routes.Permissions,
          selected: window.location.pathname.includes(Routes.Order),
        },
        {
          title: intl.formatMessage(messages.userMetricSettings),
          link: Routes.UserMetricSettings,
          selected: window.location.pathname.includes(Routes.Return),
        },
        {
          title: intl.formatMessage(messages.languageRegion),
          link: Routes.LanguageRegion,
          selected: window.location.pathname.includes(Routes.AdvertisingAnalytics),
        },
        {
          title: intl.formatMessage(messages.devFeatures),
          link: Routes.DevFeatures,
          selected: window.location.pathname.includes(Routes.AdvertisingAnalytics),
        },
        {
          title: intl.formatMessage(messages.thirdPartyApps),
          link: Routes.ThirdPartyApps,
          selected: window.location.pathname.includes(Routes.AdvertisingAnalytics),
        },
      ],
    },
    {
      title: intl.formatMessage(messages.logout),
      icon: <StyledIcon icon="logout" />,
      action: "logout",
      link: Routes.Logout,
    },
  ];
  return (
    <List>
      {items.map(_ => (
        <MenuItem intl={intl} isSelected={_.selected} key={_.title} count={_.count} action={_.action} link={_.link} title={_.title} icon={_.icon} subMenu={_.subMenu} />
      ))}
    </List>
  );
};

Sidebar.propTypes = {
  intl: object,
};

export default injectIntl(Sidebar);
