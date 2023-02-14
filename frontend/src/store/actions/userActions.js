import { userService } from '../../services/user.service'

export function setLoggedInUser({ ...user }) {

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
