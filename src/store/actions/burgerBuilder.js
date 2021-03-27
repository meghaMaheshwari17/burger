import * as  actionTypes from './actionTypes';
import axios from '../../axios-instance'

export const addIngredient=(name)=>{
    return{
        type:actionTypes.ADD_INGREDIENT,
        ingredientName:name
    }
}

export const removeIngredient=(name)=>{
    return{
        type:actionTypes.REMOVE_INGREDIENT,
        ingredientName:name
    }
}

export const setIngredients=(ingredients)=>{
    return {
        type:actionTypes.SET_INGREDIENTS,
        ingredients:ingredients
    }
}

export const fetch_ingredientsFailed=()=>{
    return {
        type:actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients=()=>{
    return dispatch=>{
        axios.get('https://react-burger-builder-9014a.firebaseio.com/ingredients.json')
        .then(response=>{
           dispatch(setIngredients(response.data))
        })
        .catch(error=>{
           dispatch(fetch_ingredientsFailed())
        })
    }
}

