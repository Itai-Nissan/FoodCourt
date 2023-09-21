import { storageService } from './storage.service'
import { httpService } from './http.service.js'

export const userService = {
    confirmUser,
    loadUser,
    addToFav,
    removeFromFav,
    login,
    signUp,
    logout,
    updateUser,
}

const USER_DB = 'FoodyUserDb'
const ENDPOINT = 'auth'

async function confirmUser(cred) {
    const userToSet = await httpService.post(ENDPOINT + '/login', cred)
    if (userToSet) storageService.store(USER_DB, userToSet)
    return userToSet
}

function loadUser() {
    const authUser = storageService.load(USER_DB)
    return authUser
}

async function addToFav(user, food) {
    const authUser = await httpService.put('user', { user, food })

    if (authUser) {
        storageService.store(USER_DB, authUser)
    }
    return authUser
}

async function removeFromFav(user, recipeId) {
    const authUser = await httpService.delete('userFav', { user, recipeId })
    if (authUser) {
        storageService.store(USER_DB, authUser)
    }
    return authUser
}

async function login(cred) {
    const authUser = await httpService.post(ENDPOINT + '/login', cred)
    if (authUser) storageService.store(USER_DB, authUser)
    return authUser
}

async function signUp(user) {
    const authUser = await httpService.post(ENDPOINT + '/signup', user)
    console.log(authUser);
    if (authUser) storageService.store(USER_DB, authUser)
    return authUser
}

async function logout() {
    const userToSet = await httpService.post(ENDPOINT + '/logout')
    if (userToSet) storageService.store(USER_DB, userToSet)
    return userToSet
}

async function updateUser(user) {
    if (user) storageService.store(USER_DB, user)
    return user
}
