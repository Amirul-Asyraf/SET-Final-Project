import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
// import Sidebar from '../layout/dashboard/sidebar';
import useStyles from '../layout/dashboard/GeneralJSXstyling';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import { Switch, Route} from 'react-router-dom';
import ViewContact from './dashboard/ViewContact';
import AddContact from './dashboard/AddContact';
import EditContact from './dashboard/EditContact';
import { useDispatch } from 'react-redux';
import {resetAuthResponsePerComponent} from '../store/actions/AuthAction';
import ViewStats from './dashboard/ViewStats';


const drawerWidth = 240;

const Dashboard = (props) => {
  const dispatch = useDispatch

  // useEffect(() => {
  //   dispatch(resetAuthResponsePerComponent())
  // }, [dispatch])

  const classes = useStyles();
  const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const logOut = () => {
        localStorage.removeItem('user');
        props.history.push('/');
    }

    const loadPage = (ev, text) => {
        // console.log(ev);
        switch(text) {
          case 'Add Contacts':
              // console.log(props);
              props.history.push('/dashboard/add-contacts');
              break;
          case 'View Contacts':
              props.history.push('/dashboard/view-contacts');
              break;
          case 'Statistics':
            console.log(props);
            props.history.push('/dashboard/view-stats');
            break;
          default:
              break;
          
        }
    }

    const drawer = (
        <div>
          <Toolbar />
          <Divider />
          <List>
            {['Add Contacts', 'View Contacts', 'Statistics'].map((text, index) => (
              <ListItem button key={text} onClick={(ev) => loadPage(ev,text)}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
        </div>
      );

    const container = window !== undefined ? () => window().document.body : undefined;

  return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
            className={classes.appBar}
            position="fixed"
            sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            }}
        >
        <Toolbar>
        <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
        >
            <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" className={classes.title}>
            Contact Manager
        </Typography>
        <Button color="inherit" onClick={logOut}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Box
          component="nav"
          className={classes.drawer}
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
            keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        >
        {drawer}
        </Drawer>
        <Drawer
        variant="permanent"
        sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        open
        >
        {drawer}
        </Drawer>
      </Box>
      {/* <Sidebar props={props} /> */}
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Switch>
          <Route exact path={props.match.path} component={ViewContact} />
          <Route exact path={`${props.match.path}/view-contacts`}  component={ViewContact} />
          <Route exact path={`${props.match.path}/add-contacts`} component={AddContact} />
          <Route exact path={`${props.match.path}/edit-contacts/:id`}  component={EditContact} />
          <Route exact path={`${props.match.path}/view-stats/`}  component={ViewStats} />
        </Switch>
      </Box>
    </Box>
  );
}

Dashboard.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * 
   */
  window: PropTypes.func,
};

export default Dashboard;
