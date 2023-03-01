import { userService } from '../../services/user.service'

export function setLoggedInUser(user, actionType) {
    // export function setLoggedInUser({ ...user }, actionType) {

    return async (dispatch, getState) => {
        try {

            const userToSet = await userService.login(user)
            if (userToSet) {
                dispatch({ type: 'SET_USER', userToSet })
                return userToSet
            } else return false
        } catch (err) {
            console.log('err:', err)
        }
    }
}

export function logout(user) {
    // export function setLoggedInUser({ ...user }, actionType) {

    return async (dispatch, getState) => {
        try {

            const userToSet = await userService.logout(user)
            if (userToSet) {
                console.log(userToSet);
                dispatch({ type: 'SET_USER', userToSet })
                return userToSet
            } else return false
        } catch (err) {
            console.log('err:', err)
        }
    }
}

export function setSignUp(user) {

    return async (dispatch, getState) => {
        try {

            const userToSet = await userService.signUp(user)
            if (userToSet) {
                dispatch({ type: 'SET_USER', userToSet })
                return userToSet
            } else return false
        } catch (err) {
            console.log('err:', err)
        }
    }
}

export function loadUser() {

    return async (dispatch, getState) => {
        try {
            const userToSet = await userService.loadUser()
            if (userToSet) {
                dispatch({ type: 'SET_USER', userToSet })
                return userToSet
            }
        } catch (err) {
            console.log('err:', err)
        }
    }
}

export function addToFav(user, food) {

    return async (dispatch, getState) => {
        try {
            const userToSet = await userService.addToFav(user, food)
            if (userToSet) {
                dispatch({ type: 'SET_USER', userToSet })
                return userToSet
            }
        } catch (err) {
            console.log('err:', err)
        }
    }
}