import { foodService } from "../../services/food.service"


export function loadFoodList(startPoint, amountToRturn) {

    return async (dispatch, getState) => {
        try {
            dispatch({ type: 'SET_FOOD', undefined })
            const { filterBy } = getState().foodModule
            const foods = await foodService.getFood(filterBy, startPoint, amountToRturn)
            dispatch({ type: 'SET_FOOD', foods })
            return foods
        } catch (err) {
            console.log('err:', err)
        }
    }
}

export function getFoodById(foodId) {

    return async (dispatch) => {
        try {
            const foodById = await foodService.getById(foodId)
            dispatch({ type: 'SET_FOOD_BY_ID', foodById })
            return foodById
        } catch (err) {
            console.log('err:', err)
        }
    }
}

export function removeFood(foodId) {

    return async (dispatch, getState) => {
        try {
            const food = await foodService.remove(foodId)
            dispatch({ type: 'REMOVE_FOOD', foodId })
            return food
        } catch (err) {

            console.log('err:', err)
        }
    }
}

export function setFilterBy(filterBy) {

    return (dispatch) => {
        dispatch({ type: 'SET_FILTER_BY', filterBy })
    }
}

export function setAddUserRecipe(user, recipe) {

    return async (dispatch, getState) => {
        try {
            const authUser = await foodService.addNewRecipe(user, recipe)
            if (authUser) {
                return authUser
            }
        } catch (err) {
            console.log('err:', err)
        }
    }
}

export function setUpdateUserRecipe(user, recipe) {
    console.log(user);

    return async (dispatch, getState) => {
        try {
            const authUser = await foodService.editRecipe(user, recipe)
            if (authUser) {
                return authUser
            }
        } catch (err) {
            console.log('err:', err)
        }
    }
}