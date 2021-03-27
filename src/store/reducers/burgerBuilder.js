import * as actionTypes from  '../actions/actionTypes';
import { updateObject } from '../../shared/utility'
const INGREDIENT_PRICES={
    salad:0.5,
    cheese:0.4,
    meat:1.3,
    bacon:0.7
};

const initialState={
    ingredient:null,
    totalPrice:4,
    error:false,
    building:false
};

const addIngredient=(state,action)=>{
    let updatedIngredient={[action.ingredientName]: state.ingredient[action.ingredientName]+1}
            let updatedIngredients=updateObject(state.ingredient,updatedIngredient);
            let updatedState={
                ingredient:updatedIngredients,
                totalPrice:state.totalPrice+INGREDIENT_PRICES[action.ingredientName],
                building:true
            }
             return updateObject(state,updatedState)
}

const removeIngredient=(state,action)=>{
    let updatedIng={[action.ingredientName]: state.ingredient[action.ingredientName]-1}
            let updatedIngs=updateObject(state.ingredient,updatedIng);
            let updatedSt={
                ingredient:updatedIngs,
                totalPrice:state.totalPrice-INGREDIENT_PRICES[action.ingredientName],
                building:true
            }
             return updateObject(state,updatedSt)
}
const setIngredients=(state,action)=>{
    return updateObject(state,{
        ingredient:{
           salad:action.ingredients.salad,
             bacon:action.ingredients.bacon,
             cheese:action.ingredients.cheese,
             meat:action.ingredients.meat
         },
         error:false,
         totalPrice:4,
         building:false
      })
}
const fetchIngredientsFailed=(state,action)=>{
    return updateObject(state,{error:true})
}
const burgerBuilderReducer=(state=initialState,action)=>{
     switch(action.type){
         case actionTypes.ADD_INGREDIENT:return addIngredient(state,action)
             
         case actionTypes.REMOVE_INGREDIENT:return removeIngredient(state,action);
            
         case actionTypes.SET_INGREDIENTS:return setIngredients(state,action)
             
            // return {
              //   ...state,
                // ingredient:{
                  //   salad:action.ingredients.salad,
                    // bacon:action.ingredients.bacon,
                     //cheese:action.ingredients.cheese,
                   //  meat:action.ingredients.meat
                // },
                // error:false,
                // totalPrice:4
            // }
        
             case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state,action)
                 //return {
                  //   ...state,
                  //   error:true
                 //}
        default: return state;
          
     }
     
}

export default burgerBuilderReducer