import { foodService } from "../../services/food.service"


export function loadFoodList() {
    console.log('foodList');

    return async (dispatch, getState) => {
        try {
            console.log('loading food');
            const { filterBy } = getState().foodModule
            // console.log(filterBy)
            const foods = await foodService.getFood(filterBy)
            dispatch({ type: 'SET_FOOD', foods })
            return foods
        } catch (err) {
            console.log('err:', err)
        }
    }
}

export function getFoodById(foodId) {
    // console.log(foodId)

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