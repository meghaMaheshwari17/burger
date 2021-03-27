import React from 'react';
import Logo from '../../Logo/logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import classes from './Toolbar.css';


const Toolbar=(props)=> {
  return (<header className={classes.Toolbar}>
     <DrawerToggle clicked={props.toggler}/>
     <Logo height="80%"/>
     <nav className={classes.DesktopOnly}>
     <NavigationItems isAuth={props.isAuth}/>
     </nav>
   </header>)
}

export default Toolbar;
