import React, { Component } from 'react'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Modal/Button/Button'
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux'
import Spinner from '../../components/UI/Spinner/Spinner'
//import authReducer from '../../store/reducers/auth';
import {updateObject,checkValidity} from '../../shared/utility';
import { Redirect } from 'react-router';

class Auth extends Component {
    state={
        controls:{
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'enter email address'
                },
                value:'',
                validation:{
                    required:true,
                    isEmail:true
                },
                valid:false,
                touched:false
            },
            password:{
                elementType:'input',
                elementConfig:{
                    type:'password',
                    placeholder:'enter password'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:6
                },
                valid:false,
                touched:false
            }
        },
        isSignUp:true
    }

    switchAuthHandler=()=>{
        this.setState(prevState=>{
            return{
                isSignUp:!prevState.isSignUp
            }
        })
    
    }
    componentDidMount(){
        if(!this.props.building && this.props.authRedirect!=='/'){
            this.props.onSetAuthRedirectPath()
        }
    }
    

    
    inputChangedHandler = (event, controlName) => {
        // const updatedControls={
        //     ...this.state.controls,
        //     [controlName]:{
        //         ...this.state.controls[controlName],
        //         value:event.target.value,
        //         valid:this.checkValidity(event.target.value,this.state.controls[controlName].validation),
        //         touched:true
        //     }
        // }
        const updatedControls=updateObject(this.state.controls,{
            [controlName]:updateObject(this.state.controls[controlName],{
                value:event.target.value,
                valid:checkValidity(event.target.value,this.state.controls[controlName].validation),
                touched:true
            })
        })
        this.setState({controls:updatedControls});
    }

    submitHandler=(event)=>{
        event.preventDefault()
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignUp)
    }

    render() {
        let formElementsArray=[];
        for(let key in this.state.controls){
            formElementsArray.push({
                id:key,
                config:this.state.controls[key]
            })
        }
        let form=formElementsArray.map(formElement=>{
            return <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
             elementConfig={formElement.config.elementConfig}
             value={formElement.config.value}
             invalid={!formElement.config.valid}
             shouldValidate={formElement.config.validation}
             touched={formElement.config.touched}
             changed={
              (event)=>
             this.inputChangedHandler(event,formElement.id)} 
            />
    
        })

        if(this.props.loading){
            form=<Spinner/>
        }

        let errorMessage=null;
        if(this.props.error){
                    errorMessage=(<p style={{color:"red"}}>{this.props.error.message}</p>)
           
        }
        let authRedirect=null;
        if(this.props.isAuth){
            authRedirect=<Redirect to={this.props.authRedirect}/>
        }
        return (
            <div className={classes.Auth}>
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                   {form}
                   <Button btnType="Success">{this.state.isSignUp?"Sign Up":"Sign In"}</Button>
                </form><br></br>
                <Button
                clicked={this.switchAuthHandler}
                btnType="Danger">Switch To {this.state.isSignUp?"SignIn":"SignUp"}</Button>
                {authRedirect}
            </div>
        )
    }
}

const mapStateToProps=state=>{
    return {
        loading:state.authReducer.loading,
        error:state.authReducer.error,
        isAuth:state.authReducer.token!==null,
        building:state.burgerBuilderReducer.building,
        authRedirect:state.authReducer.authRedirect
    }
}

const mapDispatchToProps=dispatch=>{
    return {
        onAuth:(email,password,isSignUp)=>dispatch(actions.auth(email,password,isSignUp)),
        onSetAuthRedirectPath:()=>dispatch(actions.setAuthRedirectPath('/'))

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);
