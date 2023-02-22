import { userService } from '../../services/user.service'

export function setLoggedInUser(user, actionType) {
    // export function setLoggedInUser({ ...user }, actionType) {

    return async (dispatch, getState) => {
        try {
            console.log(user);
            console.log(actionType);

            const userToSet = await userService.confirmUser(user, actionType)
            if (userToSet || actionType === 'logout') {
                console.log('user to seeet:',userToSet);
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