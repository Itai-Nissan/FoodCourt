const INITIAL_STATE = {
    loggedInUser: {
        _id: null,
        fullName: null,
        userName: null,
        userPassword: null,
        userEmail: null,
        userFavorite: [],
        userRecipe: []
    }
}

export function userReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'SET_USER':

            return {
                ...state,
                loggedInUser: action.authUser
            }

        case 'SET_USER_RECIPES':

            return {
                ...state,
                userRecipes: action.userRecipes
            }

        default:
            return state
    }
}