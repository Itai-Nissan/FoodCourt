import { storageService } from './storage.service'
import { httpService } from './http.service.js'

export const userService = {
    confirmUser,
    loadUser,
    addToFav,
}

const USER_DB = 'FoodyUserDb'
const API = 'user'

async function confirmUser(user, actionType) {

    if (actionType === 'logout') return storageService.store(USER_DB, user)
    else {
        const userToSet = await httpService.get('user', { user, actionType })
        if (userToSet) {
            storageService.store(USER_DB, userToSet)
        }
        return userToSet
    }
}

function loadUser() {
    const user = storageService.load(USER_DB)
    console.log('loading', user)
    return user
}

async function addToFav(user, food) {
    const userToSet = await httpService.put('user', { user, food })
    if (userToSet) {
        storageService.store(USER_DB, userToSet)
    }
    return userToSet
}