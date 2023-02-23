import { storageService } from './storage.service'
import { httpService } from './http.service.js'

export const userService = {
    confirmUser,
    loadUser,
    addToFav,
    login,
    signUp,
    logout,
}

const USER_DB = 'FoodyUserDb'
const API = 'user'
const ENDPOINT = 'auth'

async function confirmUser(cred) {
    const userToSet = await httpService.post(ENDPOINT + '/login', cred)
    if (userToSet) storageService.store(USER_DB, userToSet)
    return userToSet
}

function loadUser() {
    const user = storageService.load(USER_DB)
    return user
}

async function addToFav(user, food) {
    const userToSet = await httpService.put('user', { user, food })
    if (userToSet) {
        storageService.store(USER_DB, userToSet)
    }
    return userToSet
}

async function login(cred) {
    const userToSet = await httpService.post(ENDPOINT + '/login', cred)
    if (userToSet) storageService.store(USER_DB, userToSet)
    return userToSet
}

async function signUp(user) {
    const userToSet = await httpService.post(ENDPOINT + '/signup', user)
    if (userToSet) storageService.store(USER_DB, userToSet)
    return userToSet
}

async function logout() {
    const userToSet = await httpService.post(ENDPOINT + '/logout')
    if (userToSet) storageService.store(USER_DB, userToSet)
    return userToSet
}
