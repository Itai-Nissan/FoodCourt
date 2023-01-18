import { foodService } from "../../services/food.service"


export function loadFoodList() {

    return async (dispatch, getState) => {
        try {
            // console.log('loading food');
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
    console.log('filterThisBy:', filterBy);

    return (dispatch) => {
        dispatch({ type: 'SET_FILTER_BY', filterBy })
    }
}