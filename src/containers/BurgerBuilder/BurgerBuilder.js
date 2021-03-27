import React, { Component } from 'react';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Auxilliary from '../../hoc/Auxilliary/Auxilliary';
import axios from '../../axios-instance'
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import {connect} from 'react-redux';
import * as actions from  '../../store/actions/index';



export class BurgerBuilder extends Component {
    state={
        //ingredient:null,
        //purchasable:false
        purchasing:false
        //loading:false,
        //error:null
    }

    componentDidMount(){
      //  axios.get('https://react-burger-builder-9014a.firebaseio.com/ingredients.json')
        //.then(response=>{
          //  this.setState({ingredient:response.data})
        //}).catch(error=>{this.setState({error:error})})
    //

    this.props.onInitIngredients();
}

    updatePurchaseState=(newPrice)=>{
       // const sum=Object.values(ingredients).reduce(
            //(sum,el)=>{
                //return sum+el;
            //},0);
           // this.setState({
             //   purchasable:newPrice>4
            //})

            return  newPrice>4
    }
    

    /*addIngredient=(type)=>{
        const oldCount =this.state.ingredient[type];
        const updatedCount=oldCount+1;
        const updatedIngredients={
            ...this.state.ingredient
        }
        updatedIngredients[type]=updatedCount;
        const priceAddition=INGREDIENT_PRICES[type];
        const oldPrice=this.state.totalPrice;
        const newPrice=oldPrice+priceAddition;
        this.setState({
             totalPrice:newPrice,
             ingredient:updatedIngredients
        })
    this.updatePurchaseState(newPrice);
    }

    removeIngredient=(type)=>{
        const oldCount =this.state.ingredient[type];
        if(oldCount<=0){
            return;
        }
        const updatedCount=oldCount-1;
        const updatedIngredients={
            ...this.state.ingredient
        }
        updatedIngredients[type]=updatedCount;
        const priceSubtraction=INGREDIENT_PRICES[type];
        const oldPrice=this.state.totalPrice;
        const newPrice=oldPrice-priceSubtraction;
        this.setState({
             totalPrice:newPrice,
             ingredient:updatedIngredients
        })
        this.updatePurchaseState(newPrice);
    }
    */

    purchaseHandler=()=>{
        if(this.props.isAuth){
        this.setState({
            purchasing:true
        })}else{
            this.props.onSetRedirectPath('/checkout');
            this.props.history.push('/auth')
        }
       

    }
    purchaseCancelHandler=()=>{
        this.setState({
            purchasing:false
        })
       
    }
    purchaseContinueHandler=()=>{
        //alert('You Continue!');
     
      /* let queryParams=[];
       for (let i in this.state.ingredient){
        queryParams.push(encodeURIComponent(i)
        +'='+encodeURIComponent(this.state.ingredient[i]));
       }
       queryParams.push('price='+this.state.totalPrice)
       const queryString=queryParams.join('&')
       this.props.history.push({
           pathname:'/checkout',
           search:'?'+queryString,
           //state:this.state.ingriedient
       }); */
      this.props.onInItPurchase()
       this.props.history.push('./checkout')

    } 

    render() {
        const disabledInfo={
            ...this.props.ings
        };
        for (let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key]<=0
        }
        let orderSummary=null;

        let burger=this.props.error ? 
        <p><font color="white">Ingredients can't be loaded!</font></p>
        :<Spinner />
        if(this.props.ings){
         burger=(
            <Auxilliary>
            <Burger ingredients={this.props.ings}/>
        <BuildControls 
        isAuth={this.props.isAuth}
        ingredientAdded={this.props.addIngredient}
        ingredientRemoved={this.props.removeIngredient}
        disabled={disabledInfo}
        price={this.props.totalPrice}
        purchase={this.updatePurchaseState(this.props.totalPrice)}
        purchasing={this.purchaseHandler}/>
        </Auxilliary>
        );
        orderSummary=
            <OrderSummary 
            totalPrice={this.props.totalPrice}
            continue={this.purchaseContinueHandler}
            cancel={this.purchaseCancelHandler}
            ingredients={this.props.ings}/>
         }

         //if(this.state.loading){
           // orderSummary=<Spinner/>
       //}(not required here anymore bcoz we are not 
       //doing anything async while viewing order summary)

        return (
            <Auxilliary>
            
                 <Modal 
                 modalClosed={this.purchaseCancelHandler}
                 show={this.state.purchasing}>
                  {orderSummary}
                 </Modal>
                {burger}
            </Auxilliary>
        )
    }
}

const mapStateToProps=state=>{
    return {
        ings:state.burgerBuilderReducer.ingredient,
        totalPrice:state.burgerBuilderReducer.totalPrice,
        error:state.burgerBuilderReducer.error,
        isAuth:state.authReducer.token!==null
    }
    
}

const mapDispatchToProps=dispatch=>{
    return {
    addIngredient:(ingName)=>dispatch(
        actions.addIngredient(ingName)
    ),
    removeIngredient:(ingName)=>dispatch(
        actions.removeIngredient(ingName)
    ),
    onInitIngredients:()=>dispatch(actions.initIngredients()),
    onInItPurchase:()=>dispatch(actions.purchaseInit()),
    onSetRedirectPath:(path)=>dispatch(actions.setAuthRedirectPath(path))
  }
}

export default connect(mapStateToProps,
    mapDispatchToProps)(WithErrorHandler(
        BurgerBuilder,axios));