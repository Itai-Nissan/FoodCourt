import { storageService } from './storage.service'

export const userService = {
    confirmUser,
    loadUser,
}

const USER_DB = 'FoodyUserDb'

function confirmUser(user) {
    storageService.store(USER_DB, user)
    return user
}

function loadUser() {
    const user = storageService.load(USER_DB)
    return user
}