import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Link, NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <b>
                <Link to="/" style={{textDecoration: 'none', color:'white'}}>Contact Manager</Link>
            </b>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            
          </Typography>
          <NavLink to="/home">
            <Button style={{textDecoration:'none', color: 'white'}}>LOGIN</Button>
          </NavLink>
          <NavLink to="/home/register">
            <Button style={{textDecoration:'none', color: 'white'}}>REGISTER</Button> 
          </NavLink>
        </Toolbar>
      </AppBar>
    </Box>
  );
}