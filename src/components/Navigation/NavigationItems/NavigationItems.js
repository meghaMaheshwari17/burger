import React from 'react'
import NavigationItem from './NavigationItem/NavigationItem'
import classes from './NavigationItems.css'
const NavigationItems=(props)=> {
    return <ul className={classes.NavigationItems}>
      <NavigationItem exact navLink="/">
       Burger Builder
      </NavigationItem>
      {props.isAuth ?<NavigationItem navLink="/orders">
       Orders
      </NavigationItem> : null};
      {props.isAuth ? <NavigationItem navLink="/logout">
       Log Out
      </NavigationItem>:
      <NavigationItem navLink="/auth">
      Authenticate
     </NavigationItem>
      }    
    </ul>
}

export default NavigationItems;
