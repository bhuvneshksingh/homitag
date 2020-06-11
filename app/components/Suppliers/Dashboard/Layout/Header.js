import React from 'react'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles'
import Routes from 'containers/Suppliers/Router/Routes.json'
import {
  Drawer,
  AppBar,
  Toolbar,
  Divider,
  Badge,
  Avatar,
} from '@material-ui/core'
import LogoImg from 'assets/images/logo.svg'
import Icon from 'components/Common/Icon'
import history from '../../../../utils/history'
import addCirclePurple from '../../../../assets/images/icons/addCirclePurple.svg'
import Sidebar from './Sidebar'

const drawerWidth = 293
const StyledBadge = styled(Badge)`
  && {
    margin: 0 20px;
    span {
      height: 10px;
      min-width: 10px;
      padding: 0;
      font-size: 8px;
    }
  }
`
const BadgeIcon = styled(Icon).attrs(props => ({
  color: props.theme.colors.homiPrimary,
}))``
const useStyles = makeStyles(theme => ({
  toolbar: {
    paddingRight: 24,
    justifyContent: 'flex-end',
    height: '100%',
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  logoWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 8px',
    backgroundColor: theme.colors.homiBlack,
    borderBottom: '1px solid #4D4A4A',
    height: '86px',
  },
  logo: {
    width: '130px',
    height: '32px',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: theme.colors.homiWhite,
    boxShadow: 'none',
    borderBottom: `1px solid ${theme.colors.homiGrey}`,
    height: '86px',
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: theme.colors.homiBlack,
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
}))

const ActiveMarker = styled.div`
  height: 5px;
  width: 40px;
  margin-bottom: -35px;
  border-radius: 10px;
  background: ${({ isActive, theme }) => {
    const border = isActive ? theme.colors.homiPrimary : 'rgba( 0, 0, 0, 0 )'
    return border
  }};
`
const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const AddProduct = styled.img`
  margin-left: 5px;
  margin-bottom: 22px;
  &&:hover {
    cursor: pointer;
  }
`
const Header = () => {
  const classes = useStyles()
  const addProductIsActive =
    history.location.pathname === '/suppliers/new-product' || false

  return (
    <>
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, classes.appBarShift)}
        color="default"
      >
        <Toolbar className={classes.toolbar}>
          <IconContainer>
            <Link to={`${Routes.Suppliers}/new-product`}>
              <AddProduct src={addCirclePurple} />
            </Link>
            <ActiveMarker isActive={addProductIsActive} />
          </IconContainer>
          <StyledBadge badgeContent={4} color="secondary">
            <BadgeIcon icon="chat" />
          </StyledBadge>
          <StyledBadge badgeContent={4} color="secondary">
            <BadgeIcon icon="bell" />
          </StyledBadge>
          <Avatar>M</Avatar>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        open
      >
        <Link to="/suppliers">
          <div className={classes.logoWrapper}>
            <img src={LogoImg} alt="Logo" className={classes.logo} />
          </div>
        </Link>
        <Divider />
        <Sidebar />
      </Drawer>
    </>
  )
}

export default Header
