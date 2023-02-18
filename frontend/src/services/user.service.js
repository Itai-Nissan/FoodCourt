import { storageService } from './storage.service'

export const userService = {
    confirmUser,
    loadUser,
}

const USER_DB = 'FoodyUserDb'

function confirmUser(user, actionType) {
    const { id, userName, userPassword } = user
    if (actionType === 'signup') {
        storageService.store(USER_DB, user)
        return user
    }
    if (actionType === 'login') {
        if (userName === 'itai' && userPassword === 'niss') {
            storageService.store(USER_DB, user)
            return user
        }
    }
    if (actionType === 'logout') {
        return user
    }
}

function loadUser() {
    const user = storageService.load(USER_DB)
    const userToSet = {
        id: user.id,
        userName: user.userName,
        userEmail: user.userEmail
    }
    return userToSet
}