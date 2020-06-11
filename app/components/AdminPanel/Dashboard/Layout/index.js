import React from 'react';
import { array, oneOfType, object } from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Container, CssBaseline, Drawer, Divider } from '@material-ui/core';
import LogoImg from 'assets/images/logo.svg';
import Sidebar from './Sidebar';

const drawerWidth = 293;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: {
    minHeight: '86px',
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    maxWidth: 'none',
    padding: '24px',
    borderTop: '1px solid #EAEAEA'
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
}));

const DashboardLayout = ({ children }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        open
      >
        <div className={classes.logoWrapper}>
          <img src={LogoImg} alt="Logo" className={classes.logo} />
        </div>
        <Divider />
        <Sidebar />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container className={classes.container}>{children}</Container>
      </main>
    </div>
  );
};

DashboardLayout.propTypes = {
  children: oneOfType([array, object]),
};

export default DashboardLayout;
