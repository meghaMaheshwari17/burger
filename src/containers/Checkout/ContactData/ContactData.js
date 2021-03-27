import React, { Component } from 'react'
import Button from '../../../components/UI/Modal/Button/Button'
import classes from './ContactData.css';
import axios from '../../../axios-instance';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';
import withErrorHandler from '../../../hoc/WithErrorHandler/WithErrorHandler'
import * as actionOrder from '../../../store/actions/index'
import {updateObject,checkValidity} from '../../../shared/utility';

class ContactData extends Component {
    state={
       orderForm:{
            name:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Name'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
             street:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Street'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            zipCode:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Postal Code'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:5,
                    maxLength:5
                },
                valid:false,
                touched:false
            },
            country:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Country'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Your email'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
        deliveryMethod:{
            elementType:'select',
            elementConfig:{
               options:[{value:'fastest',displayValue:'Fastest'}
            ,{value:'cheapest',displayValue:'Cheapest'}],
            },
            value:'fastest',
            valid:true,
            validation:{}
        }
       },
       formValid:false
       //loading:false
    }
    orderHandler=(event)=>{
        event.preventDefault();
        //this.setState({
          //  loading:true
        //})
        const formData={};
        for (let elementIdentifier in this.state.orderForm){
            formData[elementIdentifier]=
            this.state.orderForm[elementIdentifier].value;
            //deliveryMethod=fastest
        }
        const order={
            ingredients:this.props.ings,
            price:this.props.totalPrice,
            orderData:formData,
            userId:this.props.userId
        }

        this.props.onOrderBurger(order,this.props.tokenId)
      //  axios.post('/orders.json',order)
        //.then(response=>{
          //  this.setState({loading:false})
            //this.props.history.push('/')
        //}).catch(error=>this.setState({loading:false}));

        
    }

   
 
    inputChangedHandler = (event, inputIdentifier) => {
        // const updatedOrderForm = {
        //     ...this.state.orderForm
        // };
        // const updatedFormElement = { 
        //     ...updatedOrderForm[inputIdentifier]
        // };
        const updatedFormElement=updateObject(this.state.orderForm[inputIdentifier],{
            value:event.target.value,
            valid:checkValidity(event.target.value, this.state.orderForm[inputIdentifier].validation),
            touched:true
        })
        // updatedFormElement.value = event.target.value;
        // updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        // updatedFormElement.touched = true;
        const updatedOrderForm = updateObject(this.state.orderForm,{
            [inputIdentifier] : updatedFormElement
        })
        //updatedOrderForm[inputIdentifier] = updatedFormElement;
        
        let formIsValid = true;
        for ( inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({orderForm: updatedOrderForm, formValid: formIsValid});
    }

    render() {
        let formElementsArray=[];
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id:key,
                config:this.state.orderForm[key]
            })
        }
        let form=(
            
               <form> 
               {/*<Input elementType="" elementConfig="" value=""/>*/}
               {formElementsArray.map(formElement=>{
              return    <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                   value={formElement.config.value}
                   invalid={!formElement.config.valid}
                   shouldValidate={formElement.config.validation}
                   touched={formElement.config.touched}
                   changed={
                    (event)=>
                    this.inputChangedHandler(event,formElement.id)} />
               })}
               <Button 
               clicked={this.orderHandler}
               btnType="Success"
               disabled={!this.state.formValid}
               >Order</Button>
               </form>

        );
        if(this.props.loading){
            form=<Spinner/>
        }

        return (
            <div className={classes.ContactData}>
            <h4 style={{color:'white'}}>Enter your
             Contact Data </h4> 
             {form}
            </div>
        )
    }
}

const mapStateToProps=state=>{
    return{
        ings:state.burgerBuilderReducer.ingredient,
        totalPrice:state.burgerBuilderReducer.totalPrice,
        loading:state.burgerBuilderReducer.loading,
        tokenId:state.authReducer.token,
        userId:state.authReducer.userId
    }
}

const mapDispatchToProps=dispatch=>{
    return{
    onOrderBurger:(orderData,tokenId)=>dispatch(actionOrder.purchaseBurger(orderData,tokenId))
}
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));