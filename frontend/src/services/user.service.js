import { storageService } from './storage.service'

let users = [
    {
        _id: 1,
        userName: 'itai',
        userPassword: 'niss',
        userEmail: 'itainis'
    }
]

export const userService = {
    confirmUser,
    loadUser,
}

const USER_DB = 'FoodyUserDb'

function confirmUser(user, actionType) {
    const { id, userName, userPassword } = user
    let userToSet = null

    if (actionType === 'signup') {
        storageService.store(USER_DB, user)
        userToSet = user
    }
    if (actionType === 'login') {
        users.forEach((userToSearch) => {
            if (userName == userToSearch.userName) {
                console.log('da');
                storageService.store(USER_DB, user)
                userToSet = user
            }
        })
    }
    if (actionType === 'logout') {
        storageService.store(USER_DB, user)
        userToSet = user
    }
    if (userToSet) return userToSet
    else return false
}

function loadUser() {
    const user = storageService.load(USER_DB)
    const userToSet = {
        userName: user.userName,
        userPassword: user.userPassword
    }
    return userToSet
}