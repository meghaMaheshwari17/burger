import React from 'react';
import Logo from '../../Logo/logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Modal/Backdrop/Backdrop';
import Auxilliary from '../../../hoc/Auxilliary/Auxilliary';


const SideDrawer = ( props ) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return (
        <Auxilliary>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')} onClick={props.closed}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuth={props.isAuth}/>
                </nav>
            </div>
        </Auxilliary>
    );
};


export default SideDrawer;
