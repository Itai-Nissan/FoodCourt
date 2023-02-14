import { userService } from '../../services/user.service'

export function setLoggedInUser({ ...user }) {
    console.log('heeeeeeere');

    return async (dispatch, getState) => {
        try {
            const userToSet = await userService.confirmUser(user)
            dispatch({ type: 'SET_USER', userToSet })
            return userToSet
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
