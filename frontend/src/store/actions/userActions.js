import { userService } from '../../services/user.service'

export function setLoggedInUser(user, actionType) {

    return async (dispatch, getState) => {
        try {

            const login = await userService.login(user)
            if (login) {
                const authUser = login.userToSet
                const userRecipes = login.userRecipes
                dispatch({ type: 'SET_USER', authUser })
                dispatch({ type: 'SET_USER_RECIPES', userRecipes })
                return authUser
            } else return false
        } catch (err) {
            console.log('err:', err)
        }
    }
}

export function setUpdatedUser(login) {

    return async (dispatch, getState) => {
        try {
            const updatedUser = await userService.updateUser(login)
            if (login) {
                const authUser = updatedUser.userToSet
                const userRecipes = login.userRecipes
                dispatch({ type: 'SET_USER', authUser })
                dispatch({ type: 'SET_USER_RECIPES', userRecipes })
                return authUser
            } else return false
        } catch (err) {
            console.log('err:', err)
        }
    }
}

export function logout(user) {

    return async (dispatch, getState) => {
        try {

            const userToSet = await userService.logout(user)
            if (userToSet) {
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

            const login = await userService.signUp(user)
            if (login) {
                const authUser = login.userToSet
                console.log(login)
                console.log(authUser)
                const userRecipes = login.userRecipes
                dispatch({ type: 'SET_USER', authUser })
                return authUser
            } else return false
        } catch (err) {
            console.log('err:', err)
        }
    }
}

export function loadUser() {

    return async (dispatch, getState) => {
        try {
            const login = await userService.loadUser()
            if (login) {
                const authUser = login.userToSet
                const userRecipes = login.userRecipes
                dispatch({ type: 'SET_USER', authUser })
                dispatch({ type: 'SET_USER_RECIPES', userRecipes })
                return authUser
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
                dispatch({ type: 'SET_USER', authUser: userToSet })
                return userToSet
            }
        } catch (err) {
            console.log('err:', err)
        }
    }
}

export function removeFromFav(user, recipeId) {
    return async (dispatch, getState) => {
        try {
            const userToSet = await userService.removeFromFav(user, recipeId)
            if (userToSet) {
                dispatch({ type: 'SET_USER', authUser: userToSet })
                return userToSet
            }
        } catch (err) {
            console.log('err:', err)
        }
    }
}


