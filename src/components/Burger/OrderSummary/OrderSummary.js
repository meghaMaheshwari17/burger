import React from 'react'
import Auxilliary from '../../../hoc/Auxilliary/Auxilliary';
import Button from '../../UI/Modal/Button/Button';


const OrderSummary =(props)=> {
    
    const ingredientSummary=Object.keys(
        props.ingredients).map(igKey=>{
        return <li key={igKey}><font size="1">
        <span style={{textTransform:'capitalize'}}
        >{igKey}:{props.ingredients[igKey]}</span>
        </font>
        </li>
        })
       
    return (
        <Auxilliary>
            <h3>Your Order</h3>
            <p><font size="1">A delicious burger with the following
            ingredients:</font> </p>
            <ul>
            {ingredientSummary}
            </ul>
            <p><font size="1">
            <b>Total Price:</b>&#36;
            {props.totalPrice.toFixed(2)}<br></br>
            Continue to Checkout?
            </font>
            </p>
            <Button clicked={props.cancel} 
            btnType="Danger">CANCEL</Button>
            <Button clicked={props.continue}
            btnType="Success">CONTINUE</Button>
           
        </Auxilliary>
    );
        
}

export default OrderSummary;
