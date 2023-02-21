import { storageService } from './storage.service'
import { httpService } from './http.service.js'

export const userService = {
    confirmUser,
    loadUser,
}

const USER_DB = 'FoodyUserDb'
const API = 'user'

async function confirmUser(user, actionType) {

    const userToSet = await httpService.get(API, { user, actionType })
    if (userToSet) {
        storageService.store(USER_DB, userToSet)
    }
    return userToSet
}

function loadUser() {
    const user = storageService.load(USER_DB)
    const userToSet = {
        userName: user.userName,
        userPassword: user.userPassword
    }
    return userToSet
}