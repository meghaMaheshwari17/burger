import React, { Component } from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios-instance';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler'
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index'
 class Orders extends Component {
     //state={
         //orders:[],
       //  loading:true
     //}
     componentDidMount(){
        // axios.get('/orders.json')
         //.then(response=>{
           //  const fetchedOrders=[]
            // for (let key in response.data){
              //  fetchedOrders.push({
                //    ...response.data[key],
                  //  id:key
                //})
             //}
            //this.setState({ loading:false,orders:fetchedOrders })
         //})
         //.catch(error=>{
           // this.setState({ loading:false })
         //})
           this.props.onFetchOrders(this.props.tokenId,this.props.userId)
     }
     
    render() {
    let orders=<Spinner/>
     
        if(!this.props.loading){
            orders= this.props.orders.map((order)=>{
              return  <Order key={order.id}
              price={order.price}
              ingredients={order.ingredients}
              />
                }
                )
        }
        
        return (
            <div>
            {orders}
            </div>
            )
    }
}
const mapStateToProps=state=>{
    return {
        orders:state.orderReducer.orders,
        loading:state.orderReducer.loading,
        tokenId:state.authReducer.token,
        userId:state.authReducer.userId
    }
}
const mapDispatchToProps=dispatch=>{
    return {
        onFetchOrders:(tokenId,userId)=>dispatch(actions.fetchOrders(tokenId,userId))
    }
}

//export default withErrorHandler(Orders);
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios));