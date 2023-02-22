const users = require("../../data/users.json")

module.exports = {
    // getUser,
    addFavToUser,
    getByUsername,
    addUser
}

function addFavToUser(user, food) {
    let userToSet
    users.forEach((userToSearch) => {
        if (user._id === userToSearch._id) {
            userToSet = {
                _id: userToSearch._id,
                userName: userToSearch.userName,
                userEmail: userToSearch.userEmail,
                userFavorite: userToSearch.userFavorite
            }
            userToSet.userFavorite.push(food)
        }
    })
    return Promise.resolve(userToSet)
}

// function getUser(user, actionType) {
// const { _id, userName, userPassword } = user
// let userToSet = null

// if (actionType === 'signup') {
//     userToSet = {
//         _id: user._id,
//         userName: user.userName,
//         userEmail: user.userEmail
//     }
// }

// if (actionType === 'login') {
//     users.forEach((userToSearch) => {

//         if (userName === userToSearch.userName && userPassword === userToSearch.userPassword) {
//             userToSet = {
//                 _id: userToSearch._id,
//                 userName: userToSearch.userName,
//                 userEmail: userToSearch.userEmail,
//                 userFavorite: userToSearch.userFavorite
//             }
//         }
//     })
// }

// if (actionType === 'logout') {
//     console.log('login out');
//     const blankUser = {
//         _id: null,
//         userName: null,
//         userEmail: null,
//         userFavorite: []
//     }
//     userToSet = blankUser
// }
// console.log('userToSet:', userToSet)
// if (userToSet) return Promise.resolve(userToSet)
// else return Promise.resolve(false)
// }

async function getByUsername(userName) {
    let user = {}
    try {
        await users.forEach((userToSet) => {
            if (userName === userToSet.userName) {
                user = userToSet
            }
        })
        return user
    } catch (err) {
        logger.error(`while finding user ${userName}`, err)
        throw err
    }
}

async function addUser(user) {
    let dateObj = new Date();
    let month = dateObj.getUTCMonth() + 1; //months from 1-12
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();

    let memberSince = year + "/" + month + "/" + day;

    try {
        const userToAdd = {
            _id: user._id,
            fullName: user.fullName,
            userName: user.userName,
            userPassword: user.userPassword,
            userEmail: user.userEmail,
            memberSince,
        }
        console.log('user service add user:', userToAdd);
        return userToAdd
    } catch (err) {
        logger.error('cannot insert user', err)
        throw err
    }
}
