import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import {connect} from 'react-redux'
import ContactData from '../Checkout/ContactData/ContactData'
class Checkout extends Component {


    /* state={
        ingredients:null,totalPrice:0
    }
     componentWillMount(){
        const query=new URLSearchParams(this.props.location.search)
        const ingredients={};
        let price=0;
        for (let param of query.entries()){
            if(param[0]==='price'){
                 price=param[1]
            }else{
                ingredients[param[0]] = +param[1];
            }
        } 
        this.setState({
            ingredients:ingredients,
            totalPrice:price
        })
    } */

    checkoutCancelledHandler=()=>{
        this.props.history.goBack();
    }
    checkoutContinuedHandler=()=>{
        this.props.history.replace('/checkout/contact-data');
        
    }
    
    render() {
        let summary=<Redirect to="/"/>
        
        if (this.props.ings){
            const purchasedRedirect=this.props.purchased ? 
            <Redirect to="/" /> :null
            
            summary=(<div>
                {purchasedRedirect}
                <CheckoutSummary
            //ingredients={this.props.location.state}
            ingredients={this.props.ings}
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler}
            />
             <Route path={this.props.match.url+'/contact-data'}
                  //render={(props)=>(<ContactData ingredients={this.state.ingredients}
                    //price={this.state.totalPrice}
                    //{...props}/> )}
                    component={ContactData}
                    />
            </div>
            )
        }
        
        return summary
    }
}

const mapStateToProps=state=>{
    return {
       ings:state.burgerBuilderReducer.ingredient,
       purchased:state.orderReducer.purchased
    }
}





export default connect(mapStateToProps)(Checkout);
