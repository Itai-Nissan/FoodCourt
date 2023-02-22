const INITIAL_STATE = {
    loggedInUser: {
        _id: null,
        userName: null,
        userPassword: null,
        userEmail: null,
    }
}

export function userReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'SET_USER':
            
            return {
                ...state,
                loggedInUser: action.userToSet
            }
            
            default:
            return state
    }
}