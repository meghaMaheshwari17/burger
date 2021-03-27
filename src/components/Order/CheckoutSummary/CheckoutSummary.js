import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Modal/Button/Button';
import classes from './CheckoutSummary.css'

const CheckoutSummary=(props)=> {
    return (
        <div className={classes.CheckoutSummary}>
            <h1 style={{color:'white'}}>We hope it taste well!</h1>
            <div style={{width:'100%',margin:'auto'}}> 
            <Burger ingredients={props.ingredients}/>
            </div>
            <Button
            clicked={props.checkoutCancelled}
            btnType="Danger">CANCEL</Button>
            <Button 
            clicked={props.checkoutContinued}
            btnType="Success">CONTINUE</Button>
        </div>
    )
}

export default CheckoutSummary;
