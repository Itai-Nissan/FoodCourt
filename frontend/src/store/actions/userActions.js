import { userService } from '../../services/user.service'

export function setLoggedInUser({ ...user }, actionType) {

    return async (dispatch, getState) => {
        try {
            const userToSet = await userService.confirmUser(user, actionType)
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
