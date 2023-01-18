import { useDispatch as dispatch } from 'react-redux'

const INITIAL_STATE = {
    foods: null,
    filterBy: '',
    test: 'Yes this is a test'
}


// action = {type: SET_FOODS, foods: [...]}
export function foodReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'SET_FOOD':
            return {
                ...state,
                foods: action.foods
            }

        case 'ADD_FOOD':
            return {
                ...state,
                foods: [...state.foods, action.food]
            }

        case 'REMOVE_FOOD':
            return {
                ...state,
                foods: state.foods.filter(food => food._id !== action.foodId)
            }

        case 'UPDATE_FOOD':
            return {
                ...state,
                foods: state.foods.map(food => food._id === action.food._id ? action.food : food)
            }

        case 'SET_FILTER_BY':
            return {
                ...state,
                filterBy: action.filterBy 
            }

        default:
            return state;
    }

}