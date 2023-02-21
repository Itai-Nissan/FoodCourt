const users = require("../data/users.json")

module.exports = {
    getUser,
}

function getUser(user, actionType) {
    const { id, userName, userPassword } = user
    let userToSet = null

    if (actionType === 'signup') {
        userToSet = user
    }
    
    if (actionType === 'login') {
        users.forEach((userToSearch) => {
            if (userName == userToSearch.userName) {
                userToSet = user
            }
        })
    }

    if (actionType === 'logout') {
        const blankUser = {
            _id: null,
            userName: null,
            userPassword: null,
            userEmail: null
        }
        userToSet = blankUser
    }

    if (userToSet) return Promise.resolve(userToSet)
    else return Promise.resolve(false)
}