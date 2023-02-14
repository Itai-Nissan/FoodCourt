const INITIAL_STATE = {
    loggedInUser: {
        id: null,
        userName: '',
        password: null,
        email: ''
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