import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.css';

const controls=[
    {label:'Salad',type:'salad'},
    {label:'Cheese',type:'cheese'},
    {label:'Bacon',type:'bacon'},
    {label:'Meat',type:'meat'}
]

const BuildControls=(props)=> {
    return (
        <div className={classes.BuildControls}>
        <p>Current Price:<b>&#36;{props.price.toFixed(2)}</b></p>
            {controls.map(ctrl=>{
           return  <BuildControl key={ctrl.label}
           added={()=>
            props.ingredientAdded(ctrl.type)}
            removed={()=>
                props.ingredientRemoved(ctrl.type)}
           label={ctrl.label} 
           disabled={props.disabled[ctrl.type]}/>
            })}
            <button disabled={!props.purchase}
             className={classes.OrderButton}
             onClick={props.purchasing}>{props.isAuth?"ORDER NOW":"SIGN UP TO ORDER!"}</button>

        </div>
    )
}

export default BuildControls
