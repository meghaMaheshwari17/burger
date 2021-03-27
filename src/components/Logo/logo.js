import React from 'react';
import burgerLogo from '../../assets/Images/burger-logo.png';
import classes from './logo.css';
const Logo=(props)=> {
    return (
        <div className={classes.Logo}
        style={{height:props.height,marginBottom:props.marginBottom}}>
            <img src={burgerLogo} alt="burger logo"/>
        </div>
    )
}

export default Logo
